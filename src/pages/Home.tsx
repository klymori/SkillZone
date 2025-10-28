import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { 
  ArrowRight, 
  BookOpen, 
  Users, 
  Award, 
  Zap, 
  Star,
  CheckCircle,
  Target,
  Globe,
  Sparkles,
  Trophy
} from 'lucide-react'
import type { RootState } from '../app/store'
import { Button } from '../components/Button'
import { CourseCard } from '../components/CourseCard'
import { XpProgressBar } from '../components/XpProgressBar'
import { mockCourses } from '../utils/mockData'

const stats = [
  { icon: BookOpen, value: '500+', label: 'Доступных курсов' },
  { icon: Users, value: '10,000+', label: 'Активных студентов' },
  { icon: Award, value: '50+', label: 'Достижений' },
  { icon: Globe, value: '3', label: 'Языка' },
]

const features = [
  {
    icon: Zap,
    title: 'Игровое обучение',
    description: 'Зарабатывайте XP, открывайте достижения и повышайте уровень по мере прохождения курсов.',
    gradient: 'from-yellow-400 to-orange-500',
  },
  {
    icon: Target,
    title: 'Отслеживание прогресса',
    description: 'Следите за своим путем обучения с подробной аналитикой и статистикой.',
    gradient: 'from-green-400 to-blue-500',
  },
  {
    icon: Users,
    title: 'Активное сообщество',
    description: 'Общайтесь с другими учениками, делитесь знаниями и развивайтесь вместе.',
    gradient: 'from-purple-400 to-pink-500',
  },
  {
    icon: Star,
    title: 'Опытные преподаватели',
    description: 'Учитесь у экспертов отрасли и опытных профессионалов.',
    gradient: 'from-blue-400 to-indigo-500',
  },
]

export const Home: React.FC = () => {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth)
  const { level, xp, totalXp } = useSelector((state: RootState) => state.gamification)
  
  const featuredCourses = mockCourses.slice(0, 3)
  const xpForNextLevel = 150 // This should come from gamification logic

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 rounded-full text-sm font-medium mb-4"
                >
                  <Sparkles className="h-4 w-4" />
                  Новинка: Игровой опыт обучения
                </motion.div>
                
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                  Добро пожаловать в SkillZone
                </h1>
                
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                  Ваше путешествие к мастерству начинается здесь. Зарабатывайте XP, открывайте достижения и повышайте уровень своих навыков с нашей интерактивной обучающей платформой.
                </p>
              </div>

              {/* User progress (if authenticated) */}
              {isAuthenticated && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-8 border border-gray-200 dark:border-gray-700 shadow-sm"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white font-bold">
                      {user?.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        Добро пожаловать, {user?.name}!
                      </p>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <Award className="h-3 w-3" />
                        Уровень {level} • {totalXp} всего XP
                      </div>
                    </div>
                  </div>
                  
                  <XpProgressBar
                    currentXp={xp}
                    xpForNextLevel={xpForNextLevel}
                    level={level}
                    size="sm"
                  />
                </motion.div>
              )}

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link to={isAuthenticated ? '/courses' : '/register'} className="flex-1 sm:flex-initial">
                  <Button size="lg" className="w-full sm:w-auto group whitespace-nowrap">
                    {isAuthenticated ? 'Посмотреть курсы' : 'Начать обучение'}
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                
                {!isAuthenticated && (
                  <Link to="/login" className="flex-1 sm:flex-initial">
                    <Button variant="outline" size="lg" className="w-full sm:w-auto whitespace-nowrap text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                      Уже имеете аккаунт?
                    </Button>
                  </Link>
                )}
              </motion.div>

            </motion.div>

            {/* Right content - Hero illustration/stats */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700">
                <div className="grid grid-cols-2 gap-6">
                  {stats.map((stat, index) => {
                    const Icon = stat.icon
                    return (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 + index * 0.1 }}
                        className="text-center"
                      >
                        <div className="bg-primary-100 dark:bg-primary-900 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
                          <Icon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                        </div>
                        <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                          {stat.value}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {stat.label}
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
                
                {/* Floating elements */}
                <motion.div
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -top-4 -right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-3 rounded-full shadow-lg"
                >
                  <Trophy className="h-6 w-6" />
                </motion.div>
                
                <motion.div
                  animate={{ y: [10, -10, 10] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                  className="absolute -bottom-4 -left-4 bg-gradient-to-r from-green-400 to-blue-500 text-white p-3 rounded-full shadow-lg"
                >
                  <Zap className="h-6 w-6" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Почему стоит выбрать SkillZone?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Откройте для себя новый способ обучения с элементами геймификации, отслеживанием прогресса и поддерживающим сообществом.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="group"
                >
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 h-full border border-gray-200 dark:border-gray-600 hover:shadow-lg transition-all duration-300">
                    <div className={`w-12 h-12 bg-gradient-to-r ${feature.gradient} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Популярные курсы
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Начни своё обучение с самых востребованных курсов
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <CourseCard course={course} />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Link to="/courses">
              <Button variant="primary" size="lg">
                Посмотреть все курсы
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Gamification Showcase */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-6">
                Сделай обучение увлекательным с
                <br />
                <span className="text-yellow-300">геймификацией</span>
              </h2>
              <p className="text-xl mb-8 text-primary-100">
                Зарабатывай XP за каждый пройденный урок, открывай достижения за прогресс и соревнуйся с друзьями, повышая уровень своих навыков.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-300" />
                  <span>Зарабатывай XP за прохождение уроков и курсов</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-300" />
                  <span>Открывай достижения и значки</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-300" />
                  <span>Повышай уровень и отслеживай свой прогресс</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-300" />
                  <span>Соревнуйся с друзьями и участниками сообщества</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <div className="text-center mb-6">
                  <div className="text-6xl font-bold text-yellow-300 mb-2">Уровень 8</div>
                  <p className="text-primary-200">Продолжай учиться, чтобы достичь 9 уровня!</p>
                </div>
                
                <div className="mb-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Прогресс XP</span>
                    <span>75/150 XP</span>
                  </div>
                  <div className="h-3 bg-white/20 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: '50%' }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="h-full bg-gradient-to-r from-yellow-400 to-orange-500"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-yellow-300">1,250</div>
                    <div className="text-xs text-primary-200">Всего XP</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-300">12</div>
                    <div className="text-xs text-primary-200">Дней серии</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-300">8</div>
                    <div className="text-xs text-primary-200">Достижений</div>
                  </div>
                </div>
              </div>
              
              {/* Floating achievement badges */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute -top-4 -right-4 bg-yellow-400 text-yellow-900 p-3 rounded-full shadow-lg"
              >
                🏆
              </motion.div>
              
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                className="absolute -bottom-4 -left-4 bg-green-400 text-green-900 p-3 rounded-full shadow-lg"
              >
                🎯
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Присоединяйся к нашему сообществу
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Начни свой путь к знаниям с SkillZone. Учись в удобном темпе, получай достижения и раскрывай свой потенциал.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={isAuthenticated ? '/courses' : '/register'}>
                <Button size="lg" className="w-full sm:w-auto">
                  {isAuthenticated ? 'Продолжить обучение' : 'Начать бесплатно'}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              
              {!isAuthenticated && (
                <Link to="/login">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto text-gray-900 dark:text-white">
                    Уже имеете аккаунт?
                  </Button>
                </Link>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}