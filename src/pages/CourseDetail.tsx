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
  ThumbsUp
} from 'lucide-react'
import { useSelector } from 'react-redux'
import type { RootState } from '../app/store'
import { mockCourses } from '../utils/mockData'
import { Button } from '../components/Button'

interface Review {
  id: string
  courseId: string
  userId: string
  userName: string
  userAvatar: string
  rating: number
  comment: string
  date: string
  helpful: number
  likedBy: string[]
  replies: Reply[]
}

interface Reply {
  id: string
  userId: string
  userName: string
  userAvatar: string
  comment: string
  date: string
}

export const CourseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth)
  const [activeTab, setActiveTab] = useState<'overview' | 'curriculum' | 'reviews'>('overview')
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' })
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [replyText, setReplyText] = useState('')
  const [reviews, setReviews] = useState<Review[]>([]) // Start with empty reviews

  const course = mockCourses.find((c) => c.id === id)

  // Load reviews from localStorage on component mount
  React.useEffect(() => {
    if (course) {
      const savedReviews = localStorage.getItem(`course-${course.id}-reviews`)
      if (savedReviews) {
        setReviews(JSON.parse(savedReviews))
      }
    }
  }, [course])

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

  const handleSubmitReview = () => {
    if (!isAuthenticated || !user || !course) {
      navigate('/login')
      return
    }

    if (newReview.comment.trim()) {
      const review: Review = {
        id: Date.now().toString(),
        courseId: course.id,
        userId: user.id,
        userName: user.name,
        userAvatar: user.name.substring(0, 2).toUpperCase(),
        rating: newReview.rating,
        comment: newReview.comment,
        date: new Date().toISOString().split('T')[0],
        helpful: 0,
        likedBy: [],
        replies: [],
      }
      const updatedReviews = [review, ...reviews]
      setReviews(updatedReviews)
      localStorage.setItem(`course-${course.id}-reviews`, JSON.stringify(updatedReviews))
      setNewReview({ rating: 5, comment: '' })
    }
  }

  const handleLikeReview = (reviewId: string) => {
    if (!user) return
    
    const updatedReviews = reviews.map(review => {
      if (review.id === reviewId) {
        const isLiked = review.likedBy.includes(user.id)
        return {
          ...review,
          helpful: isLiked ? review.helpful - 1 : review.helpful + 1,
          likedBy: isLiked 
            ? review.likedBy.filter(id => id !== user.id)
            : [...review.likedBy, user.id]
        }
      }
      return review
    })
    setReviews(updatedReviews)
    localStorage.setItem(`course-${course.id}-reviews`, JSON.stringify(updatedReviews))
  }

  const handleReply = (reviewId: string) => {
    if (!user || !replyText.trim()) return

    const reply: Reply = {
      id: Date.now().toString(),
      userId: user.id,
      userName: user.name,
      userAvatar: user.name.substring(0, 2).toUpperCase(),
      comment: replyText,
      date: new Date().toISOString().split('T')[0],
    }

    const updatedReviews = reviews.map(review => {
      if (review.id === reviewId) {
        return {
          ...review,
          replies: [...review.replies, reply]
        }
      }
      return review
    })
    
    setReviews(updatedReviews)
    localStorage.setItem(`course-${course.id}-reviews`, JSON.stringify(updatedReviews))
    setReplyingTo(null)
    setReplyText('')
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
                      <p className="text-3xl font-bold text-green-600 dark:text-green-400">FREE</p>
                    ) : (
                      <p className="text-3xl font-bold text-gray-900 dark:text-white">
                        ${course.price}
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
            {isAuthenticated && (
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Write a Review</h3>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Rating
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
                    Your Review
                  </label>
                  <textarea
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Share your experience with this course..."
                  />
                </div>
                <Button onClick={handleSubmitReview} variant="primary">
                  Submit Review
                </Button>
              </div>
            )}

            {/* Reviews List */}
            <div className="space-y-4">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                      {review.userAvatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white">{review.userName}</h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{review.date}</p>
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
                      <p className="text-gray-700 dark:text-gray-300 mb-4">{review.comment}</p>
                      <div className="flex items-center gap-4 text-sm">
                        <button className="flex items-center gap-1 text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
                          <ThumbsUp className="h-4 w-4" />
                          Helpful ({review.helpful})
                        </button>
                        <button className="flex items-center gap-1 text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
                          <MessageCircle className="h-4 w-4" />
                          Reply
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}