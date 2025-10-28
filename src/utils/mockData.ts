import type { Course, CourseCategory, Achievement, UserProfile, UserProgress } from '../api/api'

// Mock courses data
export const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Основы React',
    description: 'Изучите основы React, включая компоненты, состояние, свойства и хуки. Идеально подходит для новичков, которые хотят начать свой путь в современной веб-разработке.',
    shortDescription: 'Освойте основы React с практическими проектами',
    level: 'beginner',
    category: 'programming',
    duration: 8,
    instructor: 'Сара Джонсон',
    rating: 4.8,
    studentsCount: 2150,
    thumbnail: '',
    price: 0,
    isFree: true,
    tags: ['React', 'JavaScript', 'Frontend', 'Веб-разработка'],
    lessons: [
      { id: '1-1', title: 'Введение в React', content: '', order: 1, courseId: '1', createdAt: '', updatedAt: '' },
      { id: '1-2', title: 'Компоненты и JSX', content: '', order: 2, courseId: '1', createdAt: '', updatedAt: '' },
      { id: '1-3', title: 'Состояние и свойства', content: '', order: 3, courseId: '1', createdAt: '', updatedAt: '' },
      { id: '1-4', title: 'Хуки и эффекты', content: '', order: 4, courseId: '1', createdAt: '', updatedAt: '' },
    ],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
  },
  {
    id: '2',
    title: 'Продвинутый TypeScript',
    description: 'Глубокое погружение в продвинутые концепции TypeScript, включая дженерики, декораторы, модули и техники продвинутой манипуляции типами.',
    shortDescription: 'Освойте продвинутые паттерны и техники TypeScript',
    level: 'advanced',
    category: 'programming',
    duration: 25,
    instructor: 'Майк Чен',
    rating: 4.9,
    studentsCount: 890,
    thumbnail: '',
    price: 79,
    isFree: false,
    tags: ['TypeScript', 'JavaScript', 'Программирование', 'Типы'],
    lessons: [
      { id: '2-1', title: 'Продвинутые типы', content: '', order: 1, courseId: '2', createdAt: '', updatedAt: '' },
      { id: '2-2', title: 'Глубокое погружение в дженерики', content: '', order: 2, courseId: '2', createdAt: '', updatedAt: '' },
      { id: '2-3', title: 'Декораторы и метаданные', content: '', order: 3, courseId: '2', createdAt: '', updatedAt: '' },
      { id: '2-4', title: 'Модули и пространства имён', content: '', order: 4, courseId: '2', createdAt: '', updatedAt: '' },
      { id: '2-5', title: 'Манипуляция типами', content: '', order: 5, courseId: '2', createdAt: '', updatedAt: '' },
      { id: '2-6', title: 'Условные типы', content: '', order: 6, courseId: '2', createdAt: '', updatedAt: '' },
      { id: '2-7', title: 'Сопоставленные типы', content: '', order: 7, courseId: '2', createdAt: '', updatedAt: '' },
      { id: '2-8', title: 'Вспомогательные типы', content: '', order: 8, courseId: '2', createdAt: '', updatedAt: '' },
      { id: '2-9', title: 'Типы шаблонных литералов', content: '', order: 9, courseId: '2', createdAt: '', updatedAt: '' },
      { id: '2-10', title: 'Продвинутые паттерны', content: '', order: 10, courseId: '2', createdAt: '', updatedAt: '' },
    ],
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15',
  },
  {
    id: '3',
    title: 'Принципы дизайна UI/UX',
    description: 'Изучите фундаментальные принципы дизайна пользовательского интерфейса и пользовательского опыта. Создавайте красивые и функциональные дизайны.',
    shortDescription: 'Проектируйте красивые и функциональные пользовательские интерфейсы',
    level: 'intermediate',
    category: 'design',
    duration: 10,
    instructor: 'Эмма Уилсон',
    rating: 4.7,
    studentsCount: 1540,
    thumbnail: '',
    price: 59,
    isFree: false,
    tags: ['Дизайн', 'UI', 'UX', 'Figma', 'Прототипирование'],
    lessons: [
      { id: '3-1', title: 'Основы дизайна', content: '', order: 1, courseId: '3', createdAt: '', updatedAt: '' },
      { id: '3-2', title: 'Теория цвета', content: '', order: 2, courseId: '3', createdAt: '', updatedAt: '' },
      { id: '3-3', title: 'Типографика', content: '', order: 3, courseId: '3', createdAt: '', updatedAt: '' },
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
    duration: 22,
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
      { id: '6-4', title: 'Email Marketing', content: '', order: 4, courseId: '6', createdAt: '', updatedAt: '' },
      { id: '6-5', title: 'Content Marketing', content: '', order: 5, courseId: '6', createdAt: '', updatedAt: '' },
      { id: '6-6', title: 'Analytics and Metrics', content: '', order: 6, courseId: '6', createdAt: '', updatedAt: '' },
      { id: '6-7', title: 'Marketing Automation', content: '', order: 7, courseId: '6', createdAt: '', updatedAt: '' },
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
    duration: 22,
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
      { id: '11-4', title: 'Советский период', content: '', order: 4, courseId: '11', createdAt: '', updatedAt: '' },
      { id: '11-5', title: 'Культурное наследие', content: '', order: 5, courseId: '11', createdAt: '', updatedAt: '' },
      { id: '11-6', title: 'География Кыргызстана', content: '', order: 6, courseId: '11', createdAt: '', updatedAt: '' },
      { id: '11-7', title: 'Экономика страны', content: '', order: 7, courseId: '11', createdAt: '', updatedAt: '' },
      { id: '11-8', title: 'Современность', content: '', order: 8, courseId: '11', createdAt: '', updatedAt: '' },
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
    duration: 28,
    instructor: 'Айдана Нурланова',
    rating: 4.7,
    studentsCount: 2890,
    thumbnail: '',
    price: 0,
    isFree: true,
    tags: ['Английский', 'Грамматика', 'Лексика', 'Разговор'],
    lessons: [
      { id: '14-1', title: 'Алфавит и фонетика', content: 'https://youtu.be/_dVF0SXgs0w?si=JLjrk5stZMgXNKtW', order: 1, courseId: '14', createdAt: '', updatedAt: '' },
      { id: '14-2', title: 'Основная грамматика', content: 'https://youtu.be/fvbl1y2C4bg?si=B4VC3oAOEetO8RML', order: 2, courseId: '14', createdAt: '', updatedAt: '' },
      { id: '14-3', title: 'Повседневная лексика', content: 'https://youtu.be/ro74ZX-bs1I?si=BJt7YESKw6fxB1iz', order: 3, courseId: '14', createdAt: '', updatedAt: '' },
      { id: '14-4', title: 'Глаголы и времена', content: 'https://youtu.be/1WWGgvkY2IA?si=9HnkCfmc8uZkAA8E', order: 4, courseId: '14', createdAt: '', updatedAt: '' },
      { id: '14-5', title: 'Существительные', content: 'https://youtu.be/FZSQwnsx6k4?si=RBJq-uI3mxURoOXT', order: 5, courseId: '14', createdAt: '', updatedAt: '' },
      { id: '14-6', title: 'Прилагательные', content: 'https://youtu.be/tYqZ0QNyUbw?si=Yd4wDZPYMYf3zBdK', order: 6, courseId: '14', createdAt: '', updatedAt: '' },
      { id: '14-7', title: 'Наречия', content: 'https://youtu.be/YrqvilzbJXQ?si=CbdOSuiszohagTb6', order: 7, courseId: '14', createdAt: '', updatedAt: '' },
      { id: '14-8', title: 'Предлоги', content: 'https://youtu.be/gi4klUTmoHw?si=xs66eF9gNSbJUtHz', order: 8, courseId: '14', createdAt: '', updatedAt: '' },
      { id: '14-9', title: 'Разговорная практика', content: '', order: 9, courseId: '14', createdAt: '', updatedAt: '' },
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
  {
    id: '17',
    title: 'Финансовая грамотность',
    description: 'Основы личных финансов, инвестиций, бюджетирования и управления денежными потоками для достижения финансовой независимости.',
    shortDescription: 'Управление личными финансами',
    level: 'beginner',
    category: 'finance',
    duration: 12,
    instructor: 'Айдар Беков',
    rating: 4.7,
    studentsCount: 1870,
    thumbnail: '',
    price: 0,
    isFree: true,
    tags: ['Финансы', 'Инвестиции', 'Бюджет', 'Экономика'],
    lessons: [
      { id: '17-1', title: 'Основы личных финансов', content: '', order: 1, courseId: '17', createdAt: '', updatedAt: '' },
      { id: '17-2', title: 'Бюджетирование', content: '', order: 2, courseId: '17', createdAt: '', updatedAt: '' },
      { id: '17-3', title: 'Инвестиции для новичков', content: '', order: 3, courseId: '17', createdAt: '', updatedAt: '' },
      { id: '17-4', title: 'Кредиты и долги', content: '', order: 4, courseId: '17', createdAt: '', updatedAt: '' },
    ],
    createdAt: '2024-09-01',
    updatedAt: '2024-09-01',
  },
  {
    id: '18',
    title: 'Основы фотографии',
    description: 'Изучите основы фотографии: композицию, освещение, работу с камерой и постобработку снимков.',
    shortDescription: 'Мастерство фотографии',
    level: 'beginner',
    category: 'art',
    duration: 10,
    instructor: 'Айнара Токтосунова',
    rating: 4.8,
    studentsCount: 1540,
    thumbnail: '',
    price: 45,
    isFree: false,
    tags: ['Фотография', 'Композиция', 'Освещение', 'Редактирование'],
    lessons: [
      { id: '18-1', title: 'Основы композиции', content: '', order: 1, courseId: '18', createdAt: '', updatedAt: '' },
      { id: '18-2', title: 'Работа со светом', content: '', order: 2, courseId: '18', createdAt: '', updatedAt: '' },
      { id: '18-3', title: 'Технические настройки камеры', content: '', order: 3, courseId: '18', createdAt: '', updatedAt: '' },
      { id: '18-4', title: 'Постобработка', content: '', order: 4, courseId: '18', createdAt: '', updatedAt: '' },
    ],
    createdAt: '2024-09-15',
    updatedAt: '2024-09-15',
  },
  {
    id: '19',
    title: 'Введение в искусственный интеллект',
    description: 'Понимание основ ИИ, машинного обучения, нейронных сетей и их применения в реальных задачах.',
    shortDescription: 'Основы искусственного интеллекта',
    level: 'intermediate',
    category: 'technology',
    duration: 15,
    instructor: 'Александр Петров',
    rating: 4.9,
    studentsCount: 2120,
    thumbnail: '',
    price: 75,
    isFree: false,
    tags: ['ИИ', 'Машинное обучение', 'Нейронные сети', 'Технологии'],
    lessons: [
      { id: '19-1', title: 'Что такое искусственный интеллект', content: 'https://youtu.be/6y6Q9wFxY_4?si=lieoBsR2n3uDgIIj', order: 1, courseId: '19', createdAt: '', updatedAt: '' },
      { id: '19-2', title: 'Основы машинного обучения', content: 'https://youtu.be/nDCFajF49U4?si=dR8Xu6sCKqV7Q9f5', order: 2, courseId: '19', createdAt: '', updatedAt: '' },
      { id: '19-3', title: 'Нейронные сети', content: 'https://youtu.be/pxGJTpdaJfA?si=LSOnzI32VRwa09YN', order: 3, courseId: '19', createdAt: '', updatedAt: '' },
      { id: '19-4', title: 'Глубокое обучение', content: 'https://youtu.be/hJafPGGmyiE?si=Yb86U7zmxcSXbKvq', order: 4, courseId: '19', createdAt: '', updatedAt: '' },
      { id: '19-5', title: 'Обработка естественного языка', content: 'https://youtu.be/G84no9nG8YE?si=VnVX5D021q-Zj8q0', order: 5, courseId: '19', createdAt: '', updatedAt: '' },
      { id: '19-6', title: 'Компьютерное зрение', content: 'https://youtu.be/YmjHZDGqkEw?si=UbxNOha0k5GRMQqL', order: 6, courseId: '19', createdAt: '', updatedAt: '' },
      { id: '19-7', title: 'Применение ИИ в реальной жизни', content: 'https://youtu.be/YmjHZDGqkEw?si=3FsjLOoGrKbP6Edu', order: 7, courseId: '19', createdAt: '', updatedAt: '' },
    ],
    createdAt: '2024-10-01',
    updatedAt: '2024-10-01',
  },
  {
    id: '20',
    title: 'Йога для начинающих',
    description: 'Комплекс упражнений для улучшения физического и ментального здоровья, гибкости и баланса.',
    shortDescription: 'Здоровье через йогу',
    level: 'beginner',
    category: 'health',
    duration: 8,
    instructor: 'Айгерим Жумабекова',
    rating: 4.6,
    studentsCount: 1320,
    thumbnail: '',
    price: 0,
    isFree: true,
    tags: ['Йога', 'Здоровье', 'Фитнес', 'Медитация'],
    lessons: [
      { id: '20-1', title: 'Основы йоги', content: '', order: 1, courseId: '20', createdAt: '', updatedAt: '' },
      { id: '20-2', title: 'Дыхательные практики', content: '', order: 2, courseId: '20', createdAt: '', updatedAt: '' },
      { id: '20-3', title: 'Базовые асаны', content: '', order: 3, courseId: '20', createdAt: '', updatedAt: '' },
      { id: '20-4', title: 'Медитация', content: '', order: 4, courseId: '20', createdAt: '', updatedAt: '' },
    ],
    createdAt: '2024-10-10',
    updatedAt: '2024-10-10',
  },
  {
    id: '21',
    title: 'Кулинарное искусство',
    description: 'Изучите основы кулинарии, техники приготовления, выбор ингредиентов и создание вкусных блюд.',
    shortDescription: 'Мастерство готовки',
    level: 'beginner',
    category: 'cooking',
    duration: 14,
    instructor: 'Айбек Мамытов',
    rating: 4.8,
    studentsCount: 2450,
    thumbnail: '',
    price: 35,
    isFree: false,
    tags: ['Кулинария', 'Рецепты', 'Готовка', 'Еда'],
    lessons: [
      { id: '21-1', title: 'Основы кулинарии', content: '', order: 1, courseId: '21', createdAt: '', updatedAt: '' },
      { id: '21-2', title: 'Работа с ингредиентами', content: '', order: 2, courseId: '21', createdAt: '', updatedAt: '' },
      { id: '21-3', title: 'Техники приготовления', content: '', order: 3, courseId: '21', createdAt: '', updatedAt: '' },
      { id: '21-4', title: 'Создание меню', content: '', order: 4, courseId: '21', createdAt: '', updatedAt: '' },
    ],
    createdAt: '2024-10-15',
    updatedAt: '2024-10-15',
  },
  {
    id: '22',
    title: 'Основы проектного менеджмента',
    description: 'Управление проектами, планирование, контроль выполнения и командная работа для достижения целей.',
    shortDescription: 'Управление проектами',
    level: 'intermediate',
    category: 'business',
    duration: 16,
    instructor: 'Гульназ Садыкова',
    rating: 4.7,
    studentsCount: 1780,
    thumbnail: '',
    price: 65,
    isFree: false,
    tags: ['Проекты', 'Менеджмент', 'Планирование', 'Команда'],
    lessons: [
      { id: '22-1', title: 'Введение в проектный менеджмент', content: '', order: 1, courseId: '22', createdAt: '', updatedAt: '' },
      { id: '22-2', title: 'Планирование проекта', content: '', order: 2, courseId: '22', createdAt: '', updatedAt: '' },
      { id: '22-3', title: 'Управление рисками', content: '', order: 3, courseId: '22', createdAt: '', updatedAt: '' },
      { id: '22-4', title: 'Контроль и завершение', content: '', order: 4, courseId: '22', createdAt: '', updatedAt: '' },
    ],
    createdAt: '2024-10-20',
    updatedAt: '2024-10-20',
  },
  {
    id: '23',
    title: 'Введение в блокчейн',
    description: 'Понимание технологии блокчейн, криптовалют, смарт-контрактов и их применения в различных отраслях.',
    shortDescription: 'Основы блокчейна',
    level: 'intermediate',
    category: 'technology',
    duration: 12,
    instructor: 'Артур Касымбеков',
    rating: 4.8,
    studentsCount: 1650,
    thumbnail: '',
    price: 80,
    isFree: false,
    tags: ['Блокчейн', 'Криптовалюты', 'Смарт-контракты', 'Технологии'],
    lessons: [
      { id: '23-1', title: 'Что такое блокчейн', content: 'https://youtu.be/hwUeswEeYSA?si=vyB3XwkKUeEfw9GO', order: 1, courseId: '23', createdAt: '', updatedAt: '' },
      { id: '23-2', title: 'Основы криптовалют', content: 'https://youtu.be/HazbY59pjlE?si=yApCz60i-tyfBLqd', order: 2, courseId: '23', createdAt: '', updatedAt: '' },
      { id: '23-3', title: 'Смарт-контракты', content: 'https://youtu.be/fPjA5rVNvbM?si=7U0BA8q_Kepxk5Ks', order: 3, courseId: '23', createdAt: '', updatedAt: '' },
      { id: '23-4', title: 'Децентрализованные приложения', content: 'https://youtu.be/NZxd6wJynPY?si=78IG_ZS64UWmsLlS', order: 4, courseId: '23', createdAt: '', updatedAt: '' },
      { id: '23-5', title: 'Блокчейн и безопасность', content: 'https://youtu.be/wjWfI1LBjDc?si=Egw4r8QZ-6tcQcIu', order: 5, courseId: '23', createdAt: '', updatedAt: '' },
      { id: '23-6', title: 'NFT и цифровые активы', content: 'https://youtu.be/KXzyZoi76yw?si=QvPeBuKFvSlXRImR', order: 6, courseId: '23', createdAt: '', updatedAt: '' },
      { id: '23-7', title: 'Будущее блокчейна', content: 'https://youtu.be/M6AKpEwkwRE?si=5ZNCkJDEIDo46Qz4', order: 7, courseId: '23', createdAt: '', updatedAt: '' },
    ],
    createdAt: '2024-10-25',
    updatedAt: '2024-10-25',
  },
  {
    id: '24',
    title: 'Психология успеха',
    description: 'Развитие личной эффективности, мотивации, уверенности в себе и навыков достижения целей.',
    shortDescription: 'Путь к успеху',
    level: 'beginner',
    category: 'psychology',
    duration: 10,
    instructor: 'Айдана Султанова',
    rating: 4.9,
    studentsCount: 2890,
    thumbnail: '',
    price: 0,
    isFree: true,
    tags: ['Психология', 'Саморазвитие', 'Мотивация', 'Успех'],
    lessons: [
      { id: '24-1', title: 'Основы психологии успеха', content: '', order: 1, courseId: '24', createdAt: '', updatedAt: '' },
      { id: '24-2', title: 'Целеполагание', content: '', order: 2, courseId: '24', createdAt: '', updatedAt: '' },
      { id: '24-3', title: 'Мотивация и дисциплина', content: '', order: 3, courseId: '24', createdAt: '', updatedAt: '' },
      { id: '24-4', title: 'Преодоление трудностей', content: '', order: 4, courseId: '24', createdAt: '', updatedAt: '' },
    ],
    createdAt: '2024-10-30',
    updatedAt: '2024-10-30',
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