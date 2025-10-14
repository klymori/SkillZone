import type { Course, CourseCategory, Achievement, UserProfile, UserProgress } from '../api/api'

// Mock courses data
export const mockCourses: Course[] = [
  {
    id: '1',
    title: 'React Fundamentals',
    description: 'Learn the fundamentals of React including components, state, props, and hooks. Perfect for beginners who want to start their journey in modern web development.',
    shortDescription: 'Master React basics with hands-on projects',
    level: 'beginner',
    category: 'programming',
    duration: 8,
    instructor: 'Sarah Johnson',
    rating: 4.8,
    studentsCount: 2150,
    thumbnail: '',
    price: 0,
    isFree: true,
    tags: ['React', 'JavaScript', 'Frontend', 'Web Development'],
    lessons: [
      { id: '1-1', title: 'Introduction to React', content: '', order: 1, courseId: '1', createdAt: '', updatedAt: '' },
      { id: '1-2', title: 'Components and JSX', content: '', order: 2, courseId: '1', createdAt: '', updatedAt: '' },
      { id: '1-3', title: 'State and Props', content: '', order: 3, courseId: '1', createdAt: '', updatedAt: '' },
      { id: '1-4', title: 'Hooks and Effects', content: '', order: 4, courseId: '1', createdAt: '', updatedAt: '' },
    ],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
  },
  {
    id: '2',
    title: 'Advanced TypeScript',
    description: 'Deep dive into advanced TypeScript concepts including generics, decorators, modules, and advanced type manipulation techniques.',
    shortDescription: 'Master advanced TypeScript patterns and techniques',
    level: 'advanced',
    category: 'programming',
    duration: 12,
    instructor: 'Mike Chen',
    rating: 4.9,
    studentsCount: 890,
    thumbnail: '',
    price: 79,
    isFree: false,
    tags: ['TypeScript', 'JavaScript', 'Programming', 'Types'],
    lessons: [
      { id: '2-1', title: 'Advanced Types', content: '', order: 1, courseId: '2', createdAt: '', updatedAt: '' },
      { id: '2-2', title: 'Generics Deep Dive', content: '', order: 2, courseId: '2', createdAt: '', updatedAt: '' },
      { id: '2-3', title: 'Decorators and Metadata', content: '', order: 3, courseId: '2', createdAt: '', updatedAt: '' },
    ],
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15',
  },
  {
    id: '3',
    title: 'UI/UX Design Principles',
    description: 'Learn the fundamental principles of user interface and user experience design. Create beautiful and functional designs.',
    shortDescription: 'Design beautiful and functional user interfaces',
    level: 'intermediate',
    category: 'design',
    duration: 10,
    instructor: 'Emma Wilson',
    rating: 4.7,
    studentsCount: 1540,
    thumbnail: '',
    price: 59,
    isFree: false,
    tags: ['Design', 'UI', 'UX', 'Figma', 'Prototyping'],
    lessons: [
      { id: '3-1', title: 'Design Fundamentals', content: '', order: 1, courseId: '3', createdAt: '', updatedAt: '' },
      { id: '3-2', title: 'Color Theory', content: '', order: 2, courseId: '3', createdAt: '', updatedAt: '' },
      { id: '3-3', title: 'Typography', content: '', order: 3, courseId: '3', createdAt: '', updatedAt: '' },
    ],
    createdAt: '2024-02-01',
    updatedAt: '2024-02-01',
  },
  {
    id: '4',
    title: 'Business Strategy 101',
    description: 'Understanding business fundamentals, strategy development, and market analysis for entrepreneurs and business professionals.',
    shortDescription: 'Learn essential business strategy concepts',
    level: 'beginner',
    category: 'business',
    duration: 6,
    instructor: 'David Brown',
    rating: 4.6,
    studentsCount: 980,
    thumbnail: '',
    price: 49,
    isFree: false,
    tags: ['Business', 'Strategy', 'Marketing', 'Entrepreneurship'],
    lessons: [
      { id: '4-1', title: 'Business Fundamentals', content: '', order: 1, courseId: '4', createdAt: '', updatedAt: '' },
      { id: '4-2', title: 'Market Analysis', content: '', order: 2, courseId: '4', createdAt: '', updatedAt: '' },
    ],
    createdAt: '2024-02-15',
    updatedAt: '2024-02-15',
  },
  {
    id: '5',
    title: 'Python for Data Science',
    description: 'Learn Python programming specifically for data science applications including pandas, numpy, matplotlib, and machine learning basics.',
    shortDescription: 'Python programming for data analysis and ML',
    level: 'intermediate',
    category: 'programming',
    duration: 15,
    instructor: 'Dr. Lisa Zhang',
    rating: 4.8,
    studentsCount: 2890,
    thumbnail: '',
    price: 89,
    isFree: false,
    tags: ['Python', 'Data Science', 'Machine Learning', 'Analytics'],
    lessons: [
      { id: '5-1', title: 'Python Basics', content: '', order: 1, courseId: '5', createdAt: '', updatedAt: '' },
      { id: '5-2', title: 'Pandas and NumPy', content: '', order: 2, courseId: '5', createdAt: '', updatedAt: '' },
      { id: '5-3', title: 'Data Visualization', content: '', order: 3, courseId: '5', createdAt: '', updatedAt: '' },
      { id: '5-4', title: 'ML Fundamentals', content: '', order: 4, courseId: '5', createdAt: '', updatedAt: '' },
    ],
    createdAt: '2024-03-01',
    updatedAt: '2024-03-01',
  },
  {
    id: '6',
    title: 'Digital Marketing Mastery',
    description: 'Complete guide to digital marketing including SEO, social media marketing, email marketing, and analytics.',
    shortDescription: 'Master digital marketing strategies and tools',
    level: 'intermediate',
    category: 'business',
    duration: 9,
    instructor: 'Alex Rodriguez',
    rating: 4.7,
    studentsCount: 1760,
    thumbnail: '',
    price: 69,
    isFree: false,
    tags: ['Marketing', 'SEO', 'Social Media', 'Analytics', 'Digital'],
    lessons: [
      { id: '6-1', title: 'Digital Marketing Overview', content: '', order: 1, courseId: '6', createdAt: '', updatedAt: '' },
      { id: '6-2', title: 'SEO Fundamentals', content: '', order: 2, courseId: '6', createdAt: '', updatedAt: '' },
      { id: '6-3', title: 'Social Media Strategy', content: '', order: 3, courseId: '6', createdAt: '', updatedAt: '' },
    ],
    createdAt: '2024-03-15',
    updatedAt: '2024-03-15',
  },
  {
    id: '7',
    title: 'Web Development Bootcamp',
    description: 'Complete web development course from HTML/CSS to advanced JavaScript frameworks like React and Node.js.',
    shortDescription: 'Become a full-stack web developer',
    level: 'beginner',
    category: 'programming',
    duration: 20,
    instructor: 'Carlos Martinez',
    rating: 4.9,
    studentsCount: 3420,
    thumbnail: '',
    price: 99,
    isFree: false,
    tags: ['Web Development', 'HTML', 'CSS', 'JavaScript', 'React', 'Node.js'],
    lessons: [
      { id: '7-1', title: 'HTML Basics', content: '', order: 1, courseId: '7', createdAt: '', updatedAt: '' },
      { id: '7-2', title: 'CSS Styling', content: '', order: 2, courseId: '7', createdAt: '', updatedAt: '' },
      { id: '7-3', title: 'JavaScript Fundamentals', content: '', order: 3, courseId: '7', createdAt: '', updatedAt: '' },
      { id: '7-4', title: 'React Framework', content: '', order: 4, courseId: '7', createdAt: '', updatedAt: '' },
      { id: '7-5', title: 'Backend with Node.js', content: '', order: 5, courseId: '7', createdAt: '', updatedAt: '' },
    ],
    createdAt: '2024-04-01',
    updatedAt: '2024-04-01',
  },
  {
    id: '8',
    title: 'Mobile App Development',
    description: 'Learn to build native mobile apps for iOS and Android using React Native and modern mobile development practices.',
    shortDescription: 'Create cross-platform mobile applications',
    level: 'intermediate',
    category: 'programming',
    duration: 18,
    instructor: 'Emily Watson',
    rating: 4.8,
    studentsCount: 1890,
    thumbnail: '',
    price: 89,
    isFree: false,
    tags: ['Mobile', 'React Native', 'iOS', 'Android', 'App Development'],
    lessons: [
      { id: '8-1', title: 'Mobile Dev Introduction', content: '', order: 1, courseId: '8', createdAt: '', updatedAt: '' },
      { id: '8-2', title: 'React Native Basics', content: '', order: 2, courseId: '8', createdAt: '', updatedAt: '' },
      { id: '8-3', title: 'Navigation and Routing', content: '', order: 3, courseId: '8', createdAt: '', updatedAt: '' },
      { id: '8-4', title: 'Native Features', content: '', order: 4, courseId: '8', createdAt: '', updatedAt: '' },
    ],
    createdAt: '2024-04-15',
    updatedAt: '2024-04-15',
  },
  {
    id: '9',
    title: 'Graphic Design Essentials',
    description: 'Master the fundamentals of graphic design including color theory, typography, layout, and design principles using Adobe Creative Suite.',
    shortDescription: 'Learn professional graphic design skills',
    level: 'beginner',
    category: 'design',
    duration: 12,
    instructor: 'Sophie Anderson',
    rating: 4.7,
    studentsCount: 2340,
    thumbnail: '',
    price: 75,
    isFree: false,
    tags: ['Graphic Design', 'Adobe', 'Photoshop', 'Illustrator', 'Design'],
    lessons: [
      { id: '9-1', title: 'Design Principles', content: '', order: 1, courseId: '9', createdAt: '', updatedAt: '' },
      { id: '9-2', title: 'Color and Typography', content: '', order: 2, courseId: '9', createdAt: '', updatedAt: '' },
      { id: '9-3', title: 'Adobe Photoshop', content: '', order: 3, courseId: '9', createdAt: '', updatedAt: '' },
      { id: '9-4', title: 'Adobe Illustrator', content: '', order: 4, courseId: '9', createdAt: '', updatedAt: '' },
    ],
    createdAt: '2024-05-01',
    updatedAt: '2024-05-01',
  },
  {
    id: '10',
    title: 'Cybersecurity Fundamentals',
    description: 'Learn essential cybersecurity concepts, network security, ethical hacking, and how to protect systems from threats.',
    shortDescription: 'Master cybersecurity basics and practices',
    level: 'intermediate',
    category: 'programming',
    duration: 14,
    instructor: 'Dr. James Wilson',
    rating: 4.9,
    studentsCount: 1450,
    thumbnail: '',
    price: 95,
    isFree: false,
    tags: ['Cybersecurity', 'Security', 'Hacking', 'Network', 'Protection'],
    lessons: [
      { id: '10-1', title: 'Security Basics', content: '', order: 1, courseId: '10', createdAt: '', updatedAt: '' },
      { id: '10-2', title: 'Network Security', content: '', order: 2, courseId: '10', createdAt: '', updatedAt: '' },
      { id: '10-3', title: 'Ethical Hacking', content: '', order: 3, courseId: '10', createdAt: '', updatedAt: '' },
      { id: '10-4', title: 'Threat Protection', content: '', order: 4, courseId: '10', createdAt: '', updatedAt: '' },
    ],
    createdAt: '2024-05-15',
    updatedAt: '2024-05-15',
  },
  {
    id: '11',
    title: 'История Кыргызстана',
    description: 'Изучение истории Кыргызстана от древности до наших дней. Важные события, личности и культурное наследие.',
    shortDescription: 'История и культура Кыргызстана',
    level: 'intermediate',
    category: 'history',
    duration: 16,
    instructor: 'Манас Абдыллаев',
    rating: 4.8,
    studentsCount: 1680,
    thumbnail: '',
    price: 0,
    isFree: true,
    tags: ['История', 'Кыргызстан', 'Культура', 'Наследие'],
    lessons: [
      { id: '11-1', title: 'Древние кыргызы', content: '', order: 1, courseId: '11', createdAt: '', updatedAt: '' },
      { id: '11-2', title: 'Эпос Манас', content: '', order: 2, courseId: '11', createdAt: '', updatedAt: '' },
      { id: '11-3', title: 'Независимость', content: '', order: 3, courseId: '11', createdAt: '', updatedAt: '' },
    ],
    createdAt: '2024-06-01',
    updatedAt: '2024-06-01',
  },
  {
    id: '12',
    title: 'Русская литература',
    description: 'Изучение русской литературы: классики, произведения великих писателей и анализ текстов.',
    shortDescription: 'Классика русской литературы',
    level: 'intermediate',
    category: 'literature',
    duration: 18,
    instructor: 'Лидия Петрова',
    rating: 4.8,
    studentsCount: 2170,
    thumbnail: '',
    price: 0,
    isFree: true,
    tags: ['Литература', 'Пушкин', 'Толстой', 'Классика'],
    lessons: [
      { id: '12-1', title: 'Золотой век поэзии', content: '', order: 1, courseId: '12', createdAt: '', updatedAt: '' },
      { id: '12-2', title: 'Романы 19 века', content: '', order: 2, courseId: '12', createdAt: '', updatedAt: '' },
      { id: '12-3', title: 'Современная проза', content: '', order: 3, courseId: '12', createdAt: '', updatedAt: '' },
    ],
    createdAt: '2024-06-15',
    updatedAt: '2024-06-15',
  },
  {
    id: '13',
    title: 'География мира',
    description: 'Изучение физической и экономической географии мира. Континенты, страны, климат и природные ресурсы.',
    shortDescription: 'Физическая и экономическая география',
    level: 'beginner',
    category: 'geography',
    duration: 14,
    instructor: 'Бектур Маматов',
    rating: 4.6,
    studentsCount: 1450,
    thumbnail: '',
    price: 0,
    isFree: true,
    tags: ['География', 'Континенты', 'Климат', 'Страны'],
    lessons: [
      { id: '13-1', title: 'Материки и океаны', content: '', order: 1, courseId: '13', createdAt: '', updatedAt: '' },
      { id: '13-2', title: 'Климатические пояса', content: '', order: 2, courseId: '13', createdAt: '', updatedAt: '' },
      { id: '13-3', title: 'Природные ресурсы', content: '', order: 3, courseId: '13', createdAt: '', updatedAt: '' },
    ],
    createdAt: '2024-07-01',
    updatedAt: '2024-07-01',
  },
  // English Language
  {
    id: '14',
    title: 'Английский язык: Основы',
    description: 'Основы английского языка: грамматика, лексика, произношение и базовая разговорная практика.',
    shortDescription: 'Основы английского языка',
    level: 'beginner',
    category: 'languages',
    duration: 20,
    instructor: 'Айдана Нурланова',
    rating: 4.7,
    studentsCount: 2890,
    thumbnail: '',
    price: 0,
    isFree: true,
    tags: ['Английский', 'Грамматика', 'Лексика', 'Разговор'],
    lessons: [
      { id: '14-1', title: 'Алфавит и фонетика', content: '', order: 1, courseId: '14', createdAt: '', updatedAt: '' },
      { id: '14-2', title: 'Основная грамматика', content: '', order: 2, courseId: '14', createdAt: '', updatedAt: '' },
      { id: '14-3', title: 'Повседневная лексика', content: '', order: 3, courseId: '14', createdAt: '', updatedAt: '' },
    ],
    createdAt: '2024-07-15',
    updatedAt: '2024-07-15',
  },
  {
    id: '15',
    title: 'Кыргызский язык',
    description: 'Основы кыргызского языка: грамматика, орфография, литература и культурное наследие.',
    shortDescription: 'Родной кыргызский язык',
    level: 'intermediate',
    category: 'languages',
    duration: 16,
    instructor: 'Нургул Алиева',
    rating: 4.9,
    studentsCount: 1540,
    thumbnail: '',
    price: 0,
    isFree: true,
    tags: ['Кыргызский', 'Грамматика', 'Литература', 'Культура'],
    lessons: [
      { id: '15-1', title: 'Кыргыз алипбеси', content: '', order: 1, courseId: '15', createdAt: '', updatedAt: '' },
      { id: '15-2', title: 'Грамматика негиздери', content: '', order: 2, courseId: '15', createdAt: '', updatedAt: '' },
      { id: '15-3', title: 'Кыргыз адабияты', content: '', order: 3, courseId: '15', createdAt: '', updatedAt: '' },
    ],
    createdAt: '2024-08-01',
    updatedAt: '2024-08-01',
  },
  // Computer Science
  {
    id: '16',
    title: 'Информатика: Основы',
    description: 'Основы информатики: алгоритмы, программирование, системы счисления и информационные технологии.',
    shortDescription: 'Основы компьютерных наук',
    level: 'beginner',
    category: 'computer_science',
    duration: 18,
    instructor: 'Медет Асанов',
    rating: 4.8,
    studentsCount: 2230,
    thumbnail: '',
    price: 0,
    isFree: true,
    tags: ['Информатика', 'Алгоритмы', 'Программирование', 'ИТ'],
    lessons: [
      { id: '16-1', title: 'Основы алгоритмов', content: '', order: 1, courseId: '16', createdAt: '', updatedAt: '' },
      { id: '16-2', title: 'Системы счисления', content: '', order: 2, courseId: '16', createdAt: '', updatedAt: '' },
      { id: '16-3', title: 'Первые программы', content: '', order: 3, courseId: '16', createdAt: '', updatedAt: '' },
    ],
    createdAt: '2024-08-15',
    updatedAt: '2024-08-15',
  },
]

