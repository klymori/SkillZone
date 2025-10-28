import React from 'react'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { FirebaseProvider } from './contexts/FirebaseContext'
import { store } from './app/store'
import { router } from './routes/router'

function App() {
  // Initialize theme on app start
  React.useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light'
    document.documentElement.classList.toggle('dark', savedTheme === 'dark')
  }, [])

  return (
    <Provider store={store}>
      <FirebaseProvider>
        <RouterProvider router={router} />
      </FirebaseProvider>
    </Provider>
  )
}

export default App