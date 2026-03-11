import { Component, type ReactNode, useEffect, useState } from 'react'
import { useViewport } from './hooks/useViewport'
import { useKeyboardNavigation } from './hooks/useKeyboardNavigation'
import { useAppStore } from './store'
import { SolarSystem } from './components/three/SolarSystem'
import { SectionPanel } from './components/ui/SectionPanel'
import { BackButton } from './components/ui/BackButton'
import { MobileSectionNav } from './components/ui/MobileSectionNav'
import { KeyboardShortcutsHint } from './components/ui/KeyboardShortcutsHint'
import { DownloadCVButton } from './components/ui/DownloadCVButton'
import { BackgroundGradient } from './components/ui/BackgroundGradient'
import { MiniMap } from './components/ui/MiniMap'
import { PlayPauseControl } from './components/ui/PlayPauseControl'
import { HeroHeader } from './components/ui/HeroHeader'
import { CameraDistanceDisplay } from './components/ui/CameraDistanceDisplay'
import { MilkyWayOverlay } from './components/ui/MilkyWayOverlay'
import { CAMERA } from './config/animation'

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

class ErrorBoundary extends Component<{ children: ReactNode }, ErrorBoundaryState> {
  constructor(props: { children: ReactNode }) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#050510] text-white p-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
            <p className="text-gray-400 mb-4">{this.state.error?.message}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-purple-600 rounded-lg"
            >
              Reload Page
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

interface LoadingScreenProps {
  progress?: number
  message?: string
}

function LoadingScreen({ progress = 0, message = 'Loading universe...' }: LoadingScreenProps) {
  const percentage = Math.round(progress * 100)
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050510]">
      <div className="text-center">
        <div className="relative w-20 h-20 mx-auto mb-6">
          <div className="absolute inset-0 border-4 border-purple-500/20 rounded-full" />
          <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
            <circle
              cx="40"
              cy="40"
              r="36"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={`${progress * 226} 226`}
              className="transition-all duration-300"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#6366f1" />
              </linearGradient>
            </defs>
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-sm font-medium text-white">
            {percentage}%
          </span>
        </div>
        <p className="text-gray-400 text-sm">{message}</p>
        {progress > 0 && progress < 1 && (
          <p className="text-gray-500 text-xs mt-2">Loading textures...</p>
        )}
      </div>
    </div>
  )
}

function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100]
                 focus:px-4 focus:py-2 focus:bg-purple-600 focus:text-white focus:rounded-lg
                 focus:outline-none focus:ring-2 focus:ring-purple-400"
    >
      Skip to main content
    </a>
  )
}

function MainView() {
  useKeyboardNavigation()
  const { isMobile } = useViewport()
  const cameraDistance = useAppStore((state) => state.cameraDistance)
  const dimCanvas =
    cameraDistance >= CAMERA.MILKY_WAY_OVERLAY_THRESHOLD
  const canvasOpacity = dimCanvas ? 0.2 : 1

  return (
    <>
      <SkipToContent />
      <div
        id="main-content"
        role="main"
        aria-label="Interactive solar system portfolio"
        className="relative w-full h-screen overflow-hidden bg-[#050510]"
      >
        <BackgroundGradient />
        <ErrorBoundary>
          <div
            className="absolute inset-0 w-full h-full transition-opacity duration-500 ease-out"
            style={{ opacity: canvasOpacity }}
          >
            <SolarSystem />
          </div>
        </ErrorBoundary>
        <MilkyWayOverlay />
        <HeroHeader />
        <BackButton />
        <CameraDistanceDisplay />
        <SectionPanel />
        {isMobile && <MobileSectionNav />}
        {!isMobile && <KeyboardShortcutsHint />}
        <DownloadCVButton />
        {!isMobile && <MiniMap />}
        <PlayPauseControl />
      </div>
    </>
  )
}

function App() {
  const { isLoaded } = useViewport()
  const [texturesReady, setTexturesReady] = useState(false)
  const { loading, progress, preloadAll } = useAppStore()

  useEffect(() => {
    if (isLoaded && !texturesReady && !loading) {
      preloadAll().then(() => setTexturesReady(true))
    }
  }, [isLoaded, texturesReady, loading, preloadAll])

  if (!isLoaded) {
    return <LoadingScreen message="Initializing..." />
  }

  if (!texturesReady) {
    return <LoadingScreen progress={progress} message="Loading textures..." />
  }

  return <MainView />
}

export default App
