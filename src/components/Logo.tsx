import React from 'react'
import { motion } from 'framer-motion'

export const Logo: React.FC = () => {
  return (
    <motion.div
      className="flex items-center space-x-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="relative"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center shadow-lg">
          <span className="text-white font-bold text-xl">S</span>
        </div>
      </motion.div>
      
      <motion.div
        className="flex flex-col"
        initial={{ x: -10, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }}
      >
        <span className="text-xl font-bold text-gray-900 dark:text-white">
          Skill<span className="text-primary-600">Zone</span>
        </span>
        <span className="text-xs text-gray-500 dark:text-gray-400 leading-none">
          Learn & Grow
        </span>
      </motion.div>
    </motion.div>
  )
}