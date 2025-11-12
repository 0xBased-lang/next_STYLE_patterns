import type {
  ComponentCategory,
  ComponentMeta,
  ComponentRegistryItem,
  RegistryIndex,
} from '@/types/registry'

/**
 * Component Registry - Central system for managing all UI components
 */

const registryItems = new Map<string, ComponentRegistryItem>()

/**
 * Register a component in the registry
 */
export function registerComponent(item: ComponentRegistryItem): void {
  registryItems.set(item.meta.id, item)
}

/**
 * Get a component from the registry by ID
 */
export function getComponent(id: string): ComponentRegistryItem | undefined {
  return registryItems.get(id)
}

/**
 * Get all components from the registry
 */
export function getAllComponents(): ComponentRegistryItem[] {
  return Array.from(registryItems.values())
}

/**
 * Get components by category
 */
export function getComponentsByCategory(
  category: ComponentCategory
): ComponentRegistryItem[] {
  return getAllComponents().filter((item) => item.meta.category === category)
}

/**
 * Search components by query
 */
export function searchComponents(query: string): ComponentRegistryItem[] {
  const lowerQuery = query.toLowerCase()

  return getAllComponents().filter((item) => {
    const { name, description, tags, category } = item.meta

    return (
      name.toLowerCase().includes(lowerQuery) ||
      description.toLowerCase().includes(lowerQuery) ||
      tags.some((tag) => tag.toLowerCase().includes(lowerQuery)) ||
      category.toLowerCase().includes(lowerQuery)
    )
  })
}

/**
 * Get registry index with metadata
 */
export function getRegistryIndex(): RegistryIndex {
  const components = getAllComponents()

  const categoriesCount = components.reduce(
    (acc, item) => {
      acc[item.meta.category] = (acc[item.meta.category] || 0) + 1
      return acc
    },
    {} as Record<ComponentCategory, number>
  )

  return {
    components: Object.fromEntries(
      components.map((item) => [item.meta.id, item])
    ),
    categories: categoriesCount,
    total: components.length,
    lastUpdated: new Date().toISOString(),
  }
}

/**
 * Batch register components
 */
export function registerComponents(items: ComponentRegistryItem[]): void {
  items.forEach((item) => registerComponent(item))
}

/**
 * Clear the registry (useful for testing)
 */
export function clearRegistry(): void {
  registryItems.clear()
}

/**
 * Check if component exists
 */
export function hasComponent(id: string): boolean {
  return registryItems.has(id)
}

/**
 * Get component count
 */
export function getComponentCount(): number {
  return registryItems.size
}

/**
 * Get all component IDs
 */
export function getComponentIds(): string[] {
  return Array.from(registryItems.keys())
}

/**
 * Get all categories
 */
export function getAllCategories(): ComponentCategory[] {
  const categories = new Set<ComponentCategory>()

  getAllComponents().forEach((item) => {
    categories.add(item.meta.category)
  })

  return Array.from(categories)
}

/**
 * Get all tags
 */
export function getAllTags(): string[] {
  const tags = new Set<string>()

  getAllComponents().forEach((item) => {
    item.meta.tags.forEach((tag) => tags.add(tag))
  })

  return Array.from(tags).sort()
}

/**
 * Helper to create component metadata
 */
export function createComponentMeta(
  partial: Omit<ComponentMeta, 'version'>
): ComponentMeta {
  return {
    ...partial,
    version: '1.0.0',
  }
}

/**
 * Export for use in other modules
 */
export { registryItems }
