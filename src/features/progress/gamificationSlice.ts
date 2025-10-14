import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { UserAchievement } from '../../api/api'

interface GamificationState {
  level: number
  xp: number
  totalXp: number
  streak: number
  achievements: UserAchievement[]
  recentXpGains: XpGain[]
  levelUpNotification: boolean
}

interface XpGain {
  id: string
  amount: number
  reason: string
  timestamp: number
}

// XP required for each level (exponential growth)
const getXpForLevel = (level: number): number => {
  return Math.floor(100 * Math.pow(1.5, level - 1))
}

const getXpForNextLevel = (currentLevel: number): number => {
  return getXpForLevel(currentLevel + 1)
}

const getTotalXpForLevel = (level: number): number => {
  let total = 0
  for (let i = 1; i < level; i++) {
    total += getXpForLevel(i)
  }
  return total
}

const calculateLevelFromTotalXp = (totalXp: number): number => {
  let level = 1
  let xpNeeded = 0
  
  while (xpNeeded <= totalXp) {
    xpNeeded += getXpForLevel(level)
    if (xpNeeded <= totalXp) {
      level++
    }
  }
  
  return level
}

const initialState: GamificationState = {
  level: 1,
  xp: 0,
  totalXp: 0,
  streak: 0,
  achievements: [],
  recentXpGains: [],
  levelUpNotification: false,
}

const gamificationSlice = createSlice({
  name: 'gamification',
  initialState,
  reducers: {
    addXp: (state, action: PayloadAction<{ amount: number; reason: string }>) => {
      const { amount, reason } = action.payload
      
      state.totalXp += amount
      state.xp += amount
      
      // Check for level up
      const xpForNextLevel = getXpForNextLevel(state.level)
      if (state.xp >= xpForNextLevel) {
        state.level++
        state.xp = state.xp - xpForNextLevel
        state.levelUpNotification = true
      }
      
      // Add to recent XP gains
      const xpGain: XpGain = {
        id: Date.now().toString(),
        amount,
        reason,
        timestamp: Date.now(),
      }
      
      state.recentXpGains.unshift(xpGain)
      
      // Keep only last 10 XP gains
      if (state.recentXpGains.length > 10) {
        state.recentXpGains = state.recentXpGains.slice(0, 10)
      }
    },
    
    setLevel: (state, action: PayloadAction<number>) => {
      state.level = action.payload
      const totalXpForLevel = getTotalXpForLevel(state.level)
      state.xp = state.totalXp - totalXpForLevel
    },
    
    setTotalXp: (state, action: PayloadAction<number>) => {
      state.totalXp = action.payload
      const newLevel = calculateLevelFromTotalXp(action.payload)
      const totalXpForLevel = getTotalXpForLevel(newLevel)
      
      state.level = newLevel
      state.xp = action.payload - totalXpForLevel
    },
    
    updateStreak: (state, action: PayloadAction<number>) => {
      const oldStreak = state.streak
      state.streak = action.payload
      
      // Award XP for streak milestones
      if (state.streak > 0 && state.streak % 7 === 0 && state.streak > oldStreak) {
        // Award bonus XP for weekly streaks
        const bonusXp = Math.floor(state.streak / 7) * 50
        state.totalXp += bonusXp
        
        const xpGain: XpGain = {
          id: Date.now().toString(),
          amount: bonusXp,
          reason: `${state.streak} day streak bonus!`,
          timestamp: Date.now(),
        }
        
        state.recentXpGains.unshift(xpGain)
      }
    },
    
    addAchievement: (state, action: PayloadAction<UserAchievement>) => {
      const exists = state.achievements.find(
        (a) => a.achievementId === action.payload.achievementId
      )
      
      if (!exists) {
        state.achievements.push(action.payload)
      }
    },
    
    setAchievements: (state, action: PayloadAction<UserAchievement[]>) => {
      state.achievements = action.payload
    },
    
    dismissLevelUpNotification: (state) => {
      state.levelUpNotification = false
    },
    
    clearRecentXpGains: (state) => {
      state.recentXpGains = []
    },
    
    // Actions for specific learning activities
    completeLesson: (state, action: PayloadAction<{ lessonId: string; courseLevel: string }>) => {
      const { courseLevel } = action.payload
      let xpAmount = 10 // Base XP for completing a lesson
      
      // Bonus XP based on course level
      switch (courseLevel) {
        case 'intermediate':
          xpAmount = 15
          break
        case 'advanced':
          xpAmount = 20
          break
        default:
          xpAmount = 10
      }
      
      const xpGain: XpGain = {
        id: Date.now().toString(),
        amount: xpAmount,
        reason: 'Lesson completed',
        timestamp: Date.now(),
      }
      
      state.totalXp += xpAmount
      state.recentXpGains.unshift(xpGain)
    },
    
    completeCourse: (state, action: PayloadAction<{ courseId: string; courseLevel: string }>) => {
      const { courseLevel } = action.payload
      let xpAmount = 100 // Base XP for completing a course
      
      // Bonus XP based on course level
      switch (courseLevel) {
        case 'intermediate':
          xpAmount = 150
          break
        case 'advanced':
          xpAmount = 200
          break
        default:
          xpAmount = 100
      }
      
      const xpGain: XpGain = {
        id: Date.now().toString(),
        amount: xpAmount,
        reason: 'Course completed!',
        timestamp: Date.now(),
      }
      
      state.totalXp += xpAmount
      state.recentXpGains.unshift(xpGain)
    },
  },
})

export const {
  addXp,
  setLevel,
  setTotalXp,
  updateStreak,
  addAchievement,
  setAchievements,
  dismissLevelUpNotification,
  clearRecentXpGains,
  completeLesson,
  completeCourse,
} = gamificationSlice.actions

export default gamificationSlice.reducer

// Selectors
export const selectCurrentLevel = (state: { gamification: GamificationState }) => state.gamification.level
export const selectCurrentXp = (state: { gamification: GamificationState }) => state.gamification.xp
export const selectTotalXp = (state: { gamification: GamificationState }) => state.gamification.totalXp
export const selectStreak = (state: { gamification: GamificationState }) => state.gamification.streak
export const selectAchievements = (state: { gamification: GamificationState }) => state.gamification.achievements
export const selectRecentXpGains = (state: { gamification: GamificationState }) => state.gamification.recentXpGains
export const selectLevelUpNotification = (state: { gamification: GamificationState }) => state.gamification.levelUpNotification

// Helper functions
export const getXpForCurrentLevel = (level: number): number => getXpForLevel(level)
export const getXpForLevelUp = (level: number): number => getXpForNextLevel(level)
export const getLevelProgress = (currentXp: number, level: number): number => {
  const xpForLevel = getXpForLevel(level + 1)
  return Math.floor((currentXp / xpForLevel) * 100)
}