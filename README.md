# 🎓 SkillZone - Modern Gamified Learning Platform

[![CI/CD Pipeline](https://github.com/klymori/SkillZone/workflows/CI%2FCD%20Pipeline/badge.svg)](https://github.com/klymori/SkillZone/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> A modern, gamified learning platform built for young learners aged 7-16. Features XP progression, achievements, multi-language support (RU/EN/KG), course reviews, and fully responsive design.

🌟 **Mobile Responsive** | 🌍 **Multi-Language (RU/EN/KG)** | 🎮 **Gamification**

## ✨ Features

### 🎮 Gamification System
- **XP & Levels:** Earn experience points and level up as you learn
- **Achievements:** Unlock badges for reaching milestones
- **Streak Tracking:** Maintain daily learning streaks for bonus rewards
- **Progress Analytics:** Detailed insights into your learning journey

### 🎓 Learning Features
- **12+ Courses:** Comprehensive courses across Programming, Design, and Business
- **Course Reviews:** Rate and review courses with star ratings and comments
- **Detailed Course Pages:** Full curriculum, instructor info, and student reviews
- **Smart Filtering:** Search by category, level, rating, and more
- **Progress Tracking:** Visual progress bars and completion status
- **Favorites System:** Save courses for quick access
- **Interactive UI:** Smooth animations and engaging interactions

### 🌍 User Experience
- **Multi-Language:** Full support for English, Russian (Русский), and Kyrgyz (Кыргызча)
- **Dark/Light Theme:** Seamless theme switching with improved header colors
  - Dark theme: White text/icons, black on hover
  - Light theme: Black text, white/highlighted on hover
- **Responsive Design:** iPhone 12 Pro tested, optimized for all devices
- **Contact Form:** Integrated with Formspree for user inquiries
- **Enhanced About Page:** Mission, vision, team, and achievements
- **FAQ with Accordion:** Google-style expandable questions with smooth animations
- **Accessibility:** WCAG compliant with keyboard navigation
- **Performance:** Lazy loading and code splitting for optimal speed

### 👤 Profile Management
- **User Dashboard:** Comprehensive overview of learning progress
- **Achievement Gallery:** Showcase of unlocked achievements
- **Settings Panel:** Customize preferences and account settings
- **Statistics:** Detailed analytics and learning insights

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Git

## 🛠️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd SkillZone
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   # Copy environment file
   cp .env.example .env
   
   # Edit environment variables as needed
   VITE_API_URL=http://localhost:3001/api
   VITE_APP_NAME=SkillZone
   VITE_APP_VERSION=1.0.0
   
   # Firebase Configuration (see FIREBASE_SETUP.md for details)
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 📁 Project Structure

```
src/
├── api/                # RTK Query endpoints and API configuration
│   └── api.ts         # Main API slice with endpoints
├── app/               # Application configuration
│   └── store.ts       # Redux store configuration
├── features/          # Feature-based modules
│   ├── auth/          # Authentication functionality
│   ├── courses/       # Course management
│   ├── progress/      # Progress tracking
│   ├── ui/            # UI state management
│   ├── translator/    # Translation utilities
│   └── admin/         # Admin functionality
├── components/        # Reusable UI components
│   ├── Layout.tsx     # Main layout wrapper
│   ├── Header.tsx     # Navigation header with theme toggle
│   ├── Footer.tsx     # Site footer with social links
│   ├── Button.tsx     # Custom button component
│   ├── Logo.tsx       # Animated logo component
│   ├── CourseCard.tsx # Course display cards
│   ├── AchievementCard.tsx # Achievement displays
│   ├── XpProgressBar.tsx # XP progress visualization
│   └── Loader.tsx     # Loading indicators
├── pages/             # Page components
│   ├── Home.tsx       # Landing page
│   ├── Courses.tsx    # Course catalog with filters
│   ├── CourseDetail.tsx # Detailed course view with reviews
│   ├── Profile.tsx    # User profile with gamification
│   ├── About.tsx      # Enhanced about page
│   ├── FAQ.tsx        # FAQ with accordion
│   ├── Contact.tsx    # Contact form with Formspree
│   ├── Login.tsx      # Login page
│   ├── Register.tsx   # Registration page
│   ├── Dashboard.tsx  # User dashboard
│   └── NotFound.tsx   # 404 error page
├── routes/            # Routing configuration
│   └── router.tsx     # React Router setup
├── assets/            # Static assets
│   ├── images/        # Image files
│   ├── icons/         # Icon files
│   └── fonts/         # Custom fonts
├── i18n/              # Internationalization
│   └── config.ts      # i18next configuration
├── utils/             # Utility functions
│   └── cn.ts          # Class name utility
├── hooks/             # Custom React hooks
├── firebase/          # Firebase integration
│   ├── index.ts       # Firebase initialization
│   ├── config.ts      # Firebase configuration
│   └── services/      # Firebase service modules
└── types/             # TypeScript type definitions
```

## 🎯 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run type-check   # Run TypeScript checks

# Testing (when implemented)
npm run test         # Run tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Run tests with coverage
```

## 🌍 Multi-language Support

The application supports three languages:
- **English (en)** - Default language
- **Russian (ru)** - Русский
- **Kyrgyz (ky)** - Кыргызча

Language preference is automatically detected and persisted in localStorage.

## 🎨 Theming

### Dark/Light Mode
- Toggle between themes using the theme switcher in the header
- Preference is persisted in localStorage
- Automatic system theme detection on first visit

### Customization
Theme colors can be customized in `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      primary: { /* custom primary colors */ },
      secondary: { /* custom secondary colors */ },
    }
  }
}
```

## 🔧 Configuration

### Environment Variables
- `VITE_API_URL` - Backend API URL
- `VITE_APP_NAME` - Application name
- `VITE_APP_VERSION` - Application version
- `VITE_FIREBASE_*` - Firebase configuration variables

### Build Configuration
The project uses Vite with custom configuration in `vite.config.ts` including:
- Path aliases for cleaner imports
- Optimized build settings
- Development server configuration

## 🚀 Deployment

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm run preview  # Preview the build locally
```

