import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  ChevronLeft, 
  ChevronRight, 
  BookOpen, 
  CheckCircle,
  Play,
  List,
  X,
  FileText
} from 'lucide-react'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '../app/store'
import { mockCourses } from '../utils/mockData'
import { Button } from '../components/Button'
import { QuizComponent } from '../components/Quiz'
import { addXp } from '../features/progress/gamificationSlice'
import { updateLessonProgress, getCourseProgress, type QuizResult } from '../firebase/services/progressService'
import { submitQuizResult, mockQuizzes, type Quiz } from '../firebase/services/quizService'

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
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth)
  
  const [showPlaylist, setShowPlaylist] = useState(false)
  const [lessonProgress, setLessonProgress] = useState<Record<string, LessonProgress>>({})
  const [isVideoCompleted, setIsVideoCompleted] = useState(false)
  const [loading, setLoading] = useState(true)
  const [quiz, setQuiz] = useState<Quiz | null>(null)
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null)
  const [quizLoading, setQuizLoading] = useState(false)
  const [showQuiz, setShowQuiz] = useState(false)

  const course = mockCourses.find(c => c.id === courseId)
  const currentLesson = course?.lessons.find(l => l.id === lessonId)
  const currentIndex = course?.lessons.findIndex(l => l.id === lessonId) ?? 0

  // Extract YouTube video ID from URL if content is a YouTube URL
  const getYouTubeVideoId = (url: string): string => {
    if (!url) return 'dQw4w9WgXcQ' // Default fallback
    
    // Check if it's a YouTube URL
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    
    return (match && match[2].length === 11) ? match[2] : 'dQw4w9WgXcQ';
  }

  const videoId = currentLesson?.content ? getYouTubeVideoId(currentLesson.content) : 'dQw4w9WgXcQ'

  // Load progress and quiz from Firebase
  useEffect(() => {
    if (!isAuthenticated || !user || !courseId) {
      navigate('/login')
      return
    }

    if (!course) {
      navigate('/courses')
      return
    }

    const loadProgress = async () => {
      try {
        setLoading(true)
        const progress = await getCourseProgress(user.id, courseId)
        
        if (progress) {
          // Convert to our local format
          const progressRecord: Record<string, LessonProgress> = {}
          Object.entries(progress.lessonProgress).forEach(([lessonId, lessonProgress]) => {
            progressRecord[lessonId] = {
              lessonId,
              completed: lessonProgress.completed,
              watchTime: lessonProgress.watchedSeconds,
              totalTime: 900 // 15 minutes default
            }
          })
          setLessonProgress(progressRecord)
          
          // Check if current lesson is completed
          if (lessonId && progressRecord[lessonId]?.completed) {
            setIsVideoCompleted(true)
          }
          
          // Check if there's a quiz result for this lesson
          if (lessonId && progress.quizResults && progress.quizResults[lessonId]) {
            setQuizResult(progress.quizResults[lessonId] as QuizResult)
          }
        }
        
        // Load quiz for this lesson
        // In a real app, this would fetch from Firebase
        // For now, we'll use mock data
        if (lessonId && mockQuizzes[lessonId!]) {
          setQuiz(mockQuizzes[lessonId!] as Quiz)
        }
      } catch (error) {
        console.error('Failed to load progress:', error)
      } finally {
        setLoading(false)
      }
    }

    loadProgress()
  }, [courseId, lessonId, isAuthenticated, navigate, course, user])

  const markLessonComplete = async () => {
    if (!currentLesson || !user || !courseId) return

    try {
      // Update progress in Firebase
      await updateLessonProgress(user.id, courseId, currentLesson.id, {
        watchedSeconds: 900, // 15 minutes
        completed: true
      })
      
      // Update local state
      setLessonProgress(prev => ({
        ...prev,
        [currentLesson.id]: {
          lessonId: currentLesson.id,
          completed: true,
          watchTime: 900,
          totalTime: 900
        }
      }))
      
      setIsVideoCompleted(true)

      // Award XP for completing lesson
      dispatch(addXp({ amount: 50, reason: "Урок завершен" }))
    } catch (error) {
      console.error('Failed to mark lesson complete:', error)
    }
  }

  const handleQuizSubmit = async (answers: number[]) => {
    if (!quiz || !user || !courseId || !lessonId) return

    try {
      setQuizLoading(true)
      
      // Submit quiz result
      const result = await submitQuizResult(user.id, courseId, lessonId, quiz.id, answers, quiz)
      setQuizResult(result as QuizResult)
      
      // If quiz passed, mark lesson as complete and award XP
      if (result.passed) {
        await markLessonComplete()
        
        // Award additional XP for passing quiz
        dispatch(addXp({ amount: quiz.xpReward, reason: "Тест пройден" }))
      }
      
      // Show quiz results
      setShowQuiz(true)
    } catch (error) {
      console.error('Failed to submit quiz:', error)
    } finally {
      setQuizLoading(false)
    }
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
    return lessonProgress[lessonId]?.completed || false
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-200 dark:border-primary-800 border-t-primary-600 dark:border-t-primary-400 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-300">Загрузка прогресса...</p>
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
                className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
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

      <div className="max-w-7xl mx-auto w-full">
        <div className="flex flex-col lg:flex-row">
          {/* Main Content */}
          <div className="flex-1">
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
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                            <CheckCircle className="h-5 w-5" />
                            <span className="text-sm font-medium">Урок завершен!</span>
                          </div>
                          {quiz && !quizResult?.passed && (
                            <Button
                              variant="primary"
                              size="sm"
                              onClick={() => setShowQuiz(true)}
                              className="ml-4"
                            >
                              <FileText className="h-4 w-4 mr-2" />
                              Пройти тест
                            </Button>
                          )}
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
              
              {/* Quiz Modal */}
              {showQuiz && quiz && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                  <div className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                          {quiz.title}
                        </h3>
                        <button
                          onClick={() => setShowQuiz(false)}
                          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                      <QuizComponent
                        quiz={quiz}
                        onSubmit={handleQuizSubmit}
                        quizResult={quizResult}
                        isLoading={quizLoading}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Playlist Sidebar */}
          <motion.div
            initial={false}
            animate={{ x: showPlaylist ? 0 : '100%' }}
            className="fixed lg:static top-0 right-0 h-full w-full sm:w-80 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 z-40 overflow-y-auto lg:h-auto lg:w-80"
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