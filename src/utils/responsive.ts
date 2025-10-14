// Responsive design utilities

// Breakpoints (matching TailwindCSS)
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const

// Media query hooks
export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = React.useState(false)

  React.useEffect(() => {
    const media = window.matchMedia(query)
    if (media.matches !== matches) {
      setMatches(media.matches)
    }
    
    const listener = () => setMatches(media.matches)
    media.addListener(listener)
    
    return () => media.removeListener(listener)
  }, [matches, query])

  return matches
}

// Breakpoint hooks
export const useIsSmallScreen = () => useMediaQuery(`(max-width: ${breakpoints.md})`)
export const useIsMediumScreen = () => useMediaQuery(`(min-width: ${breakpoints.md}) and (max-width: ${breakpoints.lg})`)
export const useIsLargeScreen = () => useMediaQuery(`(min-width: ${breakpoints.lg})`)

// Mobile detection
export const useIsMobile = () => {
  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)
    
    return () => window.removeEventListener('resize', checkIsMobile)
  }, [])

  return isMobile
}

// Responsive grid classes
export const getResponsiveGridClasses = (
  mobile: number = 1,
  tablet: number = 2,
  desktop: number = 3,
  large: number = 4
) => {
  return `grid-cols-${mobile} md:grid-cols-${tablet} lg:grid-cols-${desktop} xl:grid-cols-${large}`
}

// Responsive spacing classes
export const getResponsiveSpacing = (
  mobile: string = '4',
  tablet: string = '6',
  desktop: string = '8'
) => {
  return `p-${mobile} md:p-${tablet} lg:p-${desktop}`
}

// Container classes for different screen sizes
export const containerClasses = {
  mobile: 'px-4 sm:px-6',
  tablet: 'px-4 sm:px-6 md:px-8',
  desktop: 'px-4 sm:px-6 lg:px-8',
  full: 'px-4 sm:px-6 lg:px-8 xl:px-12',
}

import React from 'react'