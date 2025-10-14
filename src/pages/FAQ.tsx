import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, HelpCircle } from 'lucide-react'

interface FAQItem {
  question: string
  answer: string
}

const FAQAccordion: React.FC<{ item: FAQItem; index: number }> = ({ item, index }) => {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        aria-expanded={isOpen}
      >
        <span className="font-semibold text-gray-900 dark:text-white pr-4">
          {item.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0"
        >
          <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-400" />
        </motion.div>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700">
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {item.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export const FAQ: React.FC = () => {
  const faqItems: FAQItem[] = [
    {
      question: 'Что такое SkillZone?',
      answer: 'SkillZone — это интерактивная образовательная платформа с элементами геймификации, которая помогает учащимся изучать различные предметы в увлекательной форме. Мы предлагаем курсы по математике, физике, химии, биологии, истории, литературе, географии, языкам и информатике.',
    },
    {
      question: 'Как работает система уровней?',
      answer: 'За каждый пройденный урок вы получаете опыт (XP). Накапливая XP, вы повышаете свой уровень и получаете новые звания. Также вы можете открывать достижения за различные активности на платформе.',
    },
    {
      question: 'На каких языках доступна платформа?',
      answer: 'Платформа полностью переведена на русский язык и адаптирована для учащихся из Кыргызстана. Все курсы ведут местные преподаватели с кыргызскими именами.',
    },
    {
      question: 'Есть ли бесплатные курсы?',
      answer: 'Да! У нас есть множество бесплатных курсов, особенно по основным школьным предметам. Платные курсы предлагают более глубокое изучение и дополнительные материалы.',
    },
    {
      question: 'Можно ли использовать на мобильных устройствах?',
      answer: 'Конечно! Наша платформа полностью адаптирована для мобильных устройств. Вы можете учиться где угодно — дома, в школе или в дороге.',
    },
    {
      question: 'Как отслеживается прогресс?',
      answer: 'Система автоматически отслеживает ваш прогресс по каждому курсу. Вы можете видеть процент завершения, заработанный XP, полученные достижения и статистику обучения в личном кабинете.',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full mb-4">
            <HelpCircle className="h-8 w-8 text-primary-600 dark:text-primary-400" />
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Часто задаваемые вопросы
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Ответы на самые популярные вопросы о SkillZone
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <FAQAccordion key={index} item={item} index={index} />
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center p-8 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700"
        >
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Остались вопросы?
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Не нашли ответ на свой вопрос? Свяжитесь с нашей командой поддержки.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            Связаться с поддержкой
          </a>
        </motion.div>
      </div>
    </div>
  )
}