// Mock categories
export const mockCategories: CourseCategory[] = [
  {
    id: 'mathematics',
    name: 'Математика',
    description: 'Алгебра, геометрия и математический анализ',
    icon: '📊',
    coursesCount: 4,
  },
  {
    id: 'physics',
    name: 'Физика',
    description: 'Механика, термодинамика, электричество',
    icon: '⚗️',
    coursesCount: 2,
  },
  {
    id: 'chemistry',
    name: 'Химия',
    description: 'Общая и органическая химия',
    icon: '⚙️',
    coursesCount: 2,
  },
  {
    id: 'biology',
    name: 'Биология',
    description: 'Общая биология, генетика, экология',
    icon: '🧬',
    coursesCount: 2,
  },
  {
    id: 'history',
    name: 'История',
    description: 'История Кыргызстана и мировая история',
    icon: '📜',
    coursesCount: 1,
  },
  {
    id: 'literature',
    name: 'Литература',
    description: 'Русская и мировая литература',
    icon: '📚',
    coursesCount: 1,
  },
  {
    id: 'geography',
    name: 'География',
    description: 'Физическая и экономическая география',
    icon: '🌍',
    coursesCount: 1,
  },
  {
    id: 'languages',
    name: 'Языки',
    description: 'Изучение иностранных языков',
    icon: '🌐',
    coursesCount: 2,
  },
  {
    id: 'computer_science',
    name: 'Информатика',
    description: 'Компьютерные науки и программирование',
    icon: '💻',
    coursesCount: 1,
  },
]

