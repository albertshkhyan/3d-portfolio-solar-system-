export const ANIMATION = {
  CAMERA_TRANSITION_MS: 1500,
  /** Duration (seconds) to lerp camera back to overview when user clicks "Solar system" */
  RESET_ANIMATION_DURATION: 0.8,
  LERP_FACTOR: 0.05,
  ORBIT_SPEED_MULTIPLIER: 0.3,
  HOVER_SCALE: 1.15,
  HOVER_LERP_SPEED: 8,
  /** Kepler-style: orbitSpeed = KEPLER_ORBIT_K / sqrt(distance). Tuned so Earth (distance 8) ≈ 0.25. */
  KEPLER_ORBIT_K: 0.25 * Math.sqrt(8),
  /** Star field parallax: rotation factor per radian of camera angle (distant-dome feel) */
  STAR_FIELD_PARALLAX_FACTOR: 0.12,
} as const

export const Z_INDEX = {
  CANVAS: 0,
  /** 2D Milky Way overlay (above canvas, below UI) */
  MILKY_WAY_OVERLAY: 5,
  BACKGROUND: 10,
  UI_BASE: 30,
  PANEL: 40,
  CONTROLS: 50,
  MODAL: 60,
  TOOLTIP: 100,
} as const

export const MINIMAP = {
  SIZE: 160,
  MAX_DISTANCE: 24,
  UPDATE_INTERVAL_MS: 50,
} as const

export const CAMERA = {
  OVERVIEW_POSITION: [30, 25, 30] as const,
  OVERVIEW_TARGET: [0, 0, 0] as const,
  FOV: 60,
  NEAR: 0.1,
  FAR: 1000,
  MIN_DISTANCE: 5,
  MAX_DISTANCE: 350,
  /** When camera distance exceeds this, start fading in the 2D Milky Way overlay */
  MILKY_WAY_OVERLAY_THRESHOLD: 120,
  /** Distance range over which overlay fades from 0 to 1 (threshold to threshold + range) */
  MILKY_WAY_OVERLAY_FADE_RANGE: 60,
  /** Camera distance for "View Milky Way" (overlay fully visible; max zoom) */
  MILKY_WAY_VIEW_DISTANCE: 350,
  /** Parallax: max overlay shift in px per radian of camera angle */
  MILKY_WAY_PARALLAX_PX: 18,
  /** Parallax multiplier at max zoom (350): 1 at 200 → this at 350 */
  MILKY_WAY_PARALLAX_MAX_FACTOR: 1.2,
  /** Overlay scale at fade start (120); grows to 1 by MILKY_WAY_VIEW_DISTANCE */
  MILKY_WAY_SCALE_MIN: 0.95,
  /** Overlay scale at max zoom (350); 1 at 200 → this at 350 */
  MILKY_WAY_SCALE_MAX: 1.1,
  /** Blur (px) at max zoom (350); 0 at 200 → this at 350 */
  MILKY_WAY_BLUR_PX_MAX: 1,
  /** Base lerp factor for smooth zoom-out to Milky Way */
  MILKY_WAY_ZOOM_LERP: 0.045,
  /** Distance scale for zoom speed (farther = faster zoom-out) */
  MILKY_WAY_ZOOM_DISTANCE_SCALE: 200,
  /** Multiply distance by this when zooming in/out via buttons */
  DOLLY_FACTOR: 1.2,
  MIN_POLAR_ANGLE: Math.PI / 8,
  MAX_POLAR_ANGLE: Math.PI / 1.8,
  DAMPING_FACTOR: 0.08,
} as const

/** Fog tuned by camera distance: denser when zoomed in, relaxed when zoomed out toward Milky Way */
export const FOG = {
  /** Zoomed in (distance < FOG_DENSE_UNTIL): dense "in space" fog */
  DENSE_NEAR: 35,
  DENSE_FAR: 95,
  /** Zoomed out (distance > FOG_RELAXED_FROM): relaxed so scene fades into overlay */
  RELAXED_NEAR: 50,
  RELAXED_FAR: 320,
  /** Distance below which fog is fully dense */
  DENSE_UNTIL: 100,
  /** Distance above which fog is fully relaxed; between DENSE_UNTIL and this we lerp */
  RELAXED_FROM: 120,
} as const
