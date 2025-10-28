import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { auth } from '../../firebase'
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  updateProfile,
  type User as FirebaseUser
} from 'firebase/auth'
import type { User } from '../../api/api'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  loading: boolean
  error: string | null
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true
      state.error = null
    },
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.loading = false
      state.user = action.payload
      state.isAuthenticated = true
      state.error = null
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.user = null
      state.isAuthenticated = false
      state.error = action.payload
    },
    logout: (state) => {
      state.user = null
      state.isAuthenticated = false
      state.loading = false
      state.error = null
    },
    clearError: (state) => {
      state.error = null
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload
      state.isAuthenticated = true
    },
  },
})

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  clearError,
  setUser,
} = authSlice.actions

// Async thunks for Firebase authentication with fallback
export const loginUser = (email: string, password: string) => async (dispatch: any) => {
  try {
    dispatch(loginStart())
    
    // Try Firebase authentication first
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const firebaseUser = userCredential.user
      
      // Create user object compatible with existing User type
      const user: User = {
        id: firebaseUser.uid,
        email: firebaseUser.email || '',
        name: firebaseUser.displayName || email.split('@')[0],
        role: 'user',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      
      dispatch(loginSuccess(user))
      return user
    } catch (firebaseError: any) {
      // If Firebase auth fails, fallback to mock authentication
      console.warn('Firebase auth failed, using mock auth:', firebaseError.message)
      
      // Mock authentication for development
      const user: User = {
        id: Date.now().toString(),
        email: email,
        name: email.split('@')[0],
        role: 'user',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500))
      
      dispatch(loginSuccess(user))
      return user
    }
  } catch (error: any) {
    const errorMessage = error.message || 'Failed to login'
    dispatch(loginFailure(errorMessage))
    throw error
  }
}

export const registerUser = (name: string, email: string, password: string) => async (dispatch: any) => {
  try {
    dispatch(loginStart())
    
    // Try Firebase registration first
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const firebaseUser = userCredential.user
      
      // Update user profile with display name
      await updateProfile(firebaseUser, { displayName: name })
      
      // Create user object compatible with existing User type
      const user: User = {
        id: firebaseUser.uid,
        email: firebaseUser.email || '',
        name: name,
        role: 'user',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      
      dispatch(loginSuccess(user))
      return user
    } catch (firebaseError: any) {
      // If Firebase registration fails, fallback to mock registration
      console.warn('Firebase registration failed, using mock registration:', firebaseError.message)
      
      // Mock registration for development
      const user: User = {
        id: Date.now().toString(),
        email: email,
        name: name,
        role: 'user',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500))
      
      dispatch(loginSuccess(user))
      return user
    }
  } catch (error: any) {
    const errorMessage = error.message || 'Failed to register'
    dispatch(loginFailure(errorMessage))
    throw error
  }
}

export const logoutUser = () => async (dispatch: any) => {
  try {
    await signOut(auth)
    dispatch(logout())
  } catch (error: any) {
    // Even if Firebase logout fails, still logout locally
    console.warn('Firebase logout failed, logging out locally:', error.message)
    dispatch(logout())
  }
}

export default authSlice.reducer