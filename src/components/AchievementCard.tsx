import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trophy, Star, Zap, BookOpen, Calendar, Users } from 'lucide-react'
import type { Achievement, UserAchievement } from '../api/api'
import { cn } from '../utils/cn'

interface AchievementCardProps {
  achievement: Achievement
  userAchievement?: UserAchievement
  isUnlocked?: boolean
  progress?: number
  size?: 'sm' | 'md' | 'lg'
  showProgress?: boolean
  onClick?: () => void
}

export const AchievementCard: React.FC<AchievementCardProps> = ({
  achievement,
  userAchievement,
  isUnlocked = false,
  progress = 0,
  size = 'md',
  showProgress = true,
  onClick,
}) => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'learning':
        return <BookOpen className="h-5 w-5" />
      case 'streak':
        return <Calendar className="h-5 w-5" />
      case 'completion':
        return <Trophy className="h-5 w-5" />
      case 'social':
        return <Users className="h-5 w-5" />
      default:
        return <Star className="h-5 w-5" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'learning':
        return 'from-blue-400 to-blue-600'
      case 'streak':
        return 'from-orange-400 to-orange-600'
      case 'completion':
        return 'from-green-400 to-green-600'
      case 'social':
        return 'from-purple-400 to-purple-600'
      default:
        return 'from-gray-400 to-gray-600'
    }
  }

  const sizeClasses = {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
  }

  const iconSizes = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-16 w-16',
  }

  return (
    <motion.div
      className={cn(
        'relative bg-white dark:bg-gray-800 rounded-xl border transition-all duration-200 cursor-pointer',
        sizeClasses[size],
        isUnlocked
          ? 'border-yellow-200 dark:border-yellow-800 shadow-lg hover:shadow-xl'
          : 'border-gray-200 dark:border-gray-700 hover:shadow-md',
        onClick && 'hover:scale-105'
      )}
      onClick={onClick}
      whileHover={{ scale: onClick ? 1.02 : 1 }}
      whileTap={{ scale: onClick ? 0.98 : 1 }}
    >
      {/* Unlock glow effect */}
      {isUnlocked && (
        <motion.div
          className="absolute inset-0 rounded-xl bg-gradient-to-r from-yellow-400/20 to-orange-400/20"
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        />
      )}

      <div className="relative z-10">
        {/* Achievement icon */}
        <div className="flex items-center justify-between mb-3">
          <div
            className={cn(
              'rounded-full p-3 bg-gradient-to-r',
              getCategoryColor(achievement.category),
              iconSizes[size],
              isUnlocked ? 'opacity-100' : 'opacity-60'
            )}
          >
            <div className="text-white">
              {achievement.icon ? (
                <span className="text-2xl">{achievement.icon}</span>
              ) : (
                getCategoryIcon(achievement.category)
              )}
            </div>
          </div>
          
          {isUnlocked && (
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 10 }}
            >
              <Trophy className="h-5 w-5 text-yellow-500" />
            </motion.div>
          )}
        </div>

        {/* Achievement info */}
        <div className={cn('space-y-1', size === 'sm' && 'space-y-0.5')}>
          <h3
            className={cn(
              'font-semibold',
              size === 'sm' ? 'text-sm' : size === 'md' ? 'text-base' : 'text-lg',
              isUnlocked
                ? 'text-gray-900 dark:text-white'
                : 'text-gray-600 dark:text-gray-400'
            )}
          >
            {achievement.name}
          </h3>
          
          <p
            className={cn(
              'text-gray-600 dark:text-gray-400',
              size === 'sm' ? 'text-xs' : 'text-sm'
            )}
          >
            {achievement.description}
          </p>
        </div>

        {/* XP reward */}
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Zap className="h-4 w-4 text-yellow-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {achievement.xpReward} XP
            </span>
          </div>
          
          {userAchievement && (
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {new Date(userAchievement.earnedAt).toLocaleDateString()}
            </span>
          )}
        </div>

        {/* Progress bar */}
        {showProgress && !isUnlocked && progress > 0 && (
          <div className="mt-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Progress
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                className={cn(
                  'h-full bg-gradient-to-r',
                  getCategoryColor(achievement.category)
                )}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              />
            </div>
          </div>
        )}

        {/* Requirement hint */}
        {!isUnlocked && (
          <div className="mt-2">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {achievement.requirements.type === 'courses_completed' &&
                `Complete ${achievement.requirements.value} courses`}
              {achievement.requirements.type === 'lessons_completed' &&
                `Complete ${achievement.requirements.value} lessons`}
              {achievement.requirements.type === 'days_streak' &&
                `Maintain ${achievement.requirements.value} day streak`}
              {achievement.requirements.type === 'xp_earned' &&
                `Earn ${achievement.requirements.value} XP`}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  )
}

// Achievement notification component
interface AchievementNotificationProps {
  achievement: Achievement
  isVisible: boolean
  onClose: () => void
}

export const AchievementNotification: React.FC<AchievementNotificationProps> = ({
  achievement,
  isVisible,
  onClose,
}) => {
  React.useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose()
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [isVisible, onClose])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: -50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: -50 }}
          className="fixed top-4 right-4 z-50 bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-4 rounded-xl shadow-2xl max-w-sm"
        >
          <div className="flex items-center gap-3">
            <motion.div
              animate={{
                rotate: [0, 10, -10, 10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 0.6,
                repeat: 2,
              }}
            >
              <Trophy className="h-8 w-8" />
            </motion.div>
            
            <div className="flex-1">
              <h3 className="font-semibold text-lg">Achievement Unlocked!</h3>
              <p className="text-sm opacity-90">{achievement.name}</p>
              <div className="flex items-center gap-1 mt-1">
                <Zap className="h-3 w-3" />
                <span className="text-xs">+{achievement.xpReward} XP</span>
              </div>
            </div>
            
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white"
            >
              ×
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}