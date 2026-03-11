import { useState, useRef, useCallback, useEffect } from 'react'
import { motion, AnimatePresence, useMotionValue, animate, useDragControls } from 'framer-motion'
import { ChevronUp, ChevronDown } from 'lucide-react'
import { useAppStore } from '../../store'
import { useViewport } from '../../hooks/useViewport'
import {
  AboutPanel,
  SkillsPanel,
  ExperiencePanel,
  ProjectsPanel,
  ArchitecturePanel,
  DevOpsPanel,
  ContactPanel,
  panelVariants,
  panelVariantsMobile,
  SECTION_NAMES,
  PANEL_TOP_COLLAPSED,
  PANEL_TOP_EXPANDED,
} from '../panels'
import type { SectionId } from '../../types'

const PANELS: Record<Exclude<SectionId, 'overview'>, React.ComponentType> = {
  about: AboutPanel,
  skills: SkillsPanel,
  experience: ExperiencePanel,
  projects: ProjectsPanel,
  architecture: ArchitecturePanel,
  devops: DevOpsPanel,
  contact: ContactPanel,
}

const SHEET_TRANSITION = { type: 'spring' as const, damping: 28, stiffness: 200 }

/** Drag thresholds (px) for expand / collapse / close */
const DRAG = {
  expandThreshold: 60,
  collapseThreshold: 60,
  closeThreshold: 100,
} as const

export function SectionPanel() {
  const activeSection = useAppStore((state) => state.activeSection)
  const goBack = useAppStore((state) => state.goBack)
  const { isMobile } = useViewport()
  const [expanded, setExpanded] = useState(false)
  const dragY = useMotionValue(0)
  const dragControls = useDragControls()
  const isDragging = useRef(false)

  const handleDragEnd = useCallback(
    (_: MouseEvent | TouchEvent | PointerEvent, info: { offset: { y: number }; velocity: { y: number } }) => {
      const offsetY = info.offset.y
      const velocityY = info.velocity.y

      if (offsetY > DRAG.closeThreshold || velocityY > 500) {
        if (expanded) {
          setExpanded(false)
        } else {
          goBack()
        }
      } else if (offsetY > DRAG.collapseThreshold && expanded) {
        setExpanded(false)
      } else if (offsetY < -DRAG.expandThreshold && !expanded) {
        setExpanded(true)
      }

      animate(dragY, 0, { type: 'spring', damping: 28, stiffness: 300 })
      setTimeout(() => {
        isDragging.current = false
      }, 0)
    },
    [expanded, goBack, dragY]
  )

  useEffect(() => {
    if (!isMobile) return
    isDragging.current = false
  }, [activeSection, isMobile])

  if (activeSection === 'overview') return null

  const PanelComponent = PANELS[activeSection]

  return (
    <AnimatePresence mode="wait">
      <motion.aside
        key={activeSection}
        variants={isMobile ? panelVariantsMobile : panelVariants}
        initial={isMobile ? { y: '100%', opacity: 0, top: PANEL_TOP_COLLAPSED } : 'hidden'}
        animate={
          isMobile
            ? {
                y: 0,
                opacity: 1,
                top: expanded ? PANEL_TOP_EXPANDED : PANEL_TOP_COLLAPSED,
              }
            : 'visible'
        }
        transition={isMobile ? SHEET_TRANSITION : undefined}
        exit="exit"
        role="complementary"
        aria-label={SECTION_NAMES[activeSection] || activeSection}
        className={
          isMobile
            ? 'fixed inset-x-0 bottom-0 z-40 rounded-t-2xl overflow-hidden flex flex-col bg-zinc-900/95 backdrop-blur-xl border-t border-white/10'
            : 'fixed right-8 top-1/2 -translate-y-1/2 z-40'
        }
        drag={isMobile ? 'y' : false}
        dragControls={isMobile ? dragControls : undefined}
        dragConstraints={isMobile ? { top: expanded ? 0 : -200, bottom: 300 } : undefined}
        dragElastic={isMobile ? { top: 0.15, bottom: 0.4 } : undefined}
        style={isMobile ? { y: dragY } : undefined}
        onDrag={isMobile ? (_, info) => dragY.set(info.offset.y) : undefined}
        onDragStart={() => {
          isDragging.current = true
        }}
        onDragEnd={isMobile ? handleDragEnd : undefined}
      >
        {isMobile && (
          <motion.div
            className="flex-shrink-0 sticky top-0 z-10 flex flex-col items-center pt-3 pb-2 px-4 bg-zinc-900/95 backdrop-blur-md border-b border-white/5 touch-none"
            onPointerDown={(e) => dragControls.start(e)}
            aria-hidden="true"
          >
            <div className="w-10 h-1 rounded-full bg-white/30 mb-2" aria-hidden="true" />
            <button
              type="button"
              onClick={() => {
                if (!isDragging.current) setExpanded((e) => !e)
              }}
              aria-label={expanded ? 'Collapse panel' : 'Expand panel'}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors touch-manipulation focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900"
            >
              {expanded ? (
                <ChevronDown className="w-5 h-5 text-white" aria-hidden="true" />
              ) : (
                <ChevronUp className="w-5 h-5 text-white" aria-hidden="true" />
              )}
            </button>
          </motion.div>
        )}
        <div
          className={
            isMobile
              ? 'flex-1 overflow-y-auto overscroll-contain pb-36 min-h-0'
              : undefined
          }
        >
          <PanelComponent />
        </div>
      </motion.aside>
    </AnimatePresence>
  )
}
