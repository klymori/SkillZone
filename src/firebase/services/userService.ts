import { db } from '../index'
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore'
import type { User } from 'firebase/auth'

// User data structure for Firestore
export interface FirestoreUser {
  uid: string
  email: string | null
  displayName: string | null
  avatarUrl?: string
  bio?: string
  xp: number
  level: number
  titles: string[]
  favorites: string[]
  createdAt: Date
  lastLoginAt?: Date
}

// Create a new user document in Firestore
export const createUserDocument = async (user: User): Promise<void> => {
  const userRef = doc(db, 'users', user.uid)
  const userData: FirestoreUser = {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName || user.email?.split('@')[0] || 'Anonymous',
    xp: 0,
    level: 1,
    titles: [],
    favorites: [],
    createdAt: new Date(),
  }
  
  try {
    await setDoc(userRef, userData, { merge: true })
  } catch (error) {
    console.error('Error creating user document:', error)
    throw error
  }
}

// Get user document from Firestore
export const getUserDocument = async (uid: string): Promise<FirestoreUser | null> => {
  try {
    const userRef = doc(db, 'users', uid)
    const userSnap = await getDoc(userRef)
    
    if (userSnap.exists()) {
      return userSnap.data() as FirestoreUser
    }
    return null
  } catch (error) {
    console.error('Error fetching user document:', error)
    return null
  }
}

// Update user profile in Firestore
export const updateUserProfile = async (
  uid: string,
  updates: Partial<FirestoreUser>
): Promise<void> => {
  try {
    const userRef = doc(db, 'users', uid)
    await updateDoc(userRef, updates)
  } catch (error) {
    console.error('Error updating user profile:', error)
    throw error
  }
}