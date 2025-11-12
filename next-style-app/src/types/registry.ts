export type ComponentCategory =
  | 'ui'
  | 'layout'
  | 'navigation'
  | 'form'
  | 'data-display'
  | 'feedback'
  | 'overlay'
  | 'motion'
  | 'utility'

export type AnimationPreset =
  | 'fade'
  | 'slide'
  | 'zoom'
  | 'bounce'
  | 'spin'
  | 'flip'
  | 'scale'
  | 'shake'

export interface ComponentMeta {
  /** Unique component identifier */
  id: string
  /** Display name */
  name: string
  /** Component description */
  description: string
  /** Component category */
  category: ComponentCategory
  /** Component tags for search */
  tags: string[]
  /** Whether component is experimental */
  experimental?: boolean
  /** Component version */
  version: string
  /** Dependencies required */
  dependencies?: string[]
  /** Related components */
  relatedComponents?: string[]
}

export interface ComponentFile {
  /** File path relative to src */
  path: string
  /** File content */
  content: string
  /** File type */
  type: 'component' | 'style' | 'utils' | 'types'
  /** Target location for file */
  target?: string
}

export interface ComponentExample {
  /** Example name */
  name: string
  /** Example description */
  description?: string
  /** Example code */
  code: string
  /** Preview component (optional) */
  preview?: React.ComponentType
}

export interface ComponentRegistryItem {
  /** Component metadata */
  meta: ComponentMeta
  /** Component files */
  files: ComponentFile[]
  /** Usage examples */
  examples?: ComponentExample[]
  /** Installation instructions */
  installCommand?: string
  /** Component source code for display */
  source?: string
}

export interface RegistryIndex {
  /** All registered components */
  components: Record<string, ComponentRegistryItem>
  /** Component categories with counts */
  categories: Record<ComponentCategory, number>
  /** Total components */
  total: number
  /** Last updated timestamp */
  lastUpdated: string
}

export interface AnimationConfig {
  /** Animation name */
  name: string
  /** Animation description */
  description: string
  /** Animation preset type */
  preset: AnimationPreset
  /** Animation duration in seconds */
  duration: number
  /** Animation easing function */
  easing: string
  /** Animation delay in seconds */
  delay?: number
  /** Whether animation repeats */
  repeat?: boolean | number
  /** Animation direction */
  direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse'
}
