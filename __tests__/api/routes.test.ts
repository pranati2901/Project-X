import { describe, it, expect, vi, beforeAll } from 'vitest';

// Mock firebase-admin
vi.mock('firebase-admin', () => ({
  default: {
    apps: [],
    initializeApp: vi.fn(),
    credential: { cert: vi.fn() },
    auth: vi.fn(() => ({
      verifyIdToken: vi.fn().mockResolvedValue({ uid: 'test-user' }),
    })),
  },
}));

// Mock openai-ai to avoid real API calls
vi.mock('@/lib/openai-ai', () => ({
  complete: vi.fn().mockResolvedValue('{}'),
  generatePracticePaper: vi.fn().mockResolvedValue([]),
}));

// Mock OpenAI constructor
vi.mock('openai', () => ({
  default: vi.fn().mockImplementation(() => ({
    chat: {
      completions: {
        create: vi.fn().mockResolvedValue({
          choices: [{ message: { content: '{"text": "mock"}' } }],
        }),
      },
    },
  })),
}));

// Mock logger
vi.mock('@/lib/logger', () => ({
  logger: {
    child: () => ({
      info: vi.fn(),
      error: vi.fn(),
      warn: vi.fn(),
    }),
  },
}));

// Mock firebase-admin module used by insights
vi.mock('@/lib/firebase-admin', () => ({
  adminDb: null,
}));

// Mock RAG module
vi.mock('@/lib/rag', () => ({
  retrieveRelevantChunks: vi.fn().mockResolvedValue([]),
}));

// Mock insights-data
vi.mock('@/lib/insights-data', () => ({
  LinearRegression: vi.fn().mockImplementation(() => ({
    fit: vi.fn().mockReturnThis(),
    predict: vi.fn().mockReturnValue(75),
    getSlope: vi.fn().mockReturnValue(1.5),
    getR2: vi.fn().mockReturnValue(0.8),
    getTrend: vi.fn().mockReturnValue('improving'),
    getStatus: vi.fn().mockReturnValue('good'),
  })),
}));

function makeRequest(path: string, options: RequestInit = {}): Request {
  return new Request(`http://localhost:3002${path}`, options);
}

function jsonRequest(path: string, body: unknown, auth = false): Request {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (auth) headers['Authorization'] = 'Bearer test-token';
  return makeRequest(path, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  });
}

beforeAll(() => {
  // Configure admin SDK so auth actually checks tokens
  vi.stubEnv('FIREBASE_PROJECT_ID', 'test-project');
  vi.stubEnv('FIREBASE_CLIENT_EMAIL', 'test@test.iam.gserviceaccount.com');
  vi.stubEnv('FIREBASE_PRIVATE_KEY', '-----BEGIN PRIVATE KEY-----\nfake\n-----END PRIVATE KEY-----');
  vi.stubEnv('OPENAI_API_KEY', 'sk-test-key');
});

describe('Route auth — 401 without token', () => {
  it('POST /api/burnout returns 401', async () => {
    const { POST } = await import('@/app/api/burnout/route');
    const res = await POST(makeRequest('/api/burnout', { method: 'POST' }));
    expect(res.status).toBe(401);
  });

  it('POST /api/chat returns 401', async () => {
    const { POST } = await import('@/app/api/chat/route');
    const res = await POST(makeRequest('/api/chat', { method: 'POST' }) as any);
    expect(res.status).toBe(401);
  });

  it('POST /api/flashcards returns 401', async () => {
    const { POST } = await import('@/app/api/flashcards/route');
    const res = await POST(makeRequest('/api/flashcards', { method: 'POST' }));
    expect(res.status).toBe(401);
  });

  it('GET /api/cohort-stats returns 401', async () => {
    const { GET } = await import('@/app/api/cohort-stats/route');
    const res = await GET(makeRequest('/api/cohort-stats'));
    expect(res.status).toBe(401);
  });
});

describe('Route validation — 400 with missing fields', () => {
  it('POST /api/burnout returns 400 without totalHoursThisWeek', async () => {
    const { POST } = await import('@/app/api/burnout/route');
    const res = await POST(jsonRequest('/api/burnout', {}, true));
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toContain('totalHoursThisWeek');
  });

  it('POST /api/flashcards returns 400 without topic', async () => {
    const { POST } = await import('@/app/api/flashcards/route');
    const res = await POST(jsonRequest('/api/flashcards', { score: 50 }, true));
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toContain('topic');
  });

  it('POST /api/chat returns 400 without messages', async () => {
    const { POST } = await import('@/app/api/chat/route');
    const res = await POST(jsonRequest('/api/chat', {}, true) as any);
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toContain('messages');
  });

  it('POST /api/predict returns 400 without scores', async () => {
    const { POST } = await import('@/app/api/predict/route');
    const res = await POST(jsonRequest('/api/predict', {}, true));
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toContain('scores');
  });

  it('POST /api/study-plan returns 400 without weakTopics/quizHistory', async () => {
    const { POST } = await import('@/app/api/study-plan/route');
    const res = await POST(jsonRequest('/api/study-plan', { weakTopics: [] }, true));
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toContain('quizHistory');
  });

  it('POST /api/quiz-explain returns 400 without required fields', async () => {
    const { POST } = await import('@/app/api/quiz-explain/route');
    const res = await POST(jsonRequest('/api/quiz-explain', { question: 'What is X?' }, true));
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toContain('correctAnswer');
  });

  it('POST /api/practice returns 400 without moduleName', async () => {
    const { POST } = await import('@/app/api/practice/route');
    const res = await POST(jsonRequest('/api/practice', { weakTopics: ['loops'] }, true) as any);
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toContain('moduleName');
  });
});
