/**
 * Demo Course Data
 * ================
 * Sample module content for the hackathon demo.
 * Uses SC1003 (Introduction to Computational Thinking) as example.
 * 
 * In production, this would come from a CMS or professor uploads.
 */

export const DEMO_MODULE = {
  id: 'sc1003-mod2',
  code: 'SC1003',
  name: 'Introduction to Computational Thinking',
  moduleTitle: 'Module 2: Control Structures',
  description: 'Learn about conditional statements, loops, and flow control in Python.',
  totalSegments: 3,

  segments: [
    {
      id: 'seg-1',
      title: 'If-Else Statements',
      description: 'Understanding conditional logic and branching in Python.',
      videoUrl: '/videos/demo-segment-1.mp4', // Replace with actual video or YouTube embed
      duration: '8:30',
      content: 'This segment covers if, elif, and else statements. Conditional statements allow your program to make decisions. An if statement checks a condition — if it is True, the code block runs. You can chain multiple conditions with elif, and catch everything else with else. Common patterns include checking ranges, validating input, and nested conditions.',
      quiz: {
        id: 'quiz-seg1',
        passingScore: 60,
        questions: [
          {
            id: 'q1',
            question: 'What does an "elif" statement do in Python?',
            type: 'mcq',
            options: [
              'A. Ends the program',
              'B. Checks an additional condition if the previous if/elif was False',
              'C. Loops through a list',
              'D. Defines a function',
            ],
            correctAnswer: 'B',
            explanation: 'elif (else if) checks another condition only when all previous if/elif conditions were False.',
          },
          {
            id: 'q2',
            question: 'What will print? x = 5; if x > 10: print("big") elif x > 3: print("medium") else: print("small")',
            type: 'mcq',
            options: [
              'A. big',
              'B. medium',
              'C. small',
              'D. Error',
            ],
            correctAnswer: 'B',
            explanation: 'x is 5. x > 10 is False, so we check elif: x > 3 is True, so "medium" prints.',
          },
          {
            id: 'q3',
            question: 'Which operator checks if two values are equal in Python?',
            type: 'mcq',
            options: [
              'A. =',
              'B. ==',
              'C. ===',
              'D. equals()',
            ],
            correctAnswer: 'B',
            explanation: '== is the equality operator. = is assignment. Python does not use === (that\'s JavaScript).',
          },
        ],
      },
    },
    {
      id: 'seg-2',
      title: 'For Loops',
      description: 'Iterating over sequences with for loops and range().',
      videoUrl: '/videos/demo-segment-2.mp4',
      duration: '10:15',
      content: 'For loops iterate over a sequence (list, string, range). The range() function generates a sequence of numbers. Common patterns include iterating with index using enumerate(), nested loops for 2D data, and list comprehensions as shorthand for simple loops.',
      quiz: {
        id: 'quiz-seg2',
        passingScore: 60,
        questions: [
          {
            id: 'q1',
            question: 'What does range(5) generate?',
            type: 'mcq',
            options: [
              'A. [1, 2, 3, 4, 5]',
              'B. [0, 1, 2, 3, 4]',
              'C. [0, 1, 2, 3, 4, 5]',
              'D. [1, 2, 3, 4]',
            ],
            correctAnswer: 'B',
            explanation: 'range(5) generates numbers from 0 to 4 (5 numbers total, starting from 0).',
          },
          {
            id: 'q1b',
            question: 'How many times does this loop run? for i in range(2, 8):',
            type: 'mcq',
            options: [
              'A. 8 times',
              'B. 7 times',
              'C. 6 times',
              'D. 5 times',
            ],
            correctAnswer: 'C',
            explanation: 'range(2, 8) generates: 2, 3, 4, 5, 6, 7 — that\'s 6 numbers, so 6 iterations.',
          },
          {
            id: 'q2',
            question: 'What does "break" do inside a for loop?',
            type: 'mcq',
            options: [
              'A. Skips the current iteration',
              'B. Exits the loop entirely',
              'C. Restarts the loop',
              'D. Pauses the loop',
            ],
            correctAnswer: 'B',
            explanation: 'break immediately exits the loop. continue skips the current iteration.',
          },
        ],
      },
    },
    {
      id: 'seg-3',
      title: 'While Loops & Loop Control',
      description: 'While loops, break, continue, and avoiding infinite loops.',
      videoUrl: '/videos/demo-segment-3.mp4',
      duration: '9:45',
      content: 'While loops repeat as long as a condition is True. They are useful when you don\'t know how many iterations are needed. Common pitfalls include infinite loops (forgetting to update the condition). Use break to exit early and continue to skip iterations. The while-else pattern runs the else block only if the loop completed without a break.',
      quiz: {
        id: 'quiz-seg3',
        passingScore: 60,
        questions: [
          {
            id: 'q1',
            question: 'When does a while loop stop?',
            type: 'mcq',
            options: [
              'A. After a fixed number of iterations',
              'B. When the condition becomes False',
              'C. When it reaches the end of a list',
              'D. After 1000 iterations',
            ],
            correctAnswer: 'B',
            explanation: 'A while loop continues as long as its condition is True. It stops when the condition becomes False.',
          },
          {
            id: 'q2',
            question: 'What causes an infinite loop?',
            type: 'mcq',
            options: [
              'A. Using break',
              'B. The condition never becomes False',
              'C. Using continue',
              'D. Having no code inside the loop',
            ],
            correctAnswer: 'B',
            explanation: 'An infinite loop occurs when the while condition never becomes False — usually because the variable being checked is never updated inside the loop.',
          },
          {
            id: 'q3',
            question: 'What does "continue" do?',
            type: 'mcq',
            options: [
              'A. Exits the loop',
              'B. Restarts the entire program',
              'C. Skips the rest of the current iteration and goes to the next one',
              'D. Pauses execution',
            ],
            correctAnswer: 'C',
            explanation: 'continue skips the remaining code in the current loop iteration and jumps to the next iteration.',
          },
        ],
      },
    },
  ],
};

