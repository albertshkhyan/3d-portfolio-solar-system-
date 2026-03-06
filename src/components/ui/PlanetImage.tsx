import { useState } from 'react'
import { motion } from 'framer-motion'
import type { SectionId } from '../../types'

interface PlanetImageProps {
  sectionId: SectionId
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const PLANET_IMAGES: Record<SectionId, {
  url: string
  name: string
  color: string
}> = {
  overview: {
    url: '',
    name: '',
    color: '',
  },
  about: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Mercury_in_color_-_Prockter07-edit1.jpg/600px-Mercury_in_color_-_Prockter07-edit1.jpg',
    name: 'Mercury',
    color: 'from-zinc-500/30 to-zinc-600/10',
  },
  skills: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Venus_2_Approach_Image.jpg/600px-Venus_2_Approach_Image.jpg',
    name: 'Venus',
    color: 'from-amber-500/30 to-orange-600/10',
  },
  experience: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/The_Blue_Marble_%28remastered%29.jpg/600px-The_Blue_Marble_%28remastered%29.jpg',
    name: 'Earth',
    color: 'from-blue-500/30 to-cyan-600/10',
  },
  projects: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Mars_-_August_30_2021_-_Flickr_-_Kevin_M._Gill.png/600px-Mars_-_August_30_2021_-_Flickr_-_Kevin_M._Gill.png',
    name: 'Mars',
    color: 'from-red-500/30 to-orange-600/10',
  },
  architecture: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Jupiter_New_Horizons.jpg/600px-Jupiter_New_Horizons.jpg',
    name: 'Jupiter',
    color: 'from-orange-500/30 to-amber-600/10',
  },
  devops: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Saturn_during_Equinox.jpg/600px-Saturn_during_Equinox.jpg',
    name: 'Saturn',
    color: 'from-yellow-500/30 to-amber-600/10',
  },
  contact: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Neptune_Voyager2_color_calibrated.png/600px-Neptune_Voyager2_color_calibrated.png',
    name: 'Neptune',
    color: 'from-indigo-500/30 to-purple-600/10',
  },
}

const SIZES = {
  sm: 'w-10 h-10',
  md: 'w-14 h-14',
  lg: 'w-20 h-20',
}

export function PlanetImage({ sectionId, size = 'md', className = '' }: PlanetImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const planet = PLANET_IMAGES[sectionId]

  if (!planet || sectionId === 'overview') return null

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ type: 'spring', damping: 20, stiffness: 200, delay: 0.1 }}
      className={`relative ${SIZES[size]} ${className}`}
    >
      {/* Glow effect */}
      <div 
        className={`absolute inset-0 rounded-full bg-gradient-to-br ${planet.color} blur-xl scale-150 opacity-60`}
        aria-hidden="true"
      />
      
      {/* Planet container */}
      <div className="relative w-full h-full rounded-full overflow-hidden shadow-2xl ring-1 ring-white/10">
        {/* Loading skeleton */}
        {!isLoaded && !hasError && (
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-700 to-zinc-800 animate-pulse" />
        )}
        
        {/* Planet image */}
        {!hasError && (
          <motion.img
            src={planet.url}
            alt={`${planet.name} planet`}
            loading="lazy"
            onLoad={() => setIsLoaded(true)}
            onError={() => setHasError(true)}
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoaded ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full object-cover"
          />
        )}

        {/* Fallback gradient */}
        {hasError && (
          <div className={`w-full h-full bg-gradient-to-br ${planet.color}`} />
        )}

        {/* Shine overlay */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent"
          aria-hidden="true"
        />
      </div>

      {/* Orbit ring decoration */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-[-4px] rounded-full border border-white/10 border-dashed"
        aria-hidden="true"
      />
    </motion.div>
  )
}