// Mock achievements
export const mockAchievements: Achievement[] = [
  {
    id: 'first-course',
    name: 'First Steps',
    description: 'Complete your first course',
    icon: '🎓',
    xpReward: 100,
    category: 'learning',
    requirements: {
      type: 'courses_completed',
      value: 1,
    },
  },
  {
    id: 'course-collector',
    name: 'Course Collector',
    description: 'Complete 5 courses',
    icon: '📚',
    xpReward: 500,
    category: 'completion',
    requirements: {
      type: 'courses_completed',
      value: 5,
    },
  },
  {
    id: 'streak-warrior',
    name: 'Streak Warrior',
    description: 'Maintain a 7-day learning streak',
    icon: '🔥',
    xpReward: 200,
    category: 'streak',
    requirements: {
      type: 'days_streak',
      value: 7,
    },
  },
  {
    id: 'knowledge-seeker',
    name: 'Knowledge Seeker',
    description: 'Complete 50 lessons',
    icon: '🔍',
    xpReward: 300,
    category: 'learning',
    requirements: {
      type: 'lessons_completed',
      value: 50,
    },
  },
  {
    id: 'xp-master',
    name: 'XP Master',
    description: 'Earn 1000 XP',
    icon: '⚡',
    xpReward: 150,
    category: 'learning',
    requirements: {
      type: 'xp_earned',
      value: 1000,
    },
  },
]

