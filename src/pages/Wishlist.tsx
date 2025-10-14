import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Heart, BookOpen, Clock, Users, Star, Trash2 } from 'lucide-react'
import type { RootState } from '../app/store'
import { mockCourses, type Course } from '../utils/mockData'
import { Button } from '../components/Button'

export const Wishlist: React.FC = () => {
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth)
  const [wishlistCourses, setWishlistCourses] = useState<Course[]>([])

  useEffect(() => {
    if (user) {
      const wishlistIds = JSON.parse(localStorage.getItem(`wishlist-${user.id}`) || '[]')
      const courses = mockCourses.filter(course => wishlistIds.includes(course.id))
      setWishlistCourses(courses)
    }
  }, [user])

  const removeFromWishlist = (courseId: string) => {
    if (!user) return

    const wishlistIds = JSON.parse(localStorage.getItem(`wishlist-${user.id}`) || '[]')
    const updatedWishlist = wishlistIds.filter((id: string) => id !== courseId)
    localStorage.setItem(`wishlist-${user.id}`, JSON.stringify(updatedWishlist))
    
    setWishlistCourses(prevCourses => 
      prevCourses.filter(course => course.id !== courseId)
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Heart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Войдите, чтобы просмотреть избранное
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Сохраняйте интересные курсы в избранном для быстрого доступа
          </p>
          <Link to="/login">
            <Button variant="primary">
              Войти
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <Heart className="h-8 w-8 text-red-500" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Избранные курсы
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            {wishlistCourses.length > 0 
              ? `У вас ${wishlistCourses.length} курсов в избранном`
              : 'Пока нет избранных курсов'
            }
          </p>
        </motion.div>

        {wishlistCourses.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-12 text-center shadow-sm border border-gray-200 dark:border-gray-700"
          >
            <Heart className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Ваш список избранного пуст
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Нажмите на сердечко на любом курсе, чтобы добавить его в избранное
            </p>
            <Link to="/courses">
              <Button variant="primary">
                <BookOpen className="h-4 w-4 mr-2" />
                Посмотреть курсы
              </Button>
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow"
              >
                {/* Course Image */}
                <div className="aspect-video bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900 dark:to-secondary-900 flex items-center justify-center relative">
                  <BookOpen className="h-12 w-12 text-primary-600 dark:text-primary-400" />
                  <button
                    onClick={() => removeFromWishlist(course.id)}
                    className="absolute top-3 right-3 p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors group"
                  >
                    <Trash2 className="h-4 w-4 text-gray-600 dark:text-gray-400 group-hover:text-red-500" />
                  </button>
                </div>

                {/* Course Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 text-xs font-medium rounded-full">
                      {course.category}
                    </span>
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-medium rounded-full">
                      {course.level}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                    {course.title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                    {course.shortDescription}
                  </p>

                  {/* Course Stats */}
                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{course.duration}ч</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{course.studentsCount}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{course.rating}</span>
                    </div>
                  </div>

                  {/* Price and CTA */}
                  <div className="flex items-center justify-between">
                    <div>
                      {course.isFree ? (
                        <span className="text-green-600 dark:text-green-400 font-semibold">
                          Бесплатно
                        </span>
                      ) : (
                        <span className="text-lg font-bold text-gray-900 dark:text-white">
                          {course.price} сом
                        </span>
                      )}
                    </div>
                    <Link to={`/courses/${course.id}`}>
                      <Button variant="primary" size="sm">
                        Подробнее
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}