// Demo learner persona for testing
export const DEMO_PERSONA = {
  learningStyle: 'short-term-intensive' as const,
  studyHoursPerDay: 3,
  studyDaysPerWeek: 5,
  examPrepWeek: 2,
  preferredQuestionFormat: 'mcq' as const,
  cognitiveScore: 7,
  personalityTraits: ['visual-learner', 'prefers-examples', 'quick-pace'],
};

// Demo quiz for the personality assessment
export const PERSONALITY_QUIZ_QUESTIONS = [
  {
    id: 'pq1',
    question: 'When preparing for an exam, I typically...',
    options: [
      { value: 'short-term', label: 'Cram intensively in the last few days' },
      { value: 'long-term', label: 'Study a little bit every day over several weeks' },
    ],
    maps_to: 'learningStyle',
  },
  {
    id: 'pq2',
    question: 'On average, how many hours do you study per day?',
    options: [
      { value: '1', label: 'Less than 1 hour' },
      { value: '2', label: '1-2 hours' },
      { value: '3', label: '2-4 hours' },
      { value: '5', label: 'More than 4 hours' },
    ],
    maps_to: 'studyHoursPerDay',
  },
  {
    id: 'pq3',
    question: 'How many days per week do you study?',
    options: [
      { value: '2', label: '1-2 days' },
      { value: '4', label: '3-4 days' },
      { value: '6', label: '5-6 days' },
      { value: '7', label: 'Every day' },
    ],
    maps_to: 'studyDaysPerWeek',
  },
  {
    id: 'pq4',
    question: 'How many weeks before the exam do you usually start studying?',
    options: [
      { value: '1', label: 'The week of the exam' },
      { value: '2', label: '1-2 weeks before' },
      { value: '4', label: '3-4 weeks before' },
      { value: '6', label: 'From the start of the semester' },
    ],
    maps_to: 'examPrepWeek',
  },
  {
    id: 'pq5',
    question: 'Which question format do you prefer?',
    options: [
      { value: 'mcq', label: 'Multiple Choice Questions (MCQ)' },
      { value: 'short-answer', label: 'Short Answer (1-3 sentences)' },
      { value: 'essay', label: 'Long-form / Essay questions' },
    ],
    maps_to: 'preferredQuestionFormat',
  },
  {
    id: 'pq6',
    question: 'A farmer has 17 sheep. All but 9 die. How many sheep are left?',
    options: [
      { value: '8', label: '8 sheep', correct: false },
      { value: '9', label: '9 sheep', correct: true },
      { value: '17', label: '17 sheep', correct: false },
      { value: '0', label: '0 sheep', correct: false },
    ],
    maps_to: 'cognitiveScore',
    type: 'iq',
  },
  {
    id: 'pq7',
    question: 'If you rearrange the letters "CIFAIPC", you get the name of a(n):',
    options: [
      { value: 'ocean', label: 'Ocean', correct: true },
      { value: 'city', label: 'City', correct: false },
      { value: 'animal', label: 'Animal', correct: false },
      { value: 'country', label: 'Country', correct: false },
    ],
    maps_to: 'cognitiveScore',
    type: 'iq',
  },
];