// Mock user profile
export const mockUserProfile: UserProfile = {
  id: 'user-1',
  email: 'john.doe@example.com',
  name: 'John Doe',
  avatar: '',
  age: 25,
  bio: 'Passionate learner exploring new technologies and skills',
  level: 8,
  xp: 75,
  totalXp: 1250,
  streak: 12,
  joinedAt: '2024-01-01',
  preferences: {
    language: 'en',
    theme: 'light',
    notifications: true,
  },
}

// Mock user progress
export const mockUserProgress: UserProgress[] = [
  {
    userId: 'user-1',
    courseId: '1',
    completedLessons: ['1-1', '1-2'],
    currentLesson: '1-3',
    progressPercentage: 50,
    xpEarned: 150,
    lastAccessedAt: '2024-10-10',
  },
  {
    userId: 'user-1',
    courseId: '3',
    completedLessons: ['3-1'],
    currentLesson: '3-2',
    progressPercentage: 33,
    xpEarned: 100,
    lastAccessedAt: '2024-10-09',
  },
  {
    userId: 'user-1',
    courseId: '5',
    completedLessons: ['5-1', '5-2', '5-3', '5-4'],
    currentLesson: '',
    progressPercentage: 100,
    xpEarned: 400,
    lastAccessedAt: '2024-10-08',
  },
]