### Docker (Optional)
```bash
# Build Docker image
docker build -t skillzone .

# Run container
docker run -p 3000:3000 skillzone
```

## 🔥 Firebase Integration

This project now includes Firebase integration for:
- **Authentication:** Email/password and Google Sign-In
- **Firestore Database:** Storing user data, courses, reviews, and progress
- **Cloud Storage:** Avatar uploads and media storage
- **Security Rules:** Fine-grained access control

### Setup Instructions
Refer to [FIREBASE_SETUP.md](FIREBASE_SETUP.md) for detailed setup instructions.

### Key Features
- Persistent user sessions across reloads and deployments
- Real-time data synchronization
- Secure file uploads with size/extension validation
- Comprehensive security rules to protect user data

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - UI library
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Vite](https://vitejs.dev/) - Build tool
- [TailwindCSS](https://tailwindcss.com/) - Styling
- [Redux Toolkit](https://redux-toolkit.js.org/) - State management
- [React Router](https://reactrouter.com/) - Routing
- [Framer Motion](https://www.framer.com/motion/) - Animations
- [Lucide React](https://lucide.dev/) - Icons
- [i18next](https://www.i18next.com/) - Internationalization
- [Firebase](https://firebase.google.com/) - Backend services

## 📞 Contact & Support

- **Email:** [kaqqakat@gmail.com](mailto:kaqqakat@gmail.com)
- **WhatsApp:** [+996502062868](https://wa.me/996502062868)
- **Telegram:** [@xbown](https://t.me/xbown)
- **GitHub:** [klymori](https://github.com/klymori)

## 🚀 Recent Updates

### Version 1.2.0 (Firebase Integration)
- ✅ Firebase Authentication with email/password and Google Sign-In
- ✅ Firestore integration for user data, courses, reviews, and progress
- ✅ Cloud Storage for avatar uploads
- ✅ Persistent user sessions across reloads
- ✅ Security rules for data protection
- ✅ Improved error handling and user feedback

### Version 1.1.0
- ✅ Complete translations for RU/EN/KG across all pages
- ✅ Enhanced header theme colors (dark/light mode improvements)
- ✅ Expanded About page with mission, team, achievements
- ✅ FAQ page with Google-style accordion animations
- ✅ 12 comprehensive courses added
- ✅ Course review system with ratings and comments
- ✅ Contact page with Formspree integration
- ✅ Updated footer with correct social media links
- ✅ Performance optimization with lazy loading
- ✅ Mobile responsiveness fixes (iPhone 12 Pro tested)

### Coming Soon
- 🔄 Video lessons integration
- 🔄 Real-time progress synchronization
- 🔄 Certificate generation
- 🔄 Firebase Functions for server-side logic

---

**Made with ❤️ for learners everywhere by [klymori](https://github.com/klymori)**