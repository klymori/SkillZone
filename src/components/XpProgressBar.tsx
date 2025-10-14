import React from 'react'
import { motion } from 'framer-motion'
import { Trophy, Zap, Star } from 'lucide-react'
import { cn } from '../utils/cn'

interface XpProgressBarProps {
  currentXp: number
  xpForNextLevel: number
  level: number
  className?: string
  showLabel?: boolean
  size?: 'sm' | 'md' | 'lg'
}

export const XpProgressBar: React.FC<XpProgressBarProps> = ({
  currentXp,
  xpForNextLevel,
  level,
  className,
  showLabel = true,
  size = 'md',
}) => {
  const progress = Math.min((currentXp / xpForNextLevel) * 100, 100)
  const isMaxLevel = currentXp >= xpForNextLevel && xpForNextLevel === 0

  const sizeClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4',
  }

  const getLevelIcon = (level: number) => {
    if (level >= 50) return <Trophy className="h-4 w-4 text-yellow-500" />
    if (level >= 25) return <Star className="h-4 w-4 text-purple-500" />
    return <Zap className="h-4 w-4 text-blue-500" />
  }

  const getLevelColor = (level: number) => {
    if (level >= 50) return 'from-yellow-400 to-orange-500'
    if (level >= 25) return 'from-purple-400 to-pink-500'
    if (level >= 10) return 'from-blue-400 to-indigo-500'
    return 'from-green-400 to-blue-500'
  }

  return (
    <div className={cn('space-y-2', className)}>
      {showLabel && (
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            {getLevelIcon(level)}
            <span className="font-semibold text-gray-900 dark:text-white">
              Level {level}
            </span>
          </div>
          {!isMaxLevel && (
            <span className="text-gray-600 dark:text-gray-400">
              {currentXp}/{xpForNextLevel} XP
            </span>
          )}
        </div>
      )}
      
      <div className={cn(
        'relative bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden',
        sizeClasses[size]
      )}>
        <motion.div
          className={cn(
            'h-full rounded-full bg-gradient-to-r',
            getLevelColor(level)
          )}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
        
        {/* Sparkle effect */}
        {progress > 80 && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatDelay: 2,
            }}
          />
        )}
      </div>
      
      {isMaxLevel && showLabel && (
        <div className="text-center">
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-semibold rounded-full">
            <Trophy className="h-3 w-3" />
            Max Level Reached!
          </span>
        </div>
      )}
    </div>
  )
}