// Helper function to get paginated courses
export const getPaginatedCourses = (
  page: number = 1,
  limit: number = 12,
  filters: {
    search?: string
    category?: string
    level?: string
    sortBy?: string
    sortOrder?: 'asc' | 'desc'
  } = {}
) => {
  let filteredCourses = [...mockCourses]

  // Apply search filter
  if (filters.search) {
    const searchTerm = filters.search.toLowerCase()
    filteredCourses = filteredCourses.filter(
      course =>
        course.title.toLowerCase().includes(searchTerm) ||
        course.description.toLowerCase().includes(searchTerm) ||
        course.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    )
  }

  // Apply category filter
  if (filters.category) {
    filteredCourses = filteredCourses.filter(course => course.category === filters.category)
  }

  // Apply level filter
  if (filters.level) {
    filteredCourses = filteredCourses.filter(course => course.level === filters.level)
  }

  // Apply sorting
  if (filters.sortBy) {
    filteredCourses.sort((a, b) => {
      let aValue: any
      let bValue: any

      switch (filters.sortBy) {
        case 'title':
          aValue = a.title
          bValue = b.title
          break
        case 'rating':
          aValue = a.rating
          bValue = b.rating
          break
        case 'studentsCount':
          aValue = a.studentsCount
          bValue = b.studentsCount
          break
        case 'createdAt':
          aValue = new Date(a.createdAt)
          bValue = new Date(b.createdAt)
          break
        default:
          return 0
      }

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return filters.sortOrder === 'desc' 
          ? bValue.localeCompare(aValue)
          : aValue.localeCompare(bValue)
      }

      return filters.sortOrder === 'desc' ? bValue - aValue : aValue - bValue
    })
  }

  // Apply pagination
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const paginatedCourses = filteredCourses.slice(startIndex, endIndex)

  return {
    courses: paginatedCourses,
    total: filteredCourses.length,
    page,
    limit,
    totalPages: Math.ceil(filteredCourses.length / limit),
  }
}
export type { Course } from '../api/api'