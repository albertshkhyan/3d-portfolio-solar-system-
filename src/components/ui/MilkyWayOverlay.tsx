import { useAppStore } from '../../store'
import { CAMERA, Z_INDEX } from '../../config/animation'
import milkyWayUrl from '../../assets/milky_way.png'
import sunGlowUrl from '../../assets/sun.png'

/** Screen offset (%) for sun overlay relative to projected 3D position */
const SUN_OVERLAY_OFFSET_X = 2.5
const SUN_OVERLAY_OFFSET_Y = 1

/** Shift Milky Way image right (px) for better framing */
const MILKY_WAY_OFFSET_X = 110

/** Smoothstep for non-linear fade (0..1 over [e0, e1]) */
function smoothstep(e0: number, e1: number, x: number): number {
  const t = Math.max(0, Math.min(1, (x - e0) / (e1 - e0)))
  return t * t * (3 - 2 * t)
}

/** Opacity: 0 at threshold, 1 at view distance so Milky Way fades in gradually over the full zoom */
function getOverlayOpacity(distance: number): number {
  const start = CAMERA.MILKY_WAY_OVERLAY_THRESHOLD
  const end = CAMERA.MILKY_WAY_VIEW_DISTANCE
  return smoothstep(start, end, distance)
}

/** Scale: 0.95→1 from 120→200, then 1→MILKY_WAY_SCALE_MAX from 200→350 */
function getOverlayScale(distance: number): number {
  const start = CAMERA.MILKY_WAY_OVERLAY_THRESHOLD
  const mid = CAMERA.MILKY_WAY_VIEW_DISTANCE
  const end = CAMERA.MAX_DISTANCE
  if (distance <= mid) {
    const n = smoothstep(start, mid, distance)
    return CAMERA.MILKY_WAY_SCALE_MIN + (1 - CAMERA.MILKY_WAY_SCALE_MIN) * n
  }
  const n = smoothstep(mid, end, distance)
  return 1 + (CAMERA.MILKY_WAY_SCALE_MAX - 1) * n
}

/** Parallax multiplier: 1 up to 200, then 1→MILKY_WAY_PARALLAX_MAX_FACTOR from 200→350 */
function getParallaxFactor(distance: number): number {
  if (distance <= CAMERA.MILKY_WAY_VIEW_DISTANCE) return 1
  const n = smoothstep(CAMERA.MILKY_WAY_VIEW_DISTANCE, CAMERA.MAX_DISTANCE, distance)
  return 1 + (CAMERA.MILKY_WAY_PARALLAX_MAX_FACTOR - 1) * n
}

/** Blur (px): 0 up to 200, then 0→MILKY_WAY_BLUR_PX_MAX from 200→350 */
function getOverlayBlur(distance: number): number {
  if (distance <= CAMERA.MILKY_WAY_VIEW_DISTANCE) return 0
  return smoothstep(CAMERA.MILKY_WAY_VIEW_DISTANCE, CAMERA.MAX_DISTANCE, distance) * CAMERA.MILKY_WAY_BLUR_PX_MAX
}

export function MilkyWayOverlay() {
  const cameraDistance = useAppStore((state) => state.cameraDistance)
  const cameraAzimuth = useAppStore((state) => state.cameraAzimuth)
  const cameraPolar = useAppStore((state) => state.cameraPolar)
  const sunOverlayPosition = useAppStore((state) => state.sunOverlayPosition)
  const setZoomIntent = useAppStore((state) => state.setZoomIntent)

  const opacity = getOverlayOpacity(cameraDistance)
  const scale = getOverlayScale(cameraDistance)
  const parallaxFactor = getParallaxFactor(cameraDistance)
  const parallaxPx = CAMERA.MILKY_WAY_PARALLAX_PX * parallaxFactor
  const translateX = cameraAzimuth * parallaxPx
  const translateY = (cameraPolar - Math.PI / 2) * parallaxPx
  const blurPx = getOverlayBlur(cameraDistance)

  return (
    <div
      className="absolute inset-0 pointer-events-none transition-opacity duration-500 ease-out overflow-hidden"
      style={{
        zIndex: Z_INDEX.MILKY_WAY_OVERLAY,
        opacity,
      }}
      aria-hidden="true"
    >
      <div
        className="w-full h-full transition-transform duration-300 ease-out"
        style={{
          transform: `translate(${translateX + MILKY_WAY_OFFSET_X}px, ${translateY}px) scale(${scale})`,
          filter: blurPx > 0 ? `blur(${blurPx}px)` : undefined,
        }}
      >
        <img
          src={milkyWayUrl}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div
        className="absolute inset-0 pointer-events-none select-none"
        aria-hidden="true"
      >
        <button
          type="button"
          className="absolute flex flex-col items-center gap-1 pointer-events-auto cursor-pointer border-0 bg-transparent p-0 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-lg select-none"
          style={{
            left: `${sunOverlayPosition.x + SUN_OVERLAY_OFFSET_X}%`,
            top: `${sunOverlayPosition.y + SUN_OVERLAY_OFFSET_Y}%`,
            transform: 'translate(-50%, -50%)',
            visibility: sunOverlayPosition.visible ? 'visible' : 'hidden',
          }}
          onClick={() => setZoomIntent('reset')}
          aria-label="Go back to solar system view"
        >
          <span className="text-white/90 text-sm font-medium tracking-wider drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">
            Sun
          </span>
          <img
            src={sunGlowUrl}
            alt=""
            className="w-[min(18vw,180px)] h-auto object-contain pointer-events-none"
          />
        </button>
      </div>
    </div>
  )
}
