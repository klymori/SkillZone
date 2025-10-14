import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define API base URL
const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'

// Define types for our API responses
export interface User {
  id: string
  email: string
  name: string
  role: 'admin' | 'user'
  createdAt: string
  updatedAt: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  user: User
  token: string
}

export interface Course {
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
  createdAt: string
  updatedAt: string
}

export interface CourseCategory {
  id: string
  name: string
  description: string
  icon: string
  coursesCount: number
}

export interface UserProgress {
  userId: string
  courseId: string
  completedLessons: string[]
  currentLesson: string
  progressPercentage: number
  xpEarned: number
  lastAccessedAt: string
}

export interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  xpReward: number
  category: 'learning' | 'streak' | 'completion' | 'social'
  requirements: {
    type: 'courses_completed' | 'lessons_completed' | 'days_streak' | 'xp_earned'
    value: number
  }
}

export interface UserAchievement {
  userId: string
  achievementId: string
  earnedAt: string
  progress: number
}

export interface UserProfile {
  id: string
  email: string
  name: string
  avatar?: string
  age?: number
  bio?: string
  level: number
  xp: number
  totalXp: number
  streak: number
  joinedAt: string
  preferences: {
    language: 'en' | 'ru' | 'ky'
    theme: 'light' | 'dark'
    notifications: boolean
  }
}

export interface FavoriteCourse {
  userId: string
  courseId: string
  addedAt: string
}

export interface Lesson {
  id: string
  title: string
  content: string
  order: number
  courseId: string
  createdAt: string
  updatedAt: string
}

export interface Progress {
  id: string
  userId: string
  courseId: string
  lessonId: string
  completed: boolean
  score?: number
  completedAt?: string
}

// Create our API slice
export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      // Add auth token if available
      const token = (getState() as any).auth.token
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  tagTypes: ['User', 'Course', 'Lesson', 'Progress', 'Achievement', 'Category', 'Favorite'],
  endpoints: (builder) => ({
    // Auth endpoints
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: 'auth/login',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['User'],
    }),
    register: builder.mutation<LoginResponse, LoginRequest & { name: string }>({
      query: (userData) => ({
        url: 'auth/register',
        method: 'POST',
        body: userData,
      }),
      invalidatesTags: ['User'],
    }),
    getCurrentUser: builder.query<User, void>({
      query: () => 'auth/me',
      providesTags: ['User'],
    }),
    
    // Course endpoints
    getCourses: builder.query<{ courses: Course[]; total: number }, { 
      page?: number
      limit?: number
      category?: string
      level?: string
      search?: string
      sortBy?: 'title' | 'rating' | 'studentsCount' | 'createdAt'
      sortOrder?: 'asc' | 'desc'
    }>({
      query: (params = {}) => ({
        url: 'courses',
        params,
      }),
      providesTags: ['Course'],
    }),
    getCourse: builder.query<Course, string>({
      query: (id) => `courses/${id}`,
      providesTags: (_, __, id) => [{ type: 'Course', id }],
    }),
    createCourse: builder.mutation<Course, Partial<Course>>({
      query: (course) => ({
        url: 'courses',
        method: 'POST',
        body: course,
      }),
      invalidatesTags: ['Course'],
    }),
    
    // Course categories
    getCategories: builder.query<CourseCategory[], void>({
      query: () => 'categories',
      providesTags: ['Category'],
    }),
    
    // Favorites
    getFavorites: builder.query<Course[], string>({
      query: (userId) => `users/${userId}/favorites`,
      providesTags: ['Favorite'],
    }),
    addToFavorites: builder.mutation<void, { userId: string; courseId: string }>({
      query: ({ userId, courseId }) => ({
        url: `users/${userId}/favorites`,
        method: 'POST',
        body: { courseId },
      }),
      invalidatesTags: ['Favorite'],
    }),
    removeFromFavorites: builder.mutation<void, { userId: string; courseId: string }>({
      query: ({ userId, courseId }) => ({
        url: `users/${userId}/favorites/${courseId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Favorite'],
    }),
    
    // Progress endpoints
    getUserProgress: builder.query<UserProgress[], string>({
      query: (userId) => `progress/user/${userId}`,
      providesTags: ['Progress'],
    }),
    getCourseProgress: builder.query<UserProgress, { userId: string; courseId: string }>({
      query: ({ userId, courseId }) => `progress/user/${userId}/course/${courseId}`,
      providesTags: ['Progress'],
    }),
    updateProgress: builder.mutation<UserProgress, Partial<UserProgress> & { userId: string; courseId: string }>({
      query: ({ userId, courseId, ...progress }) => ({
        url: `progress/user/${userId}/course/${courseId}`,
        method: 'PUT',
        body: progress,
      }),
      invalidatesTags: ['Progress', 'User'],
    }),
    
    // Achievements
    getAchievements: builder.query<Achievement[], void>({
      query: () => 'achievements',
      providesTags: ['Achievement'],
    }),
    getUserAchievements: builder.query<UserAchievement[], string>({
      query: (userId) => `users/${userId}/achievements`,
      providesTags: ['Achievement'],
    }),
    awardAchievement: builder.mutation<UserAchievement, { userId: string; achievementId: string }>({
      query: ({ userId, achievementId }) => ({
        url: `users/${userId}/achievements`,
        method: 'POST',
        body: { achievementId },
      }),
      invalidatesTags: ['Achievement', 'User'],
    }),
    
    // User profile
    getUserProfile: builder.query<UserProfile, string>({
      query: (userId) => `users/${userId}/profile`,
      providesTags: ['User'],
    }),
    updateUserProfile: builder.mutation<UserProfile, { userId: string } & Partial<UserProfile>>({
      query: ({ userId, ...profile }) => ({
        url: `users/${userId}/profile`,
        method: 'PUT',
        body: profile,
      }),
      invalidatesTags: ['User'],
    }),
  }),
})

// Export hooks for usage in functional components
export const {
  useLoginMutation,
  useRegisterMutation,
  useGetCurrentUserQuery,
  useGetCoursesQuery,
  useGetCourseQuery,
  useCreateCourseMutation,
  useGetCategoriesQuery,
  useGetFavoritesQuery,
  useAddToFavoritesMutation,
  useRemoveFromFavoritesMutation,
  useGetUserProgressQuery,
  useGetCourseProgressQuery,
  useUpdateProgressMutation,
  useGetAchievementsQuery,
  useGetUserAchievementsQuery,
  useAwardAchievementMutation,
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
} = api