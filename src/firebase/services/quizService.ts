import { db } from '../index'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import type { CourseProgress, QuizResult } from './progressService'

// Quiz question structure for Firestore
export interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation?: string
}

// Quiz data structure for Firestore
export interface Quiz {
  id: string
  courseId: string
  lessonId: string
  title: string
  questions: QuizQuestion[]
  passingScore: number // Percentage needed to pass (e.g., 70 for 70%)
  xpReward: number
}

// Get quiz for a lesson
export const getLessonQuiz = async (
  courseId: string,
  lessonId: string
): Promise<Quiz | null> => {
  try {
    const quizRef = doc(db, 'courses', courseId, 'lessons', lessonId, 'quiz', 'main')
    const quizSnap = await getDoc(quizRef)
    
    if (quizSnap.exists()) {
      return { id: quizSnap.id, ...quizSnap.data() } as Quiz
    }
    return null
  } catch (error) {
    console.error('Error fetching lesson quiz:', error)
    return null
  }
}

// Submit quiz result
export const submitQuizResult = async (
  userId: string,
  courseId: string,
  lessonId: string,
  quizId: string,
  answers: number[],
  quiz: Quiz
): Promise<QuizResult> => {
  try {
    // Calculate score
    let correctAnswers = 0
    for (let i = 0; i < quiz.questions.length; i++) {
      if (answers[i] === quiz.questions[i].correctAnswer) {
        correctAnswers++
      }
    }
    
    const score = correctAnswers
    const total = quiz.questions.length
    const percentage = Math.round((score / total) * 100)
    const passed = percentage >= quiz.passingScore
    
    // Create quiz result
    const quizResult: QuizResult = {
      score,
      total,
      passed,
      completedAt: new Date()
    }
    
    // Update course progress with quiz result
    const progressRef = doc(db, 'users', userId, 'progress', courseId)
    const progressData: Partial<CourseProgress> = {
      quizResults: {
        [lessonId]: quizResult
      },
      updatedAt: new Date()
    }
    
    await setDoc(progressRef, progressData, { merge: true })
    
    return quizResult
  } catch (error) {
    console.error('Error submitting quiz result:', error)
    throw error
  }
}

