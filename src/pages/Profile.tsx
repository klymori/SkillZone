import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Camera,
  Award,
  BookOpen,
  TrendingUp,
  Settings,
  Save,
  X,
  Moon,
  Sun,
  Bell,
  Zap,
  Trophy,
  Target,
  Flame
} from 'lucide-react'
import type { RootState } from '../app/store'
import { 
  useGetUserProfileQuery, 
  useUpdateUserProfileMutation,
  useGetUserProgressQuery,
  useGetUserAchievementsQuery,
  useGetFavoritesQuery
} from '../api/api'
import { setLanguage, toggleTheme } from '../features/ui/uiSlice'
import { XpProgressBar } from '../components/XpProgressBar'
import { AchievementCard } from '../components/AchievementCard'
import { CourseCard } from '../components/CourseCard'
import { Button } from '../components/Button'
import { cn } from '../utils/cn'

interface ProfileSettingsProps {
  isOpen: boolean
  onClose: () => void
}

const ProfileSettings: React.FC<ProfileSettingsProps> = ({ isOpen, onClose }) => {
  const dispatch = useDispatch()
  const { user } = useSelector((state: RootState) => state.auth)
  const { theme, language } = useSelector((state: RootState) => state.ui)
  const [updateProfile] = useUpdateUserProfileMutation()
  
  const [formData, setFormData] = React.useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: '',
    notifications: true,
  })
  
  const [isLoading, setIsLoading] = React.useState(false)

  const handleSave = async () => {
    if (!user) return
    
    setIsLoading(true)
    try {
      await updateProfile({
        userId: user.id,
        ...formData,
        preferences: {
          language,
          theme,
          notifications: formData.notifications,
        },
      }).unwrap()
      onClose()
    } catch (error) {
      console.error('Failed to update profile:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Настройки профиля
              </h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Личная информация
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Имя
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      disabled
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Bio
                    </label>
                    <textarea
                      value={formData.bio}
                      onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                      placeholder="Расскажите о себе..."
                    />
                  </div>
                </div>
              </div>

              {/* Preferences */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Настройки
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Язык
                    </label>
                    <select
                      value={language}
                      onChange={(e) => dispatch(setLanguage(e.target.value as 'en' | 'ru' | 'ky'))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="en">English</option>
                      <option value="ru">Русский</option>
                      <option value="ky">Кыргызча</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Тема
                    </label>
                    <button
                      onClick={() => dispatch(toggleTheme())}
                      className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <span className="flex items-center gap-2">
                        {theme === 'dark' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                        {theme === 'dark' ? 'Темная' : 'Светлая'}
                      </span>
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                      <Bell className="h-4 w-4" />
                      Уведомления
                    </label>
                    <input
                      type="checkbox"
                      checked={formData.notifications}
                      onChange={(e) => setFormData(prev => ({ ...prev, notifications: e.target.checked }))}
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                <Button
                  variant="primary"
                  onClick={handleSave}
                  loading={isLoading}
                  className="flex-1"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
                <Button
                  variant="outline"
                  onClick={onClose}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export const Profile: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth)
  const { level, xp, totalXp, streak } = useSelector((state: RootState) => state.gamification)
  const [showSettings, setShowSettings] = React.useState(false)
  const [activeTab, setActiveTab] = React.useState<'overview' | 'achievements' | 'courses' | 'progress'>('overview')

  // Fetch user data
  const { data: userProfile } = useGetUserProfileQuery(user?.id || '', { skip: !user })
  const { data: userProgress } = useGetUserProgressQuery(user?.id || '', { skip: !user })
  const { data: userAchievements } = useGetUserAchievementsQuery(user?.id || '', { skip: !user })
  const { data: favoriteCourses } = useGetFavoritesQuery(user?.id || '', { skip: !user })

  // Handle avatar upload
  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Check file size (limit to 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Размер файла не должен превышать 5МБ')
        return
      }

      // Check file type
      if (!file.type.startsWith('image/')) {
        alert('Пожалуйста, выберите файл изображения')
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        const avatarData = e.target?.result as string
        // Save to localStorage (in production, upload to server)
        localStorage.setItem(`user-${user?.id}-avatar`, avatarData)
        // Force re-render by updating a state or triggering a refetch
        window.location.reload() // Simple approach for demo
      }
      reader.readAsDataURL(file)
    }
  }

  // Get stored avatar
  const storedAvatar = user ? localStorage.getItem(`user-${user.id}-avatar`) : null

  // Calculate stats
  const completedCourses = userProgress?.filter(p => p.progressPercentage === 100).length || 0
  const totalCoursesStarted = userProgress?.length || 0
  const averageProgress = totalCoursesStarted > 0 
    ? Math.round(userProgress!.reduce((sum, p) => sum + p.progressPercentage, 0) / totalCoursesStarted)
    : 0

  const xpForNextLevel = 150 // This should come from gamification logic

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Please log in to view your profile
          </h2>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-8 shadow-sm border border-gray-200 dark:border-gray-700"
        >
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
            {/* Avatar */}
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white text-2xl font-bold overflow-hidden">
                {storedAvatar || userProfile?.avatar ? (
                  <img
                    src={storedAvatar || userProfile?.avatar}
                    alt={user.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  user.name.charAt(0).toUpperCase()
                )}
              </div>
              <label 
                htmlFor="avatar-upload"
                className="absolute -bottom-1 -right-1 bg-primary-600 text-white p-2 rounded-full hover:bg-primary-700 transition-colors cursor-pointer"
              >
                <Camera className="h-3 w-3" />
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarUpload}
                />
              </label>
            </div>

            {/* User Info */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {user.name}
                </h1>
                <div className="flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-sm font-semibold rounded-full">
                  <Trophy className="h-3 w-3" />
                  Level {level}
                </div>
              </div>
              
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {userProfile?.bio || 'Learning enthusiast at SkillZone'}
              </p>
              
              {/* XP Progress */}
              <div className="mb-4">
                <XpProgressBar
                  currentXp={xp}
                  xpForNextLevel={xpForNextLevel}
                  level={level}
                  size="md"
                />
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-primary-600 dark:text-primary-400 mb-1">
                    <Zap className="h-4 w-4" />
                    <span className="font-semibold text-lg">{totalXp}</span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Всего XP</p>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-green-600 dark:text-green-400 mb-1">
                    <BookOpen className="h-4 w-4" />
                    <span className="font-semibold text-lg">{completedCourses}</span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Завершено</p>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-orange-600 dark:text-orange-400 mb-1">
                    <Flame className="h-4 w-4" />
                    <span className="font-semibold text-lg">{streak}</span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Дней серии</p>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-purple-600 dark:text-purple-400 mb-1">
                    <Award className="h-4 w-4" />
                    <span className="font-semibold text-lg">{userAchievements?.length || 0}</span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Достижений</p>
                </div>
              </div>
            </div>

            {/* Settings Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowSettings(true)}
              className="flex items-center gap-2"
            >
              <Settings className="h-4 w-4" />
              Настройки
            </Button>
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex space-x-8">
              {[
                { id: 'overview', label: 'Обзор', icon: TrendingUp },
                { id: 'achievements', label: 'Достижения', icon: Award },
                { id: 'courses', label: 'Мои курсы', icon: BookOpen },
                { id: 'progress', label: 'Прогресс', icon: Target },
              ].map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={cn(
                      'flex items-center gap-2 py-3 px-1 border-b-2 font-medium text-sm transition-colors',
                      activeTab === tab.id
                        ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                        : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {tab.label}
                  </button>
                )
              })}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Activity */}
                <div className="lg:col-span-2">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Последняя активность
                  </h2>
                  <div className="space-y-4">
                    {userProgress?.slice(0, 3).map((progress) => (
                      <div
                        key={progress.courseId}
                        className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium text-gray-900 dark:text-white">
                            Прогресс курса
                          </h3>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {progress.progressPercentage}% завершено
                          </span>
                        </div>
                        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                          <div
                            className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"
                            style={{ width: `${progress.progressPercentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Actions */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Быстрые действия
                  </h2>
                  <div className="space-y-3">
                    <Button
                      variant="primary"
                      size="sm"
                      className="w-full justify-start"
                    >
                      <BookOpen className="h-4 w-4 mr-2" />
                      Обзор курсов
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start"
                    >
                      <Award className="h-4 w-4 mr-2" />
                      Посмотреть достижения
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start"
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      Настройки аккаунта
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'achievements' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                    Достижения
                  </h2>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {userAchievements?.length || 0} достижений открыто
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {userAchievements?.map((userAchievement) => (
                    <AchievementCard
                      key={userAchievement.achievementId}
                      achievement={{
                        id: userAchievement.achievementId,
                        name: 'Achievement Name',
                        description: 'Achievement description',
                        icon: '🏆',
                        xpReward: 100,
                        category: 'completion',
                        requirements: { type: 'courses_completed', value: 1 }
                      }}
                      userAchievement={userAchievement}
                      isUnlocked={true}
                      size="md"
                    />
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'courses' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                    Мои курсы
                  </h2>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {totalCoursesStarted} курсов в процессе
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {favoriteCourses?.map((course) => (
                    <CourseCard
                      key={course.id}
                      course={course}
                      isFavorite={true}
                      showProgress={true}
                      progress={userProgress?.find(p => p.courseId === course.id)?.progressPercentage || 0}
                    />
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'progress' && (
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                  Прогресс обучения
                </h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Progress Chart */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Статистика обучения
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600 dark:text-gray-400">Общий прогресс</span>
                          <span className="font-medium">{averageProgress}%</span>
                        </div>
                        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full">
                          <div
                            className="h-full bg-gradient-to-r from-green-400 to-blue-500 rounded-full"
                            style={{ width: `${averageProgress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Level Progress */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Прогресс уровня
                    </h3>
                    <XpProgressBar
                      currentXp={xp}
                      xpForNextLevel={xpForNextLevel}
                      level={level}
                      size="lg"
                    />
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Settings Modal */}
      <ProfileSettings
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
      />
    </div>
  )
}