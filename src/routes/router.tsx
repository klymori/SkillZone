import { createBrowserRouter } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { Layout } from '../components/Layout'
import { Loader } from '../components/Loader'

// Lazy load pages for better performance
const Home = lazy(() => import('../pages/Home').then(module => ({ default: module.Home })))
const Courses = lazy(() => import('../pages/Courses').then(module => ({ default: module.Courses })))
const CourseDetail = lazy(() => import('../pages/CourseDetail').then(module => ({ default: module.CourseDetail })))
const LessonView = lazy(() => import('../pages/LessonView').then(module => ({ default: module.LessonView })))
const Wishlist = lazy(() => import('../pages/Wishlist').then(module => ({ default: module.Wishlist })))
const Profile = lazy(() => import('../pages/Profile').then(module => ({ default: module.Profile })))
const About = lazy(() => import('../pages/About').then(module => ({ default: module.About })))
const FAQ = lazy(() => import('../pages/FAQ').then(module => ({ default: module.FAQ })))
const Contact = lazy(() => import('../pages/Contact').then(module => ({ default: module.Contact })))
const Login = lazy(() => import('../pages/Login').then(module => ({ default: module.Login })))
const Register = lazy(() => import('../pages/Register').then(module => ({ default: module.Register })))
const Dashboard = lazy(() => import('../pages/Dashboard').then(module => ({ default: module.Dashboard })))
const NotFound = lazy(() => import('../pages/NotFound').then(module => ({ default: module.NotFound })))

// Loading fallback component
const SuspenseLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
    <Loader size="lg" />
  </div>
)

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: (
      <Suspense fallback={<SuspenseLoader />}>
        <NotFound />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<SuspenseLoader />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: 'courses',
        element: (
          <Suspense fallback={<SuspenseLoader />}>
            <Courses />
          </Suspense>
        ),
      },
      {
        path: 'courses/:id',
        element: (
          <Suspense fallback={<SuspenseLoader />}>
            <CourseDetail />
          </Suspense>
        ),
      },
      {
        path: 'courses/:courseId/lessons/:lessonId',
        element: (
          <Suspense fallback={<SuspenseLoader />}>
            <LessonView />
          </Suspense>
        ),
      },
      {
        path: 'wishlist',
        element: (
          <Suspense fallback={<SuspenseLoader />}>
            <Wishlist />
          </Suspense>
        ),
      },
      {
        path: 'profile',
        element: (
          <Suspense fallback={<SuspenseLoader />}>
            <Profile />
          </Suspense>
        ),
      },
      {
        path: 'dashboard',
        element: (
          <Suspense fallback={<SuspenseLoader />}>
            <Dashboard />
          </Suspense>
        ),
      },
      {
        path: 'about',
        element: (
          <Suspense fallback={<SuspenseLoader />}>
            <About />
          </Suspense>
        ),
      },
      {
        path: 'faq',
        element: (
          <Suspense fallback={<SuspenseLoader />}>
            <FAQ />
          </Suspense>
        ),
      },
      {
        path: 'contact',
        element: (
          <Suspense fallback={<SuspenseLoader />}>
            <Contact />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: '/login',
    element: (
      <Suspense fallback={<SuspenseLoader />}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: '/register',
    element: (
      <Suspense fallback={<SuspenseLoader />}>
        <Register />
      </Suspense>
    ),
  },
  {
    path: '*',
    element: (
      <Suspense fallback={<SuspenseLoader />}>
        <NotFound />
      </Suspense>
    ),
  },
])