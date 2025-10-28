import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Camera,
  Award,
  BookOpen,
  TrendingUp,
  Settings,
  X,
  Moon,
  Sun,
  Zap,
  Trophy,
  Target,
  Flame
} from 'lucide-react'
import type { RootState } from '../app/store'
import { 
  useGetUserProfileQuery, 
  useGetUserProgressQuery,
  useGetUserAchievementsQuery
} from '../api/api'
import { toggleTheme, addNotification } from '../features/ui/uiSlice'
import { setUser } from '../features/auth/authSlice'
import { XpProgressBar } from '../components/XpProgressBar'
import { AchievementCard } from '../components/AchievementCard'
import { Button } from '../components/Button'
import { cn } from '../utils/cn'
import { uploadAvatar } from '../firebase/services/storageService'
import { updateUserProfile } from '../firebase/services/userService'
import { useNavigate } from 'react-router-dom'
import { mockAchievements } from '../utils/mockData'

interface ProfileSettingsProps {
  isOpen: boolean
  onClose: () => void
}

const ProfileSettings: React.FC<ProfileSettingsProps> = ({ isOpen, onClose }) => {
  const dispatch = useDispatch()
  const { user } = useSelector((state: RootState) => state.auth)
  const { theme } = useSelector((state: RootState) => state.ui)
  
  const [formData, setFormData] = React.useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: '',
  })
  
  const [isLoading, setIsLoading] = React.useState(false)

  // Load user data when modal opens
  React.useEffect(() => {
    if (isOpen && user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        bio: '',
      })
    }
  }, [isOpen, user])

  const handleSave = async () => {
    if (!user) return
    
    setIsLoading(true)
    try {
      // Update user profile in Firestore
      await updateUserProfile(user.id, {
        displayName: formData.name,
        bio: formData.bio,
      })
      
      // Update user in Redux store
      dispatch(setUser({
        ...user,
        name: formData.name
      }))
      
      // Show success notification
      dispatch(addNotification({
        type: 'success',
        title: 'Профиль обновлен',
        message: 'Изменения успешно сохранены',
      }))
      
      // Close modal after successful save
      onClose()
    } catch (error) {
      console.error('Failed to update profile:', error)
      dispatch(addNotification({
        type: 'error',
        title: 'Ошибка',
        message: 'Не удалось сохранить изменения',
      }))
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
                      Тема
                    </label>
                    <button
                      onClick={() => dispatch(toggleTheme())}
                      className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <span className="flex items-center gap-2">
                        {theme === 'light' ? (
                          <>
                            <Sun className="h-4 w-4" />
                            Светлая
                          </>
                        ) : (
                          <>
                            <Moon className="h-4 w-4" />
                            Тёмная
                          </>
                        )}
                      </span>
                      <div className="relative w-10 h-5 bg-gray-300 dark:bg-gray-600 rounded-full">
                        <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-transform ${theme === 'dark' ? 'translate-x-5' : 'translate-x-0.5'}`} />
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button
                variant="outline"
                onClick={onClose}
                className="flex-1"
              >
                Отмена
              </Button>
              <Button
                variant="primary"
                onClick={handleSave}
                loading={isLoading}
                className="flex-1"
              >
                Сохранить
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export const Profile: React.FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state: RootState) => state.auth)
  const { level, xp, totalXp, streak } = useSelector((state: RootState) => state.gamification)
  const [showSettings, setShowSettings] = React.useState(false)
  const [activeTab, setActiveTab] = React.useState<'overview' | 'achievements' | 'progress'>('overview')
  const [avatarUrl, setAvatarUrl] = React.useState<string | null>(null)

  // Fetch user data
  const { data: userProfile } = useGetUserProfileQuery(user?.id || '', { skip: !user })
  const { data: userProgress } = useGetUserProgressQuery(user?.id || '', { skip: !user })
  const { data: userAchievements } = useGetUserAchievementsQuery(user?.id || '', { skip: !user })

  // Handle avatar upload
  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file || !user) return

    // Check file size (limit to 3MB)
    if (file.size > 3 * 1024 * 1024) {
      alert('Размер файла не должен превышать 3МБ')
      return
    }

    // Check file type
    if (!file.type.startsWith('image/')) {
      alert('Пожалуйста, выберите файл изображения')
      return
    }

    try {
      // Upload avatar to Firebase Storage
      const downloadURL = await uploadAvatar(user.id, file)
      
      // Update user profile with avatar URL
      await updateUserProfile(user.id, { avatarUrl: downloadURL })
      
      // Update local state
      setAvatarUrl(downloadURL)
      
      // Show success notification
      dispatch(addNotification({
        type: 'success',
        title: 'Аватар обновлен',
        message: 'Аватар успешно загружен',
      }))
      
      // Do NOT reload the page - keep user logged in
      // window.location.reload() - removed this line
    } catch (error) {
      console.error('Failed to upload avatar:', error)
      dispatch(addNotification({
        type: 'error',
        title: 'Ошибка загрузки',
        message: 'Не удалось загрузить аватар',
      }))
    }
  }

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
                {avatarUrl || userProfile?.avatar ? (
                  <img
                    src={avatarUrl || userProfile?.avatar}
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
                  Уровень {level}
                </div>
              </div>
              
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {userProfile?.bio || 'Энтузиаст обучения в SkillZone'}
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

        {/* Profile Navigation */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 mb-8">
          <div className="flex flex-wrap">
            <button
              onClick={() => setActiveTab('overview')}
              className={cn(
                'px-6 py-4 font-medium transition-colors border-b-2',
                activeTab === 'overview'
                  ? 'border-primary-600 text-primary-600 dark:text-primary-400'
                  : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              )}
            >
              Обзор
            </button>
            <button
              onClick={() => setActiveTab('achievements')}
              className={cn(
                'px-6 py-4 font-medium transition-colors border-b-2',
                activeTab === 'achievements'
                  ? 'border-primary-600 text-primary-600 dark:text-primary-400'
                  : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              )}
            >
              Достижения
            </button>
            <button
              onClick={() => setActiveTab('progress')}
              className={cn(
                'px-6 py-4 font-medium transition-colors border-b-2',
                activeTab === 'progress'
                  ? 'border-primary-600 text-primary-600 dark:text-primary-400'
                  : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              )}
            >
              Прогресс
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="space-y-8"
            >
              {/* Recent Activity */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  Недавняя активность
                </h2>
                
                {userProgress && userProgress.length > 0 ? (
                  <div className="space-y-4">
                    {userProgress
                      .sort((a, b) => new Date(b.lastAccessedAt).getTime() - new Date(a.lastAccessedAt).getTime())
                      .slice(0, 3)
                      .map((progress) => (
                        <div key={progress.courseId} className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                          <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
                            <BookOpen className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium text-gray-900 dark:text-white">
                              Прогресс курса
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {progress.progressPercentage}% завершено
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {new Date(progress.lastAccessedAt).toLocaleDateString('ru-RU')}
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      Нет активности
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Начните обучение, чтобы отслеживать свой прогресс
                    </p>
                  </div>
                )}
              </div>

              {/* Quick Actions */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  Быстрые действия
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4">
                      <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Продолжить обучение
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Вернитесь к курсам, которые вы начали
                    </p>
                    <Button 
                      variant="primary" 
                      onClick={() => navigate('/courses')}
                      className="w-full"
                    >
                      Перейти к курсам
                    </Button>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                      <Target className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Цели на неделю
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Установите цели для эффективного обучения
                    </p>
                    <Button variant="outline" className="w-full">
                      Установить цели
                    </Button>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4">
                      <Award className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Получить достижение
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Выполните задания для получения наград
                    </p>
                    <Button variant="outline" className="w-full">
                      Посмотреть задания
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'achievements' && (
            <motion.div
              key="achievements"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  Мои достижения
                </h2>
                
                {userAchievements && userAchievements.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {userAchievements && userAchievements.map((userAchievement) => {
                      // Find the full achievement data from the achievements list
                      const achievement = mockAchievements.find((a) => a.id === userAchievement.achievementId);
                      if (!achievement) return null;
                      
                      return (
                        <AchievementCard 
                          key={userAchievement.achievementId} 
                          achievement={achievement} 
                          userAchievement={userAchievement}
                          isUnlocked={true}
                        />
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Award className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      Пока нет достижений
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      Продолжайте обучение, чтобы разблокировать достижения
                    </p>
                    <Button 
                      variant="primary" 
                      onClick={() => navigate('/courses')}
                    >
                      Найти курс
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {activeTab === 'progress' && (
            <motion.div
              key="progress"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
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
            </motion.div>
          )}
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