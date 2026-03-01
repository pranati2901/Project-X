/**
 * Firebase Configuration & Helpers
 * ================================
 * Handles authentication, Firestore database, and storage.
 * 
 * SETUP INSTRUCTIONS:
 * 1. Go to https://console.firebase.google.com
 * 2. Create a new project called "ntulearn"
 * 3. Enable Authentication (Email/Password for demo)
 * 4. Enable Firestore Database
 * 5. Copy your config values to .env.local
 */

import { initializeApp, getApps } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc, collection, query, where, getDocs, updateDoc, serverTimestamp } from 'firebase/firestore';

import { logger } from './logger';

// ---- Initialize Firebase ----
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(app);
export const db = getFirestore(app);

// ---- Auth Helpers ----

/**
 * Simulated SSO Login
 * In production, this would integrate with NTU's SSO (Shibboleth/SAML).
 * For the hackathon demo, we simulate it with email/password + role selection.
 */
export async function loginUser(email: string, password: string) {
  logger.info('Attempting user login', { email });
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    logger.info('Login successful', { uid: userCredential.user.uid });
    return { success: true, user: userCredential.user };
  } catch (error: any) {
    logger.error('Login failed', { email, error: error.message });
    return { success: false, error: error.message };
  }
}

export async function registerUser(email: string, password: string, role: string, displayName: string) {
  logger.info('Registering new user', { email, role });
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;

    // Create user profile in Firestore
    await setDoc(doc(db, 'users', uid), {
      email,
      displayName,
      role, // 'student' | 'professor' | 'admin'
      createdAt: serverTimestamp(),
      hasCompletedQuiz: false,
      persona: null,
      streakDays: 0,
      lastStudyDate: null,
    });

    logger.info('User registered successfully', { uid, role });
    return { success: true, user: userCredential.user };
  } catch (error: any) {
    logger.error('Registration failed', { email, error: error.message });
    return { success: false, error: error.message };
  }
}

export async function logoutUser() {
  logger.info('User logging out');
  await signOut(auth);
}

// ---- User Profile Helpers ----

export async function getUserProfile(uid: string) {
  logger.debug('Fetching user profile', { uid });
  const docRef = doc(db, 'users', uid);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data() : null;
}

export async function updateUserProfile(uid: string, data: Record<string, any>) {
  logger.debug('Updating user profile', { uid, fields: Object.keys(data) });
  const docRef = doc(db, 'users', uid);
  await updateDoc(docRef, { ...data, updatedAt: serverTimestamp() });
}

/**
 * Save the Learner DNA persona object after quiz completion
 */
export async function savePersona(uid: string, persona: LearnerPersona) {
  logger.info('Saving learner persona', { uid, learningStyle: persona.learningStyle });
  await updateUserProfile(uid, {
    persona,
    hasCompletedQuiz: true,
  });
}

// ---- Quiz & Progress Helpers ----

export async function saveQuizResult(uid: string, moduleId: string, segmentId: string, result: QuizResult) {
  logger.info('Saving quiz result', { uid, moduleId, segmentId, score: result.score });
  const docRef = doc(db, 'quizResults', `${uid}_${moduleId}_${segmentId}`);
  await setDoc(docRef, {
    uid,
    moduleId,
    segmentId,
    ...result,
    timestamp: serverTimestamp(),
  });
}

export async function getModuleProgress(uid: string, moduleId: string) {
  logger.debug('Fetching module progress', { uid, moduleId });
  const q = query(
    collection(db, 'quizResults'),
    where('uid', '==', uid),
    where('moduleId', '==', moduleId)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(d => d.data());
}

export async function getAllProgress(uid: string) {
  logger.debug('Fetching all progress', { uid });
  const q = query(collection(db, 'quizResults'), where('uid', '==', uid));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(d => d.data());
}

// ---- Study Session Tracking ----

export async function logStudySession(uid: string, moduleId: string, durationMinutes: number) {
  logger.info('Logging study session', { uid, moduleId, durationMinutes });
  const sessionRef = doc(collection(db, 'studySessions'));
  await setDoc(sessionRef, {
    uid,
    moduleId,
    durationMinutes,
    timestamp: serverTimestamp(),
  });
}

// ---- Types ----

export interface LearnerPersona {
  learningStyle: 'short-term-intensive' | 'long-term-gradual';
  studyHoursPerDay: number;
  studyDaysPerWeek: number;
  examPrepWeek: number; // weeks before exam they start studying
  preferredQuestionFormat: 'mcq' | 'short-answer' | 'essay';
  cognitiveScore: number; // from IQ-style questions (1-10)
  personalityTraits: string[];
}

export interface QuizResult {
  score: number;       // 0-100
  totalQuestions: number;
  correctAnswers: number;
  timeSpentSeconds: number;
  attemptNumber: number;
  missedQuestionIds: string[];
}
