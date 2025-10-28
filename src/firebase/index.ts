import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getAnalytics } from 'firebase/analytics'
import firebaseConfig from './config'

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase services
const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app)
const analytics = getAnalytics(app)

// Enable Firebase Auth persistence
import { setPersistence, browserLocalPersistence } from 'firebase/auth'
setPersistence(auth, browserLocalPersistence)
  .catch((error) => {
    console.error('Error enabling Firebase Auth persistence:', error)
  })

export { app, auth, db, storage, analytics }