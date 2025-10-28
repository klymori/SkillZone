import { db } from '../index'
import { doc, setDoc, getDoc } from 'firebase/firestore'

// Progress data structure for Firestore
export interface UserProgress {
  lessonId: string
  watchedSeconds: number
  completed: boolean
  updatedAt: Date
}

export interface CourseProgress {
  courseId: string
  lessonProgress: Record<string, UserProgress>
  quizResults?: Record<string, QuizResult>
  updatedAt: Date
}

export interface QuizResult {
  score: number
  total: number
  passed: boolean
  completedAt: Date
}

// Update lesson progress for a user
export const updateLessonProgress = async (
  userId: string,
  courseId: string,
  lessonId: string,
  progress: Partial<UserProgress>
): Promise<void> => {
  try {
    const progressRef = doc(db, 'users', userId, 'progress', courseId)
    const progressData: CourseProgress = {
      courseId,
      lessonProgress: {
        [lessonId]: {
          lessonId,
          watchedSeconds: progress.watchedSeconds || 0,
          completed: progress.completed || false,
          updatedAt: new Date(),
          ...progress
        }
      },
      updatedAt: new Date()
    }
    
    await setDoc(progressRef, progressData, { merge: true })
  } catch (error) {
    console.error('Error updating lesson progress:', error)
    throw error
  }
}

// Get course progress for a user
export const getCourseProgress = async (
  userId: string,
  courseId: string
): Promise<CourseProgress | null> => {
  try {
    const progressRef = doc(db, 'users', userId, 'progress', courseId)
    const progressSnap = await getDoc(progressRef)
    
    if (progressSnap.exists()) {
      return progressSnap.data() as CourseProgress
    }
    return null
  } catch (error) {
    console.error('Error fetching course progress:', error)
    return null
  }
}