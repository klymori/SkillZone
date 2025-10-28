import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { 
  Clock, 
  Users, 
  Star, 
  BookOpen, 
  Play,
  Award,
  TrendingUp
} from 'lucide-react'
import type { Course } from '../api/api'
import type { RootState } from '../app/store'
import { Button } from './Button'
import { cn } from '../utils/cn'

interface CourseCardProps {
  course: Course
  isFavorite?: boolean
  showProgress?: boolean
  progress?: number
  className?: string
}

export const CourseCard: React.FC<CourseCardProps> = ({
  course,
  isFavorite = false,
  showProgress = false,
  progress = 0,
  className,
}) => {
  const { user } = useSelector((state: RootState) => state.auth)
  const [isLoading, setIsLoading] = React.useState(false)

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      case 'advanced':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
    }
  }

  const getLevelLabel = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'Начинающий'
      case 'intermediate':
        return 'Средний'
      case 'advanced':
        return 'Продвинутый'
      default:
        return level
    }
  }

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'beginner':
        return <Play className="h-3 w-3" />
      case 'intermediate':
        return <TrendingUp className="h-3 w-3" />
      case 'advanced':
        return <Award className="h-3 w-3" />
      default:
        return <BookOpen className="h-3 w-3" />
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        'group relative bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700 h-full flex flex-col',
        className
      )}
    >
      <Link to={`/courses/${course.id}`} className="block flex flex-col h-full" >
        {/* Course thumbnail - consistent 16:9 aspect ratio */}
        <div className="relative aspect-video bg-gradient-to-br from-primary-400 to-primary-600 overflow-hidden">
          {course.thumbnail ? (
            <img
              src={course.thumbnail}
              alt={course.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <BookOpen className="h-16 w-16 text-white opacity-50" />
            </div>
          )}
            
          {/* Level badge */}
          <div className="absolute top-3 left-3">
            <span
              className={cn(
                'inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium',
                getLevelColor(course.level)
              )}
            >
              {getLevelIcon(course.level)}
              {getLevelLabel(course.level)}
            </span>
          </div>

          {/* Price tag */}
          <div className="absolute bottom-3 right-3">
            {course.isFree ? (
              <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                Бесплатно
              </span>
            ) : (
              <span className="bg-primary-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                {course.price} сом
              </span>
            )}
          </div>

          {/* Progress bar (if showing progress) */}
          {showProgress && (
            <div className="absolute bottom-0 left-0 w-full h-1 bg-black/20">
              <div
                className="h-full bg-green-400 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </div>

        {/* Course content */}
        <div className="p-6 flex-grow flex flex-col" >
          {/* Course header */}
          <div className="mb-3">
            <h3 className="font-semibold text-lg text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
              {course.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {course.instructor}
            </p>
          </div>

          {/* Course description */}
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
            {course.shortDescription || course.description}
          </p>

          {/* Course metadata */}
          <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{course.duration}ч</span>
              </div>
              <div className="flex items-center gap-1">
                <BookOpen className="h-4 w-4" />
                <span>{course.lessons.length} уроков</span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span>{course.rating}</span>
            </div>
          </div>

          {/* Course tags */}
          {course.tags && course.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-4">
              {course.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full"
                >
                  {tag}
                </span>
              ))}
              {course.tags.length > 3 && (
                <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-xs rounded-full">
                  +{course.tags.length - 3}
                </span>
              )}
            </div>
          )}

          {/* Action button */}
          <div className="flex items-center justify-between mt-auto pt-4">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              <Users className="h-4 w-4 inline mr-1" />
              {course.studentsCount.toLocaleString()} студентов
            </div>
            <Button
              variant="primary"
              size="sm"
              className="group-hover:shadow-md transition-shadow"
            >
              Подробнее
            </Button>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}