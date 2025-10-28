import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Star, 
  Clock, 
  Users, 
  BookOpen, 
  Award,
  ChevronRight,
  Play,
  Lock,
  CheckCircle,
  MessageCircle,
  ThumbsUp,
  Send
} from 'lucide-react'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '../app/store'
import { mockCourses } from '../utils/mockData'
import { Button } from '../components/Button'
import { addNotification } from '../features/ui/uiSlice'
import { getCourseReviews, addReview, toggleReviewLike, hasUserLikedReview } from '../firebase/services/reviewService'

interface Review {
  id: string
  courseId: string
  authorId: string
  authorName: string
  authorAvatar?: string
  text: string
  rating: number
  likesCount: number
  createdAt: string
  replies: Reply[]
}

interface Reply {
  id: string
  reviewId: string
  authorId: string
  authorName: string
  authorAvatar?: string
  text: string
  createdAt: string
}

export const CourseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth)
  const [activeTab, setActiveTab] = useState<'overview' | 'curriculum' | 'reviews'>('overview')
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' })
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [replyText, setReplyText] = useState('')
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [userLikedReviews, setUserLikedReviews] = useState<Record<string, boolean>>({})

  const course = mockCourses.find((c) => c.id === id)

  // Load reviews from Firebase on component mount and when user changes
  React.useEffect(() => {
    if (course) {
      const loadReviews = async () => {
        try {
          setLoading(true)
          console.log('Loading reviews for course:', course.id)
          const firebaseReviews = await getCourseReviews(course.id)
          console.log('Loaded reviews:', firebaseReviews)
          
          // Convert to our Review type
          const convertedReviews: Review[] = firebaseReviews.map(review => ({
            ...review,
            createdAt: review.createdAt.toISOString(),
            replies: [] // For now, we're not implementing replies in this example
          }))
          
          setReviews(convertedReviews)
          
          // Check which reviews the current user has liked
          if (user) {
            const likedReviews: Record<string, boolean> = {}
            for (const review of firebaseReviews) {
              try {
                const hasLiked = await hasUserLikedReview(course.id, review.id, user.id)
                likedReviews[review.id] = hasLiked
              } catch (error) {
                console.error('Failed to check if user liked review:', error)
                likedReviews[review.id] = false
              }
            }
            setUserLikedReviews(likedReviews)
          }
        } catch (error) {
          console.error('Failed to load reviews:', error)
          // Set empty reviews array on error
          setReviews([])
        } finally {
          setLoading(false)
        }
      }
      
      loadReviews()
    }
  }, [course, user])

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Курс не найден</h1>
          <Button onClick={() => navigate('/courses')}>Назад к курсам</Button>
        </div>
      </div>
    )
  }

  const handleSubmitReview = async () => {
    if (!isAuthenticated || !user || !course) {
      navigate('/login')
      return
    }

    if (newReview.comment.trim()) {
      try {
        console.log('Submitting review for course:', course.id)
        const reviewData = {
          courseId: course.id,
          authorId: user.id,
          authorName: user.name,
          authorAvatar: user.name.substring(0, 2).toUpperCase(),
          text: newReview.comment,
          rating: newReview.rating,
        }
        console.log('Review data:', reviewData)
        
        const reviewId = await addReview(course.id, reviewData)
        console.log('Review submitted with ID:', reviewId)
        
        // Create the new review object
        const newReviewObj: Review = {
          id: reviewId,
          courseId: course.id,
          authorId: user.id,
          authorName: user.name,
          authorAvatar: user.name.substring(0, 2).toUpperCase(),
          text: newReview.comment,
          rating: newReview.rating,
          likesCount: 0,
          createdAt: new Date().toISOString(),
          replies: [],
        }
        
        // Add the new review to the beginning of the reviews array
        setReviews(prev => [newReviewObj, ...prev])
        setNewReview({ rating: 5, comment: '' })
        
        // Show success notification
        dispatch(addNotification({
          type: 'success',
          title: 'Отзыв отправлен',
          message: 'Ваш отзыв успешно добавлен',
        }) as any)
        
        // Force reload reviews after a short delay to ensure Firebase has processed the write
        setTimeout(async () => {
          try {
            console.log('Reloading reviews after submission')
            const firebaseReviews = await getCourseReviews(course.id)
            console.log('Reloaded reviews:', firebaseReviews)
            const convertedReviews: Review[] = firebaseReviews.map(review => ({
              ...review,
              createdAt: review.createdAt.toISOString(),
              replies: []
            }))
            setReviews(convertedReviews)
            
            // Re-check liked status for all reviews
            if (user) {
              const likedReviews: Record<string, boolean> = {}
              for (const review of firebaseReviews) {
                try {
                  const hasLiked = await hasUserLikedReview(course.id, review.id, user.id)
                  likedReviews[review.id] = hasLiked
                } catch (error) {
                  console.error('Failed to check if user liked review:', error)
                  likedReviews[review.id] = false
                }
              }
              setUserLikedReviews(likedReviews)
            }
          } catch (error) {
            console.error('Failed to reload reviews:', error)
          }
        }, 2000)
      } catch (error) {
        console.error('Failed to submit review:', error)
        dispatch(addNotification({
          type: 'error',
          title: 'Ошибка',
          message: 'Не удалось отправить отзыв. Пожалуйста, попробуйте еще раз.',
        }) as any)
      }
    } else {
      dispatch(addNotification({
        type: 'error',
        title: 'Ошибка',
        message: 'Пожалуйста, напишите отзыв',
      }) as any)
    }
  }

  const handleLikeReview = async (reviewId: string) => {
    if (!user || !course) {
      dispatch(addNotification({
        type: 'error',
        title: 'Ошибка',
        message: 'Пожалуйста, войдите чтобы оценить отзыв',
      }) as any)
      return
    }
    
    try {
      const result = await toggleReviewLike(course.id, reviewId, user.id)
      
      // Update the reviews state
      setReviews(prev => prev.map(review => 
        review.id === reviewId 
          ? { ...review, likesCount: result.likesCount } 
          : review
      ))
      
      // Update the user liked state
      setUserLikedReviews(prev => ({
        ...prev,
        [reviewId]: result.liked
      }))
    } catch (error) {
      console.error('Failed to like review:', error)
      dispatch(addNotification({
        type: 'error',
        title: 'Ошибка',
        message: 'Не удалось оценить отзыв. Пожалуйста, попробуйте еще раз.',
      }) as any)
    }
  }

  const avgRating = reviews.length > 0 
    ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length 
    : course.rating

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <button
              onClick={() => navigate('/courses')}
              className="flex items-center gap-2 mb-6 hover:opacity-80 transition-opacity"
            >
              <ChevronRight className="h-5 w-5 rotate-180" />
              Назад к курсам
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm mb-4">
                  {course.category.charAt(0).toUpperCase() + course.category.slice(1)}
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{course.title}</h1>
                <p className="text-xl opacity-90 mb-6">{course.description}</p>

                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{avgRating.toFixed(1)}</span>
                    <span className="opacity-75">({reviews.length} отзывов)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    <span>{course.studentsCount.toLocaleString()} студентов</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    <span>{course.duration} часов</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-lg font-bold">
                    {course.instructor.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-sm opacity-75">Преподаватель</p>
                    <p className="font-semibold">{course.instructor}</p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-xl">
                  <div className="text-center mb-6">
                    {course.isFree ? (
                      <p className="text-3xl font-bold text-green-600 dark:text-green-400">БЕСПЛАТНО</p>
                    ) : (
                      <p className="text-3xl font-bold text-gray-900 dark:text-white">
                        {course.price} сом
                      </p>
                    )}
                  </div>
                  <Button 
                    variant="primary" 
                    className="w-full mb-4"
                    onClick={() => {
                      if (isAuthenticated) {
                        navigate(`/courses/${course.id}/lessons/${course.lessons[0].id}`)
                      } else {
                        navigate('/login')
                      }
                    }}
                  >
                    {isAuthenticated ? 'Начать обучение' : 'Войти для обучения'}
                  </Button>
                  <Button variant="outline" className="w-full mb-6 text-gray-900 dark:text-white bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600" onClick={() => {
                    if (course.lessons.length > 0) {
                      navigate(`/courses/${course.id}/lessons/${course.lessons[0].id}`)
                    }
                  }}>
                    <Play className="h-5 w-5 mr-2" />
                    Просмотр курса
                  </Button>

                  <div className="border-t border-gray-200 dark:border-gray-700 pt-6 space-y-3 text-gray-700 dark:text-gray-300">
                    <div className="flex items-center gap-3">
                      <BookOpen className="h-5 w-5" />
                      <span>{course.lessons.length} уроков</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Award className="h-5 w-5" />
                      <span>Сертификат об окончании</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Users className="h-5 w-5" />
                      <span>Пожизненный доступ</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Course Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700 mb-8">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-4 px-2 font-semibold transition-colors ${
                activeTab === 'overview'
                  ? 'border-b-2 border-primary-600 text-primary-600 dark:text-primary-400'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Обзор
            </button>
            <button
              onClick={() => setActiveTab('curriculum')}
              className={`pb-4 px-2 font-semibold transition-colors ${
                activeTab === 'curriculum'
                  ? 'border-b-2 border-primary-600 text-primary-600 dark:text-primary-400'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Программа
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-4 px-2 font-semibold transition-colors ${
                activeTab === 'reviews'
                  ? 'border-b-2 border-primary-600 text-primary-600 dark:text-primary-400'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Отзывы ({reviews.length})
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Чему вы научитесь</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {course.lessons.map((lesson) => (
                    <li key={lesson.id} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 dark:text-gray-300">{lesson.title}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Требования</h2>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Базовое понимание предмета</li>
                  <li>• Компьютер с подключением к интернету</li>
                  <li>• Готовность учиться и практиковаться</li>
                </ul>
              </div>
            </div>

            <div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Теги</h3>
                <div className="flex flex-wrap gap-2">
                  {course.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'curriculum' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
          >
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Программа курса</h2>
              <div className="space-y-2">
                {course.lessons.map((lesson, index) => {
                  const isAccessible = index === 0 || isAuthenticated
                  return (
                    <div
                      key={lesson.id}
                      className={`flex items-center justify-between p-4 rounded-lg transition-colors ${
                        isAccessible 
                          ? 'bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer'
                          : 'bg-gray-50 dark:bg-gray-700/50'
                      }`}
                      onClick={() => {
                        if (isAccessible) {
                          navigate(`/courses/${course.id}/lessons/${lesson.id}`)
                        }
                      }}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
                          {index === 0 || isAuthenticated ? (
                            <Play className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                          ) : (
                            <Lock className="h-5 w-5 text-gray-400" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">
                            {lesson.title}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Урок {lesson.order}</p>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">15 мин</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'reviews' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            {/* Add Review */}
            {isAuthenticated ? (
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Оставить отзыв</h3>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Рейтинг
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        onClick={() => setNewReview({ ...newReview, rating })}
                        className="transition-transform hover:scale-110"
                      >
                        <Star
                          className={`h-8 w-8 ${
                            rating <= newReview.rating
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300 dark:text-gray-600'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Ваш отзыв
                  </label>
                  <textarea
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Поделитесь своим опытом прохождения этого курса..."
                  />
                </div>
                <Button onClick={handleSubmitReview} variant="primary">
                  Отправить отзыв
                </Button>
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg text-center">
                <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Войдите, чтобы оставить отзыв
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Только зарегистрированные пользователи могут оставлять отзывы
                </p>
                <Button onClick={() => navigate('/login')} variant="primary">
                  Войти
                </Button>
              </div>
            )}

            {/* Reviews List */}
            <div className="space-y-4">
              {loading ? (
                <div className="text-center py-8">
                  <div className="w-8 h-8 border-2 border-primary-200 dark:border-primary-800 border-t-primary-600 dark:border-t-primary-400 rounded-full animate-spin mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-300">Загрузка отзывов...</p>
                </div>
              ) : reviews.length === 0 ? (
                <div className="text-center py-8">
                  <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Пока нет отзывов
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Будьте первым, кто оставит отзыв об этом курсе
                  </p>
                </div>
              ) : (
                reviews.map((review) => (
                  <div
                    key={review.id}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                        {review.authorAvatar}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white">{review.authorName}</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {new Date(review.createdAt).toLocaleDateString('ru-RU')}
                            </p>
                          </div>
                          <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'text-gray-300 dark:text-gray-600'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">{review.text}</p>
                        <div className="flex items-center gap-4 text-sm">
                          <button 
                            onClick={() => handleLikeReview(review.id)}
                            className="flex items-center gap-1 text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
                          >
                            <ThumbsUp 
                              className={`h-4 w-4 ${userLikedReviews[review.id] ? 'fill-primary-500 text-primary-500' : ''}`} 
                            />
                            Полезно ({review.likesCount})
                          </button>
                          <button className="flex items-center gap-1 text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
                            <MessageCircle className="h-4 w-4" />
                            Ответить
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}