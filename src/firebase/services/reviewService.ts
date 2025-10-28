import { db } from '../index'
import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  deleteDoc, 
  updateDoc,
  setDoc,
  query,
  orderBy,
  where,
  serverTimestamp
} from 'firebase/firestore'

// Review data structure for Firestore
export interface FirestoreReview {
  id: string
  courseId: string
  authorId: string
  authorName: string
  authorAvatar?: string
  text: string
  rating: number
  likesCount: number
  createdAt: Date
}

// Reply data structure for Firestore
export interface FirestoreReply {
  id: string
  reviewId: string
  authorId: string
  authorName: string
  authorAvatar?: string
  text: string
  createdAt: Date
}

// Get all reviews for a course
export const getCourseReviews = async (courseId: string): Promise<FirestoreReview[]> => {
  try {
    console.log('Fetching reviews for course:', courseId)
    const reviewsRef = collection(db, 'courses', courseId, 'reviews')
    const q = query(reviewsRef, orderBy('createdAt', 'desc'))
    const querySnapshot = await getDocs(q)
    
    const reviews: FirestoreReview[] = []
    querySnapshot.forEach((doc) => {
      console.log('Found review:', doc.id, doc.data())
      reviews.push({ id: doc.id, ...doc.data() } as FirestoreReview)
    })
    
    console.log('Total reviews found:', reviews.length)
    return reviews
  } catch (error) {
    console.error('Error fetching course reviews:', error)
    throw error
  }
}

// Add a new review
export const addReview = async (
  courseId: string,
  reviewData: Omit<FirestoreReview, 'id' | 'createdAt' | 'likesCount'>
): Promise<string> => {
  try {
    console.log('Adding review for course:', courseId, reviewData)
    const reviewsRef = collection(db, 'courses', courseId, 'reviews')
    const newReview = {
      ...reviewData,
      likesCount: 0,
      createdAt: new Date()
    }
    
    const docRef = await addDoc(reviewsRef, newReview)
    console.log('Review added with ID:', docRef.id)
    return docRef.id
  } catch (error) {
    console.error('Error adding review:', error)
    throw error
  }
}

// Like or unlike a review
export const toggleReviewLike = async (
  courseId: string,
  reviewId: string,
  userId: string
): Promise<{ liked: boolean; likesCount: number }> => {
  try {
    const likeRef = doc(db, 'courses', courseId, 'reviews', reviewId, 'likes', userId)
    const likeSnap = await getDoc(likeRef)
    
    if (likeSnap.exists()) {
      // Unlike - remove the like document
      await deleteDoc(likeRef)
      
      // Update likes count
      const reviewRef = doc(db, 'courses', courseId, 'reviews', reviewId)
      const reviewSnap = await getDoc(reviewRef)
      if (reviewSnap.exists()) {
        const currentLikes = (reviewSnap.data() as FirestoreReview).likesCount || 0
        await updateDoc(reviewRef, { likesCount: Math.max(0, currentLikes - 1) })
        return { liked: false, likesCount: Math.max(0, currentLikes - 1) }
      }
    } else {
      // Like - create the like document
      await setDoc(likeRef, { createdAt: new Date() })
      
      // Update likes count
      const reviewRef = doc(db, 'courses', courseId, 'reviews', reviewId)
      const reviewSnap = await getDoc(reviewRef)
      if (reviewSnap.exists()) {
        const currentLikes = (reviewSnap.data() as FirestoreReview).likesCount || 0
        await updateDoc(reviewRef, { likesCount: currentLikes + 1 })
        return { liked: true, likesCount: currentLikes + 1 }
      }
    }
    
    return { liked: false, likesCount: 0 }
  } catch (error) {
    console.error('Error toggling review like:', error)
    throw error
  }
}

// Check if user has liked a review
export const hasUserLikedReview = async (
  courseId: string,
  reviewId: string,
  userId: string
): Promise<boolean> => {
  try {
    const likeRef = doc(db, 'courses', courseId, 'reviews', reviewId, 'likes', userId)
    const likeSnap = await getDoc(likeRef)
    return likeSnap.exists()
  } catch (error) {
    console.error('Error checking if user liked review:', error)
    return false
  }
}