// Mock quizzes data for development
export const mockQuizzes: Record<string, Quiz> = {
  '1-1': {
    id: 'quiz-1-1',
    courseId: '1',
    lessonId: '1-1',
    title: 'React Fundamentals Quiz',
    passingScore: 70,
    xpReward: 50,
    questions: [
      {
        id: 'q1',
        question: 'What is React?',
        options: [
          'A JavaScript library for building user interfaces',
          'A backend framework',
          'A database management system',
          'A CSS framework'
        ],
        correctAnswer: 0,
        explanation: 'React is a JavaScript library developed by Facebook for building user interfaces.'
      },
      {
        id: 'q2',
        question: 'What does JSX stand for?',
        options: [
          'JavaScript XML',
          'Java Syntax Extension',
          'JSON XML',
          'JavaScript Extension'
        ],
        correctAnswer: 0,
        explanation: 'JSX stands for JavaScript XML, which allows you to write HTML-like code in JavaScript.'
      },
      {
        id: 'q3',
        question: 'Which hook is used to manage state in functional components?',
        options: [
          'useEffect',
          'useState',
          'useContext',
          'useReducer'
        ],
        correctAnswer: 1,
        explanation: 'The useState hook is used to manage state in functional components.'
      },
      {
        id: 'q4',
        question: 'What is the virtual DOM?',
        options: [
          'A lightweight version of the actual DOM',
          'A database technology',
          'A server-side rendering technique',
          'A CSS framework'
        ],
        correctAnswer: 0,
        explanation: 'The virtual DOM is a lightweight version of the actual DOM that React uses to optimize rendering performance.'
      },
      {
        id: 'q5',
        question: 'How do you pass data to a child component in React?',
        options: [
          'Using props',
          'Using state',
          'Using context',
          'Using refs'
        ],
        correctAnswer: 0,
        explanation: 'Props are used to pass data from a parent component to a child component.'
      }
    ]
  },
  '2-1': {
    id: 'quiz-2-1',
    courseId: '2',
    lessonId: '2-1',
    title: 'Advanced TypeScript Quiz',
    passingScore: 80,
    xpReward: 75,
    questions: [
      {
        id: 'q1',
        question: 'What is a generic type in TypeScript?',
        options: [
          'A type that can work with multiple data types',
          'A built-in JavaScript type',
          'A type that only works with strings',
          'A type that is automatically inferred'
        ],
        correctAnswer: 0,
        explanation: 'Generic types allow you to create reusable components that work with multiple data types.'
      },
      {
        id: 'q2',
        question: 'What is the purpose of the "keyof" operator?',
        options: [
          'To get the keys of an object type',
          'To create a new object',
          'To delete object properties',
          'To check if a key exists'
        ],
        correctAnswer: 0,
        explanation: 'The "keyof" operator is used to get the keys of an object type as a union type.'
      },
      {
        id: 'q3',
        question: 'What does the "infer" keyword do in conditional types?',
        options: [
          'It infers type information from other types',
          'It imports external modules',
          'It defines interface properties',
          'It creates inheritance relationships'
        ],
        correctAnswer: 0,
        explanation: 'The "infer" keyword is used in conditional types to infer type information from other types.'
      },
      {
        id: 'q4',
        question: 'What is a mapped type?',
        options: [
          'A type that transforms properties of another type',
          'A type that maps values to keys',
          'A type that creates conditional logic',
          'A type that handles asynchronous operations'
        ],
        correctAnswer: 0,
        explanation: 'Mapped types transform properties of another type by creating new types based on existing ones.'
      },
      {
        id: 'q5',
        question: 'What is the purpose of utility types like Partial<T>?',
        options: [
          'To create variations of existing types',
          'To validate user input',
          'To optimize performance',
          'To handle errors'
        ],
        correctAnswer: 0,
        explanation: 'Utility types like Partial<T> create variations of existing types with modified properties.'
      },
      {
        id: 'q6',
        question: 'What does the "readonly" modifier do?',
        options: [
          'Makes properties immutable',
          'Prevents object creation',
          'Hides properties from view',
          'Makes properties optional'
        ],
        correctAnswer: 0,
        explanation: 'The "readonly" modifier makes object properties immutable, preventing them from being changed after initialization.'
      },
      {
        id: 'q7',
        question: 'What is a conditional type?',
        options: [
          'A type that depends on a condition',
          'A type that handles errors',
          'A type that manages state',
          'A type that creates loops'
        ],
        correctAnswer: 0,
        explanation: 'Conditional types allow you to create types that depend on conditions, enabling more flexible type definitions.'
      },
      {
        id: 'q8',
        question: 'What is the "never" type used for?',
        options: [
          'To represent values that never occur',
          'To indicate infinite loops',
          'To handle network errors',
          'To represent empty objects'
        ],
        correctAnswer: 0,
        explanation: 'The "never" type represents values that never occur, such as the return type of functions that always throw an error.'
      },
      {
        id: 'q9',
        question: 'What does the "as" keyword do?',
        options: [
          'Type assertion/casting',
          'Importing modules',
          'Creating aliases',
          'Defining interfaces'
        ],
        correctAnswer: 0,
        explanation: 'The "as" keyword is used for type assertion, allowing you to tell TypeScript to treat a value as a specific type.'
      },
      {
        id: 'q10',
        question: 'What is the purpose of index signatures?',
        options: [
          'To define object property types dynamically',
          'To create array indices',
          'To handle database queries',
          'To manage memory allocation'
        ],
        correctAnswer: 0,
        explanation: 'Index signatures allow you to define the types of properties that can be dynamically added to an object.'
      }
    ]
  }
}