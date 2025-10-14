import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

// Translation resources
const resources = {
  en: {
    translation: {
      nav: {
        home: 'Home',
        courses: 'Courses',
        about: 'About',
        faq: 'FAQ',
        profile: 'Profile',
        dashboard: 'Dashboard',
        login: 'Login',
        signup: 'Sign Up',
        logout: 'Logout',
      },
      common: {
        loading: 'Loading...',
        error: 'Error',
        success: 'Success',
        warning: 'Warning',
        info: 'Info',
        save: 'Save',
        cancel: 'Cancel',
        delete: 'Delete',
        edit: 'Edit',
        back: 'Back',
        next: 'Next',
        previous: 'Previous',
        search: 'Search',
        filter: 'Filter',
        sort: 'Sort',
      },
      home: {
        welcome: 'Welcome to SkillZone',
        subtitle: 'Your journey to mastery starts here',
        getStarted: 'Get Started',
        learnMore: 'Learn More',
        features: {
          gamification: {
            title: 'Gamified Learning',
            description: 'Earn XP, unlock achievements, and level up as you progress through courses.',
          },
          progress: {
            title: 'Progress Tracking',
            description: 'Monitor your learning journey with detailed progress analytics and insights.',
          },
          community: {
            title: 'Interactive Community',
            description: 'Connect with fellow learners, share knowledge, and grow together.',
          },
          experts: {
            title: 'Expert Instructors',
            description: 'Learn from industry experts and experienced professionals.',
          },
        },
        stats: {
          courses: 'Courses Available',
          learners: 'Active Learners',
          achievements: 'Achievements',
          languages: 'Languages',
        },
        cta: {
          ready: 'Ready to Start Your Learning Journey?',
          join: 'Join thousands of learners who are already leveling up their skills with SkillZone.',
        },
      },
      about: {
        title: 'About SkillZone',
        subtitle: 'Empowering Young Minds Through Gamified Learning',
        mission: {
          title: 'Our Mission',
          description: 'To make learning engaging and accessible for every young learner through innovative gamification and personalized learning paths.',
        },
        vision: {
          title: 'Our Vision',
          description: 'A world where every child has access to quality education that adapts to their learning style and keeps them motivated.',
        },
        values: {
          title: 'Our Values',
          innovation: 'Innovation in Education',
          accessibility: 'Accessible to All',
          engagement: 'Engaging Learning',
          excellence: 'Excellence in Teaching',
        },
        team: {
          title: 'Meet Our Team',
          description: 'Passionate educators and developers dedicated to transforming education.',
        },
      },
      faq: {
        title: 'Frequently Asked Questions',
        subtitle: 'Find answers to common questions about SkillZone',
        questions: {
          whatIs: {
            q: 'What is SkillZone?',
            a: 'SkillZone is a gamified learning platform designed for young learners aged 7-16. We combine interactive courses with game mechanics to make learning fun and engaging.',
          },
          howWorks: {
            q: 'How does the gamification system work?',
            a: 'You earn XP (experience points) by completing lessons and courses. As you accumulate XP, you level up and unlock achievements. The more you learn, the more rewards you earn!',
          },
          languages: {
            q: 'What languages are supported?',
            a: 'SkillZone currently supports English, Russian (Русский), and Kyrgyz (Кыргызча). You can switch languages anytime from the header menu.',
          },
          free: {
            q: 'Is SkillZone free to use?',
            a: 'We offer both free and premium courses. Many beginner courses are completely free, while advanced courses may require a subscription.',
          },
          mobile: {
            q: 'Can I use SkillZone on my phone?',
            a: 'Yes! SkillZone is fully responsive and works great on all devices including phones, tablets, and computers.',
          },
          progress: {
            q: 'How do I track my progress?',
            a: 'Your progress is automatically saved. You can view detailed statistics in your profile, including completed courses, current XP, achievements, and learning streak.',
          },
        },
      },
      contact: {
        title: 'Get in Touch',
        subtitle: 'Have questions? We would love to hear from you',
        form: {
          name: 'Your Name',
          email: 'Your Email',
          message: 'Your Message',
          send: 'Send Message',
          sending: 'Sending...',
          success: 'Thank you! We have received your message.',
          error: 'Oops! Something went wrong. Please try again.',
        },
        info: {
          title: 'Contact Information',
          email: 'Email',
          phone: 'Phone',
          social: 'Follow Us',
        },
      },
      auth: {
        loginTitle: 'Login to SkillZone',
        registerTitle: 'Join SkillZone',
        email: 'Email',
        password: 'Password',
        name: 'Name',
        confirmPassword: 'Confirm Password',
        forgotPassword: 'Forgot Password?',
        noAccount: "Don't have an account?",
        hasAccount: 'Already have an account?',
        signInHere: 'Sign in here',
        signUpHere: 'Sign up here',
      },
      courses: {
        title: 'Courses',
        description: 'Discover our comprehensive course catalog',
        level: {
          beginner: 'Beginner',
          intermediate: 'Intermediate',
          advanced: 'Advanced',
        },
        duration: 'Duration',
        lessons: 'Lessons',
        enroll: 'Enroll Now',
        preview: 'Preview',
      },
      footer: {
        description: 'Enhance your skills with our comprehensive learning platform. From beginner to expert, we provide the tools you need to succeed.',
        quickLinks: 'Quick Links',
        support: 'Support',
        helpCenter: 'Help Center',
        terms: 'Terms of Service',
        privacy: 'Privacy Policy',
        cookies: 'Cookie Policy',
        contact: 'Contact',
        copyright: 'All rights reserved.',
        madeWith: 'Made with ❤️ for learners everywhere',
      },
    },
  },
  ru: {
    translation: {
      nav: {
        home: 'Главная',
        courses: 'Курсы',
        about: 'О нас',
        faq: 'Вопросы',
        profile: 'Профиль',
        dashboard: 'Панель',
        login: 'Войти',
        signup: 'Регистрация',
        logout: 'Выйти',
      },
      common: {
        loading: 'Загрузка...',
        error: 'Ошибка',
        success: 'Успех',
        warning: 'Предупреждение',
        info: 'Информация',
        save: 'Сохранить',
        cancel: 'Отмена',
        delete: 'Удалить',
        edit: 'Редактировать',
        back: 'Назад',
        next: 'Далее',
        previous: 'Предыдущий',
        search: 'Поиск',
        filter: 'Фильтр',
        sort: 'Сортировка',
      },
      home: {
        welcome: 'Добро пожаловать в SkillZone',
        subtitle: 'Ваше путешествие к мастерству начинается здесь',
        getStarted: 'Начать',
        learnMore: 'Узнать больше',
        features: {
          gamification: {
            title: 'Игровое обучение',
            description: 'Зарабатывайте XP, открывайте достижения и повышайте уровень по мере прохождения курсов.',
          },
          progress: {
            title: 'Отслеживание прогресса',
            description: 'Следите за своим путем обучения с подробной аналитикой и статистикой.',
          },
          community: {
            title: 'Активное сообщество',
            description: 'Общайтесь с другими учениками, делитесь знаниями и развивайтесь вместе.',
          },
          experts: {
            title: 'Опытные преподаватели',
            description: 'Учитесь у экспертов отрасли и опытных профессионалов.',
          },
        },
        stats: {
          courses: 'Доступных курсов',
          learners: 'Активных учеников',
          achievements: 'Достижений',
          languages: 'Языков',
        },
        cta: {
          ready: 'Готовы начать свое обучение?',
          join: 'Присоединяйтесь к тысячам учеников, которые уже повышают свои навыки с SkillZone.',
        },
      },
      about: {
        title: 'О SkillZone',
        subtitle: 'Развиваем молодые умы через игровое обучение',
        mission: {
          title: 'Наша миссия',
          description: 'Сделать обучение увлекательным и доступным для каждого юного ученика через инновационную геймификацию и персонализированные пути обучения.',
        },
        vision: {
          title: 'Наше видение',
          description: 'Мир, в котором каждый ребенок имеет доступ к качественному образованию, адаптированному к его стилю обучения и поддерживающему мотивацию.',
        },
        values: {
          title: 'Наши ценности',
          innovation: 'Инновации в образовании',
          accessibility: 'Доступность для всех',
          engagement: 'Увлекательное обучение',
          excellence: 'Превосходство в преподавании',
        },
        team: {
          title: 'Наша команда',
          description: 'Увлеченные преподаватели и разработчики, посвятившие себя трансформации образования.',
        },
      },
      faq: {
        title: 'Часто задаваемые вопросы',
        subtitle: 'Найдите ответы на популярные вопросы о SkillZone',
        questions: {
          whatIs: {
            q: 'Что такое SkillZone?',
            a: 'SkillZone - это игровая образовательная платформа для молодых учеников 7-16 лет. Мы объединяем интерактивные курсы с игровой механикой, чтобы сделать обучение веселым и увлекательным.',
          },
          howWorks: {
            q: 'Как работает система геймификации?',
            a: 'Вы зарабатываете XP (очки опыта), проходя уроки и курсы. По мере накопления XP вы повышаете уровень и открываете достижения. Чем больше вы учитесь, тем больше наград получаете!',
          },
          languages: {
            q: 'Какие языки поддерживаются?',
            a: 'SkillZone в настоящее время поддерживает английский, русский и кыргызский языки. Вы можете переключить язык в любое время из меню в шапке сайта.',
          },
          free: {
            q: 'Бесплатен ли SkillZone?',
            a: 'Мы предлагаем как бесплатные, так и премиум курсы. Многие курсы для начинающих полностью бесплатны, в то время как продвинутые курсы могут требовать подписки.',
          },
          mobile: {
            q: 'Могу ли я использовать SkillZone на телефоне?',
            a: 'Да! SkillZone полностью адаптивен и отлично работает на всех устройствах, включая телефоны, планшеты и компьютеры.',
          },
          progress: {
            q: 'Как отслеживать свой прогресс?',
            a: 'Ваш прогресс сохраняется автоматически. Вы можете просмотреть подробную статистику в своем профиле, включая пройденные курсы, текущий XP, достижения и учебную серию.',
          },
        },
      },
      contact: {
        title: 'Свяжитесь с нами',
        subtitle: 'Есть вопросы? Мы будем рады услышать вас',
        form: {
          name: 'Ваше имя',
          email: 'Ваш email',
          message: 'Ваше сообщение',
          send: 'Отправить',
          sending: 'Отправка...',
          success: 'Спасибо! Мы получили ваше сообщение.',
          error: 'Упс! Что-то пошло не так. Пожалуйста, попробуйте снова.',
        },
        info: {
          title: 'Контактная информация',
          email: 'Email',
          phone: 'Телефон',
          social: 'Следите за нами',
        },
      },
      auth: {
        loginTitle: 'Войти в SkillZone',
        registerTitle: 'Присоединиться к SkillZone',
        email: 'Электронная почта',
        password: 'Пароль',
        name: 'Имя',
        confirmPassword: 'Подтвердите пароль',
        forgotPassword: 'Забыли пароль?',
        noAccount: 'Нет аккаунта?',
        hasAccount: 'Уже есть аккаунт?',
        signInHere: 'Войдите здесь',
        signUpHere: 'Зарегистрируйтесь здесь',
      },
      courses: {
        title: 'Курсы',
        description: 'Откройте для себя наш всеобъемлющий каталог курсов',
        level: {
          beginner: 'Начинающий',
          intermediate: 'Средний',
          advanced: 'Продвинутый',
        },
        duration: 'Продолжительность',
        lessons: 'Уроки',
        enroll: 'Записаться',
        preview: 'Предпросмотр',
      },
      footer: {
        description: 'Улучшите свои навыки с помощью нашей комплексной обучающей платформы. От новичка до эксперта, мы предоставляем инструменты, необходимые для успеха.',
        quickLinks: 'Быстрые ссылки',
        support: 'Поддержка',
        helpCenter: 'Центр помощи',
        terms: 'Условия использования',
        privacy: 'Политика конфиденциальности',
        cookies: 'Политика использования файлов cookie',
        contact: 'Контакты',
        copyright: 'Все права защищены.',
        madeWith: 'Сделано с ❤️ для учащихся по всему миру',
      },
    },
  },
  ky: {
    translation: {
      nav: {
        home: 'Башкы бет',
        courses: 'Курстар',
        about: 'Биз жөнүндө',
        faq: 'Көп берилүүчү суроолор',
        profile: 'Профиль',
        dashboard: 'Башкаруу панели',
        login: 'Кирүү',
        signup: 'Катталуу',
        logout: 'Чыгуу',
      },
      common: {
        loading: 'Жүктөлүүдө...',
        error: 'Ката',
        success: 'Ийгиликтүү',
        warning: 'Эскертүү',
        info: 'Маалымат',
        save: 'Сактоо',
        cancel: 'Жокко чыгаруу',
        delete: 'Өчүрүү',
        edit: 'Түзөтүү',
        back: 'Артка',
        next: 'Кийинки',
        previous: 'Мурунку',
        search: 'Издөө',
        filter: 'Чыпка',
        sort: 'Иреттөө',
      },
      home: {
        welcome: 'SkillZone\'га кош келиңиз',
        subtitle: 'Чеберчилик жолуңуз ушул жерден башталат',
        getStarted: 'Баштоо',
        learnMore: 'Көбүрөөк билүү',
        features: {
          gamification: {
            title: 'Оюндаштырылган окуу',
            description: 'XP топтоп, жетишкендиктерди ачып, курстарды өткөргөн сайын деңгээлди көтөрүңүз.',
          },
          progress: {
            title: 'Прогресс көзөмөлү',
            description: 'Деталдуу аналитика жана түшүнүктөр менен окуу жолуңузду көзөмөлдөп туруңуз.',
          },
          community: {
            title: 'Интерактивдүү коомчулук',
            description: 'Башка окуучулар менен байланышып, билимди бөлүшүп, чогуу өсүңүз.',
          },
          experts: {
            title: 'Эксперт окутуучулар',
            description: 'Тармактын эксперттеринен жана тажрыйбалуу адистерден үйрөнүңүз.',
          },
        },
        stats: {
          courses: 'Жеткиликтүү курстар',
          learners: 'Активдүү окуучулар',
          achievements: 'Жетишкендиктер',
          languages: 'Тилдер',
        },
        cta: {
          ready: 'Окуу жолуңузду баштоого даярсызбы?',
          join: 'SkillZone менен көндүмдөрүн өркүндөтүп жаткан миңдеген окуучуларга кошулуңуз.',
        },
      },
      about: {
        title: 'SkillZone жөнүндө',
        subtitle: 'Оюндаштырылган окуу аркылуу жаш акыл-эстерди өнүктүрүү',
        mission: {
          title: 'Биздин миссия',
          description: 'Инновациялык геймификация жана жекелештирилген окуу жолдору аркылуу ар бир жаш окуучу үчүн окууну кызыктуу жана жеткиликтүү кылуу.',
        },
        vision: {
          title: 'Биздин көз караш',
          description: 'Ар бир баланын окуу стилине ылайыкташтырылган жана аны мотивациялаган сапаттуу билим алуу мүмкүнчүлүгү бар дүйнө.',
        },
        values: {
          title: 'Биздин баалуулуктар',
          innovation: 'Билим берүүдөгү инновациялар',
          accessibility: 'Бардыгына жеткиликтүүлүк',
          engagement: 'Кызыктуу окуу',
          excellence: 'Окутуудагы мыктылык',
        },
        team: {
          title: 'Биздин команда',
          description: 'Билим берүүнү өзгөртүүгө арналган кызыктуу мугалимдер жана иштеп чыгуучулар.',
        },
      },
      faq: {
        title: 'Көп берилүүчү суроолор',
        subtitle: 'SkillZone жөнүндө көп берилүүчү суроолорго жооп табыңыз',
        questions: {
          whatIs: {
            q: 'SkillZone деген эмне?',
            a: 'SkillZone - бул 7-16 жаштагы жаш окуучулар үчүн иштелип чыккан оюндаштырылган окуу платформасы. Биз окууну кызыктуу жана кызыктуу кылуу үчүн интерактивдүү курстарды оюн механикасы менен айкалыштырабыз.',
          },
          howWorks: {
            q: 'Геймификация системасы кантип иштейт?',
            a: 'Сиз сабактарды жана курстарды аякташуу менен XP (тажрыйба упайларын) топтойсуз. XP топтогон сайын, деңгээлди көтөрүп, жетишкендиктерди ачасыз. Канчалык көп окусаңыз, ошончолук көп сыйлыктарды аласыз!',
          },
          languages: {
            q: 'Кайсы тилдер колдоо көрсөтүлөт?',
            a: 'SkillZone учурда англис, орус жана кыргыз тилдерин колдойт. Тилди каалаган убакта башкы меню аркылуу которсоңуз болот.',
          },
          free: {
            q: 'SkillZone акысызбы?',
            a: 'Биз акысыз жана премиум курстарды сунуштайбыз. Көптөгөн башталгыч курстар толугу менен акысыз, ал эми алдыңкы курстар жазылууну талап кылышы мүмкүн.',
          },
          mobile: {
            q: 'SkillZone\' ду телефонумда колдонсом болобу?',
            a: 'Ооба! SkillZone толугу менен адаптивдүү жана телефондор, планшеттер жана компьютерлер өз ичине алган бардык түзмөктөрдө сонун иштейт.',
          },
          progress: {
            q: 'Прогрессти кантип көзөмөлдөө керек?',
            a: 'Прогрессиңиз автоматтык түрдө сакталат. Профилиңизде аяктаган курстарды, учурдагы XP, жетишкендиктерди жана окуу сериясын камтыган деталдуу статистиканы көрө аласыз.',
          },
        },
      },
      contact: {
        title: 'Байланышуу',
        subtitle: 'Суроолоруңуз барбы? Сизден угууга кубанабыз',
        form: {
          name: 'Атыңыз',
          email: 'Email дарегиңиз',
          message: 'Билдирүүңүз',
          send: 'Жөнөтүү',
          sending: 'Жөнөтүлүүдө...',
          success: 'Рахмат! Билдирүүңүздү алдык.',
          error: 'Ой! Бир нерсе туура эмес болду. Кайрадан аракет кылып көрүңүз.',
        },
        info: {
          title: 'Байланыш маалыматы',
          email: 'Email',
          phone: 'Телефон',
          social: 'Биз менен болуңуз',
        },
      },
      auth: {
        loginTitle: 'SkillZone\'га кирүү',
        registerTitle: 'SkillZone\'га кошулуу',
        email: 'Электрондук почта',
        password: 'Купуя сөз',
        name: 'Аты',
        confirmPassword: 'Купуя сөздү ырастоо',
        forgotPassword: 'Купуя сөздү унуттуңузбу?',
        noAccount: 'Аккаунтуңуз жокпу?',
        hasAccount: 'Аккаунтуңуз барбы?',
        signInHere: 'Бул жерден кириңиз',
        signUpHere: 'Бул жерден катталыңыз',
      },
      courses: {
        title: 'Курстар',
        description: 'Биздин кең курстар каталогун ачыңыз',
        level: {
          beginner: 'Баштапкы',
          intermediate: 'Орточо',
          advanced: 'Алдыңкы',
        },
        duration: 'Убакыт',
        lessons: 'Сабактар',
        enroll: 'Жазылуу',
        preview: 'Алдын ала көрүү',
      },
      footer: {
        description: 'Биздин кеңири билим берүү платформасы менен көндүмдөрүңүздү жакшыртыңыз. Жаңы башталгыч денгээлден эксперт денгээлине чейин, биз ийгиликке жетүү үчүн керектүү курамдарды берүү.',
        quickLinks: 'Тез шилтемелер',
        support: 'Колдоо',
        helpCenter: 'Жардам борбору',
        terms: 'Колдонуу шарттары',
        privacy: 'Купуялык саясаты',
        cookies: 'Cookie саясаты',
        contact: 'Байланыш',
        copyright: 'Бардык укуктар корголгон.',
        madeWith: 'Дүйнө жүзүндөгү окуучулар үчүн ❤️ менен жасалган',
      },
    },
  },
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    
    interpolation: {
      escapeValue: false,
    },
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
  })

export default i18n