import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, XCircle, Award } from 'lucide-react'
import { Button } from './Button'
import type { Quiz as QuizType, QuizQuestion } from '../firebase/services/quizService'
import type { QuizResult } from '../firebase/services/progressService'

interface QuizProps {
  quiz: QuizType
  onSubmit: (answers: number[]) => void
  quizResult?: QuizResult | null
  isLoading?: boolean
}

export const QuizComponent: React.FC<QuizProps> = ({ quiz, onSubmit, quizResult, isLoading }) => {
  const [answers, setAnswers] = useState<number[]>(Array(quiz.questions.length).fill(-1))
  const [submitted, setSubmitted] = useState(false)
  const [showResults, setShowResults] = useState(!!quizResult)

  const handleAnswerSelect = (questionIndex: number, optionIndex: number) => {
    if (submitted || showResults) return
    
    const newAnswers = [...answers]
    newAnswers[questionIndex] = optionIndex
    setAnswers(newAnswers)
  }

  const handleSubmit = () => {
    if (answers.some(answer => answer === -1)) {
      alert('Пожалуйста, ответьте на все вопросы')
      return
    }
    
    setSubmitted(true)
    onSubmit(answers)
  }

  const handleRetry = () => {
    setAnswers(Array(quiz.questions.length).fill(-1))
    setSubmitted(false)
    setShowResults(false)
  }

  const getQuestionResult = (question: QuizQuestion, index: number) => {
    if (!quizResult || !submitted) return null
    
    const userAnswer = answers[index]
    const isCorrect = userAnswer === question.correctAnswer
    
    return { isCorrect, userAnswer }
  }

  if (showResults && quizResult) {
    const percentage = Math.round((quizResult.score / quizResult.total) * 100)
    const passed = quizResult.passed
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
      >
        <div className="text-center mb-6">
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
            passed ? 'bg-green-100 dark:bg-green-900/20' : 'bg-red-100 dark:bg-red-900/20'
          }`}>
            {passed ? (
              <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
            ) : (
              <XCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
            )}
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {passed ? 'Поздравляем!' : 'Попробуйте еще раз'}
          </h2>
          
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Вы ответили правильно на {quizResult.score} из {quizResult.total} вопросов
          </p>
          
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-full font-semibold">
            <Award className="h-5 w-5" />
            {quiz.xpReward} XP
          </div>
        </div>
        
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600 dark:text-gray-400">Результат</span>
            <span className={`font-medium ${passed ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {percentage}% ({quizResult.score}/{quizResult.total})
            </span>
          </div>
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className={`h-full ${passed ? 'bg-green-500' : 'bg-red-500'} transition-all duration-500`}
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
        
        <div className="flex gap-3">
          <Button
            variant="primary"
            onClick={handleRetry}
            className="flex-1"
          >
            Пройти тест еще раз
          </Button>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {quiz.title}
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Ответьте на все вопросы, чтобы завершить урок и получить XP
        </p>
      </div>
      
      <div className="space-y-6 mb-6">
        {quiz.questions.map((question: QuizQuestion, questionIndex: number) => {
          const questionResult = getQuestionResult(question, questionIndex)
          
          return (
            <div
              key={question.id}
              className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
            >
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                Вопрос {questionIndex + 1}: {question.question}
              </h3>
              
              <div className="space-y-2">
                {question.options.map((option: string, optionIndex: number) => {
                  let optionStyle = "flex items-center p-3 rounded-lg border cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50"
                  
                  if (submitted) {
                    if (optionIndex === question.correctAnswer) {
                      optionStyle += " border-green-500 bg-green-50 dark:bg-green-900/20"
                    } else if (optionIndex === answers[questionIndex] && !questionResult?.isCorrect) {
                      optionStyle += " border-red-500 bg-red-50 dark:bg-red-900/20"
                    } else {
                      optionStyle += " border-gray-300 dark:border-gray-600"
                    }
                  } else {
                    optionStyle += answers[questionIndex] === optionIndex
                      ? " border-primary-500 bg-primary-50 dark:bg-primary-900/20"
                      : " border-gray-300 dark:border-gray-600"
                  }
                  
                  return (
                    <div
                      key={optionIndex}
                      className={optionStyle}
                      onClick={() => handleAnswerSelect(questionIndex, optionIndex)}
                    >
                      <div className={`flex-shrink-0 w-5 h-5 rounded-full border mr-3 flex items-center justify-center ${
                        answers[questionIndex] === optionIndex
                          ? "border-primary-500 bg-primary-500"
                          : "border-gray-400 dark:border-gray-500"
                      }`}>
                        {answers[questionIndex] === optionIndex && (
                          <div className="w-2 h-2 bg-white rounded-full" />
                        )}
                      </div>
                      <span className="text-gray-900 dark:text-white">{option}</span>
                    </div>
                  )
                })}
              </div>
              
              {submitted && question.explanation && (
                <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    <span className="font-semibold">Объяснение:</span> {question.explanation}
                  </p>
                </div>
              )}
            </div>
          )
        })}
      </div>
      
      <Button
        variant="primary"
        onClick={handleSubmit}
        loading={isLoading}
        className="w-full"
        disabled={answers.some(answer => answer === -1)}
      >
        Отправить ответы
      </Button>
    </motion.div>
  )
}