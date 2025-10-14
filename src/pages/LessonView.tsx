import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  ChevronLeft, 
  ChevronRight, 
  BookOpen, 
  CheckCircle,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  Maximize,
  List,
  X
} from 'lucide-react'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '../app/store'
import { mockCourses } from '../utils/mockData'
import { Button } from '../components/Button'
import { addXp } from '../features/progress/gamificationSlice'

// Sample YouTube video IDs for lessons
const sampleVideoIds: Record<string, string> = {
  '1-1': 'dQw4w9WgXcQ', // Placeholder - replace with actual educational content
  '1-2': 'dQw4w9WgXcQ',
  '1-3': 'dQw4w9WgXcQ', 
  '1-4': 'dQw4w9WgXcQ',
  '2-1': 'dQw4w9WgXcQ',
  '2-2': 'dQw4w9WgXcQ',
  '2-3': 'dQw4w9WgXcQ',
  '3-1': 'dQw4w9WgXcQ',
  '3-2': 'dQw4w9WgXcQ',
  '3-3': 'dQw4w9WgXcQ',
  // Add more video IDs for other lessons
}

interface LessonProgress {
  lessonId: string
  completed: boolean
  watchTime: number
  totalTime: number
}

export const LessonView: React.FC = () => {
  const { courseId, lessonId } = useParams<{ courseId: string; lessonId: string }>()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { isAuthenticated } = useSelector((state: RootState) => state.auth)
  
  const [showPlaylist, setShowPlaylist] = useState(false)
  const [lessonProgress, setLessonProgress] = useState<LessonProgress[]>([])
  const [currentTime, setCurrentTime] = useState(0)
  const [isVideoCompleted, setIsVideoCompleted] = useState(false)

  const course = mockCourses.find(c => c.id === courseId)
  const currentLesson = course?.lessons.find(l => l.id === lessonId)
  const currentIndex = course?.lessons.findIndex(l => l.id === lessonId) ?? 0
  const videoId = sampleVideoIds[lessonId || ''] || 'dQw4w9WgXcQ'

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }

    if (!course) {
      navigate('/courses')
      return
    }

    // Initialize lesson progress from localStorage
    const saved = localStorage.getItem(`course-${courseId}-progress`)
    if (saved) {
      setLessonProgress(JSON.parse(saved))
    }
  }, [courseId, lessonId, isAuthenticated, navigate, course])

  const markLessonComplete = () => {
    if (!currentLesson) return

    const updatedProgress = [...lessonProgress]
    const existingIndex = updatedProgress.findIndex(p => p.lessonId === currentLesson.id)
    
    if (existingIndex >= 0) {
      updatedProgress[existingIndex].completed = true
    } else {
      updatedProgress.push({
        lessonId: currentLesson.id,
        completed: true,
        watchTime: 900, // 15 minutes
        totalTime: 900
      })
    }

    setLessonProgress(updatedProgress)
    localStorage.setItem(`course-${courseId}-progress`, JSON.stringify(updatedProgress))
    setIsVideoCompleted(true)

    // Award XP for completing lesson
    dispatch(addXp(50)) // 50 XP per lesson
  }

  const navigateToLesson = (direction: 'prev' | 'next') => {
    if (!course) return

    const newIndex = direction === 'prev' ? currentIndex - 1 : currentIndex + 1
    const newLesson = course.lessons[newIndex]
    
    if (newLesson) {
      navigate(`/courses/${courseId}/lessons/${newLesson.id}`)
    }
  }

  const isLessonCompleted = (lessonId: string) => {
    return lessonProgress.some(p => p.lessonId === lessonId && p.completed)
  }

  if (!course || !currentLesson) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Урок не найден
          </h1>
          <Button onClick={() => navigate('/courses')}>
            Вернуться к курсам
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link
                to={`/courses/${courseId}`}
                className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <ChevronLeft className="h-5 w-5" />
                <span className="hidden sm:inline">Назад к курсу</span>
              </Link>
              <div className="h-6 w-px bg-gray-300 dark:bg-gray-600" />
              <h1 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                {course.title}
              </h1>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Урок {currentIndex + 1} из {course.lessons.length}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowPlaylist(!showPlaylist)}
                className="lg:hidden"
              >
                <List className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="flex">
          {/* Main Content */}
          <div className={`flex-1 ${showPlaylist ? 'lg:mr-80' : ''}`}>
            <div className="p-6">
              {/* Video Player */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden mb-6">
                <div className="aspect-video bg-black">
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&showinfo=0`}
                    title={currentLesson.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                
                {/* Video Controls Bar */}
                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                        {currentLesson.title}
                      </h2>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Урок {currentLesson.order} • {course.instructor}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {!isVideoCompleted && (
                        <Button
                          onClick={markLessonComplete}
                          variant="primary"
                          size="sm"
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Завершить урок
                        </Button>
                      )}
                      {isVideoCompleted && (
                        <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                          <CheckCircle className="h-5 w-5" />
                          <span className="text-sm font-medium">Урок завершен!</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Lesson Navigation */}
              <div className="flex items-center justify-between mb-6">
                <Button
                  variant="outline"
                  onClick={() => navigateToLesson('prev')}
                  disabled={currentIndex === 0}
                  className="flex items-center gap-2"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Предыдущий урок
                </Button>
                
                <div className="text-center">
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2">
                    <div
                      className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${((currentIndex + 1) / course.lessons.length) * 100}%` }}
                    />
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Прогресс курса: {currentIndex + 1}/{course.lessons.length}
                  </p>
                </div>

                <Button
                  variant="primary"
                  onClick={() => navigateToLesson('next')}
                  disabled={currentIndex === course.lessons.length - 1}
                  className="flex items-center gap-2"
                >
                  Следующий урок
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>

              {/* Lesson Description */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  О этом уроке
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  В этом уроке вы изучите: {currentLesson.title}
                </p>
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Что вы изучите:</h4>
                  <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                    <li>• Основные концепции и принципы</li>
                    <li>• Практические примеры и упражнения</li>
                    <li>• Применение знаний на практике</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Playlist Sidebar */}
          <motion.div
            initial={false}
            animate={{ x: showPlaylist ? 0 : '100%' }}
            className="fixed lg:relative top-0 right-0 h-full w-80 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 z-40 lg:z-auto overflow-y-auto"
          >
            <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Содержание курса
                  </h3>
                </div>
                <button
                  onClick={() => setShowPlaylist(false)}
                  className="lg:hidden p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                >
                  <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                </button>
              </div>
            </div>

            <div className="p-4">
              <div className="space-y-2">
                {course.lessons.map((lesson, index) => {
                  const isActive = lesson.id === lessonId
                  const isCompleted = isLessonCompleted(lesson.id)
                  const isAccessible = index === 0 || isLessonCompleted(course.lessons[index - 1].id)

                  return (
                    <Link
                      key={lesson.id}
                      to={`/courses/${courseId}/lessons/${lesson.id}`}
                      className={`block p-3 rounded-lg transition-all duration-200 ${
                        isActive
                          ? 'bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800'
                          : isAccessible
                          ? 'hover:bg-gray-50 dark:hover:bg-gray-700/50'
                          : 'opacity-50 cursor-not-allowed'
                      }`}
                      onClick={!isAccessible ? (e) => e.preventDefault() : undefined}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                          isCompleted
                            ? 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400'
                            : isActive
                            ? 'bg-primary-100 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                            : isAccessible
                            ? 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-400'
                        }`}>
                          {isCompleted ? (
                            <CheckCircle className="h-4 w-4" />
                          ) : isActive ? (
                            <Play className="h-4 w-4" />
                          ) : (
                            lesson.order
                          )}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h4 className={`text-sm font-medium truncate ${
                            isActive
                              ? 'text-primary-900 dark:text-primary-100'
                              : isAccessible
                              ? 'text-gray-900 dark:text-white'
                              : 'text-gray-400'
                          }`}>
                            {lesson.title}
                          </h4>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {isCompleted ? 'Завершено' : isActive ? 'Текущий урок' : '15 мин'}
                          </p>
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {showPlaylist && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setShowPlaylist(false)}
        />
      )}
    </div>
  )
}