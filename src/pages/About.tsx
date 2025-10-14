import React from 'react'
import { motion } from 'framer-motion'
import { Target, Eye, Heart, Users, Award, BookOpen, Zap } from 'lucide-react'

export const About: React.FC = () => {

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  const values = [
    {
      icon: Zap,
      title: 'Инновации',
      description: 'Использование передовых технологий и геймификации для создания увлекательного и эффективного обучения.',
    },
    {
      icon: Users,
      title: 'Доступность',
      description: 'Предоставление качественного образования каждому учащемуся, независимо от происхождения или местоположения.',
    },
    {
      icon: Heart,
      title: 'Вовлеченность',
      description: 'Создание интерактивных и увлекательных образовательных опытов, которые поддерживают мотивацию студентов.',
    },
    {
      icon: Award,
      title: 'Превосходство',
      description: 'Предоставление высококачественного контента от экспертных инструкторов и профессионалов отрасли.',
    },
  ]

  const team = [
    {
      name: 'Айбек Токтосунов',
      role: 'Основатель и генеральный директор',
      description: 'Эксперт по образовательным технологиям с 15+ годами опыта в онлайн-обучении.',
      avatar: 'AT',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      name: 'Адинай Садыкова',
      role: 'Руководитель учебной программы',
      description: 'Бывший университетский профессор, специализирующийся на геймифицированных методах обучения.',
      avatar: 'AS',
      color: 'from-purple-500 to-pink-500',
    },
    {
      name: 'Бекназар Абдрахманов',
      role: 'Ведущий разработчик',
      description: 'Full-stack инженер, увлеченный созданием бесшовных пользовательских интерфейсов.',
      avatar: 'BA',
      color: 'from-green-500 to-emerald-500',
    },
    {
      name: 'Назгуль Маматова',
      role: 'UX/UI дизайнер',
      description: 'Награжденный дизайнер, сосредоточенный на создании доступного и красивого образования.',
      avatar: 'NM',
      color: 'from-orange-500 to-red-500',
    },
  ]

  const stats = [
    { value: '30+', label: 'Курсов доступно' },
    { value: '5К+', label: 'Активных учеников' },
    { value: '50+', label: 'Достижений' },
    { value: '98%', label: 'Удовлетворенность' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              О нас
            </h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
              Мы создаем будущее образования через инновации, геймификацию и персонализированные образовательные опыты.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Mission & Vision */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
        >
          <motion.div
            variants={itemVariants}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8"
          >
            <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-xl flex items-center justify-center mb-6">
              <Target className="h-8 w-8 text-primary-600 dark:text-primary-400" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Наша миссия
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
              Предоставлять качественное образование через интерактивную платформу, которая делает обучение увлекательным, доступным и эффективным для каждого учащегося.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8"
          >
            <div className="w-16 h-16 bg-secondary-100 dark:bg-secondary-900 rounded-xl flex items-center justify-center mb-6">
              <Eye className="h-8 w-8 text-secondary-600 dark:text-secondary-400" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Наше видение
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
              Стать ведущей образовательной платформой в Кыргызстане, помогая миллионам учащихся раскрывать свой потенциал и достигать своих целей через качественное образование.
            </p>
          </motion.div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl shadow-lg p-6 text-center text-white"
            >
              <div className="text-4xl font-bold mb-2">{stat.value}</div>
              <div className="text-sm opacity-90">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Values Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-12"
          >
            Наши ценности
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300"
                >
                  <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {value.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-4"
          >
            Наша команда
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-lg text-gray-600 dark:text-gray-300 text-center mb-12 max-w-2xl mx-auto"
          >
            Познакомьтесь с нашей командой профессионалов, которые страстно работают над созданием лучшего образовательного опыта.
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className={`w-24 h-24 bg-gradient-to-br ${member.color} rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4`}>
                  {member.avatar}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                  {member.name}
                </h3>
                <p className="text-primary-600 dark:text-primary-400 font-semibold mb-3">
                  {member.role}
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {member.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Achievement Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl shadow-2xl p-8 md:p-12 text-white text-center"
        >
          <motion.div variants={itemVariants} className="flex justify-center mb-6">
            <BookOpen className="h-16 w-16" />
          </motion.div>
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Присоединяйтесь к нашему сообществу учеников
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl opacity-90 mb-8 max-w-2xl mx-auto"
          >
            Начните свой путь к мастерству с SkillZone уже сегодня. Учитесь в своём темпе, зарабатывайте достижения и раскрывайте свой потенциал.
          </motion.p>
          <motion.div variants={itemVariants} className="flex justify-center gap-4">
            <a
              href="/courses"
              className="inline-flex items-center px-6 py-3 bg-white text-primary-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Смотреть курсы
            </a>
            <a
              href="/register"
              className="inline-flex items-center px-6 py-3 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors"
            >
              Начать обучение
            </a>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}