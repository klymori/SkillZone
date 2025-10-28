import { db } from '../index'
import { collection, doc, getDoc, getDocs, query, orderBy, setDoc, addDoc } from 'firebase/firestore'
import type { Course, Lesson } from '../../api/api'

// Course data structure for Firestore
export interface FirestoreCourse {
  id: string
  title: string
  description: string
  shortDescription: string
  level: 'beginner' | 'intermediate' | 'advanced'
  category: string
  duration: number
  lessons: Lesson[]
  instructor: string
  rating: number
  studentsCount: number
  thumbnail: string
  price: number
  isFree: boolean
  tags: string[]
  createdAt: Date
  updatedAt: Date
}

// Get all courses from Firestore
export const getAllCourses = async (): Promise<FirestoreCourse[]> => {
  try {
    const coursesRef = collection(db, 'courses')
    const q = query(coursesRef, orderBy('createdAt', 'desc'))
    const querySnapshot = await getDocs(q)
    
    const courses: FirestoreCourse[] = []
    querySnapshot.forEach((doc) => {
      courses.push({ id: doc.id, ...doc.data() } as FirestoreCourse)
    })
    
    return courses
  } catch (error) {
    console.error('Error fetching courses:', error)
    throw error
  }
}

// Get a specific course by ID
export const getCourseById = async (courseId: string): Promise<FirestoreCourse | null> => {
  try {
    const courseRef = doc(db, 'courses', courseId)
    const courseSnap = await getDoc(courseRef)
    
    if (courseSnap.exists()) {
      return { id: courseSnap.id, ...courseSnap.data() } as FirestoreCourse
    }
    return null
  } catch (error) {
    console.error('Error fetching course:', error)
    throw error
  }
}

// Create a new course in Firestore
export const createCourse = async (courseData: Omit<FirestoreCourse, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
  try {
    const coursesRef = collection(db, 'courses')
    const newCourse = {
      ...courseData,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    
    const docRef = await addDoc(coursesRef, newCourse)
    return docRef.id
  } catch (error) {
    console.error('Error creating course:', error)
    throw error
  }
}

// Update an existing course in Firestore
export const updateCourse = async (courseId: string, courseData: Partial<FirestoreCourse>): Promise<void> => {
  try {
    const courseRef = doc(db, 'courses', courseId)
    const updatedData = {
      ...courseData,
      updatedAt: new Date()
    }
    await setDoc(courseRef, updatedData, { merge: true })
  } catch (error) {
    console.error('Error updating course:', error)
    throw error
  }
}