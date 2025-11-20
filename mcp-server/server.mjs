#!/usr/bin/env node
/**
 * Next Style Patterns MCP Server
 * Provides AI/LLM access to component registry via Model Context Protocol
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema
} from '@modelcontextprotocol/sdk/types.js'
import { decode as parseToon } from '@toon-format/toon'
import { readFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Load component registry
const REGISTRY_PATH = join(__dirname, '..', 'component-registry.toon')
let componentRegistry = null

function loadRegistry() {
  try {
    const toonContent = readFileSync(REGISTRY_PATH, 'utf-8')
    componentRegistry = parseToon(toonContent)
    console.error('✅ Loaded component registry from TOON format')
    return true
  } catch (error) {
    console.error('❌ Failed to load registry:', error.message)
    return false
  }
}

// Initialize registry on startup
loadRegistry()

// Create MCP server
const server = new Server(
  {
    name: 'next-style-patterns',
    version: '1.0.0'
  },
  {
    capabilities: {
      tools: {},
      resources: {}
    }
  }
)

// Define available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'search_components',
        description: 'Search for animation components using semantic tags, keywords, or categories. Returns matching components with full metadata.',
        inputSchema: {
          type: 'object',
          properties: {
            query: {
              type: 'string',
              description: 'Search query (e.g., "cyberpunk glitch", "aurora", "particle")'
            },
            category: {
              type: 'string',
              description: 'Filter by category (e.g., "animation", "gif")',
              enum: ['animation', 'gif']
            },
            minConfidence: {
              type: 'number',
              description: 'Minimum confidence score for use cases (0-1)',
              minimum: 0,
              maximum: 1
            }
          },
          required: ['query']
        }
      },
      {
        name: 'get_component',
        description: 'Get complete details for a specific component by ID',
        inputSchema: {
          type: 'object',
          properties: {
            componentId: {
              type: 'string',
              description: 'Component ID (e.g., "aurora-flow", "holographic-glitch")'
            }
          },
          required: ['componentId']
        }
      },
      {
        name: 'list_components',
        description: 'List all available components with basic information',
        inputSchema: {
          type: 'object',
          properties: {
            category: {
              type: 'string',
              description: 'Filter by category',
              enum: ['animation', 'gif']
            },
            includePresets: {
              type: 'boolean',
              description: 'Include preset configurations',
              default: false
            }
          }
        }
      },
      {
        name: 'get_gif_template',
        description: 'Get GIF template specifications for social media platforms',
        inputSchema: {
          type: 'object',
          properties: {
            platform: {
              type: 'string',
              description: 'Platform name',
              enum: ['twitter', 'instagram', 'linkedin']
            }
          },
          required: ['platform']
        }
      },
      {
        name: 'recommend_component',
        description: 'Get component recommendations based on use case description',
        inputSchema: {
          type: 'object',
          properties: {
            useCase: {
              type: 'string',
              description: 'Description of the use case (e.g., "hero section background", "gaming website")'
            },
            minConfidence: {
              type: 'number',
              description: 'Minimum confidence threshold',
              default: 0.8
            }
          },
          required: ['useCase']
        }
      }
    ]
  }
})

// Define available resources
server.setRequestHandler(ListResourcesRequestSchema, async () => {
  if (!componentRegistry) {
    return { resources: [] }
  }

  const resources = [
    {
      uri: 'toon://registry/full',
      name: 'Complete Component Registry',
      description: 'Full component registry in TOON format (33.6% smaller than JSON)',
      mimeType: 'text/plain'
    },
    {
      uri: 'toon://registry/statistics',
      name: 'Registry Statistics',
      description: 'High-level statistics about the component registry',
      mimeType: 'application/json'
    }
  ]

  // Add individual component resources
  if (componentRegistry.components) {
    for (const [id, component] of Object.entries(componentRegistry.components)) {
      resources.push({
        uri: `toon://component/${id}`,
        name: component.name,
        description: component.description,
        mimeType: 'application/json'
      })
    }
  }

  return { resources }
})

// Handle resource reads
server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const uri = request.params.uri

  if (uri === 'toon://registry/full') {
    const toonContent = readFileSync(REGISTRY_PATH, 'utf-8')
    return {
      contents: [
        {
          uri,
          mimeType: 'text/plain',
          text: toonContent
        }
      ]
    }
  }

  if (uri === 'toon://registry/statistics') {
    const stats = componentRegistry.statistics || {}
    return {
      contents: [
        {
          uri,
          mimeType: 'application/json',
          text: JSON.stringify(stats, null, 2)
        }
      ]
    }
  }

  if (uri.startsWith('toon://component/')) {
    const componentId = uri.replace('toon://component/', '')
    const component = componentRegistry.components?.[componentId]

    if (!component) {
      throw new Error(`Component not found: ${componentId}`)
    }

    return {
      contents: [
        {
          uri,
          mimeType: 'application/json',
          text: JSON.stringify(component, null, 2)
        }
      ]
    }
  }

  throw new Error(`Unknown resource: ${uri}`)
})

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params

  if (!componentRegistry) {
    throw new Error('Component registry not loaded')
  }

  switch (name) {
    case 'search_components': {
      const { query, category, minConfidence = 0 } = args
      const results = []

      const searchTerms = query.toLowerCase().split(/\s+/)

      for (const [id, component] of Object.entries(componentRegistry.components || {})) {
        if (category && component.category !== category) continue

        let score = 0
        const matches = []

        // Search in semantic tags
        if (component.semanticTags) {
          for (const tag of component.semanticTags) {
            for (const term of searchTerms) {
              if (tag.toLowerCase().includes(term)) {
                score += 2
                matches.push(`tag: ${tag}`)
              }
            }
          }
        }

        // Search in name and description
        if (component.name.toLowerCase().includes(query.toLowerCase())) {
          score += 3
          matches.push(`name: ${component.name}`)
        }
        if (component.description.toLowerCase().includes(query.toLowerCase())) {
          score += 1
          matches.push('description')
        }

        // Check use cases
        if (component.useCases) {
          for (const useCase of component.useCases) {
            if (useCase.confidence >= minConfidence) {
              if (useCase.name.toLowerCase().includes(query.toLowerCase())) {
                score += 2
                matches.push(`use case: ${useCase.name}`)
              }
            }
          }
        }

        if (score > 0) {
          results.push({
            id,
            name: component.name,
            category: component.category,
            score,
            matches: [...new Set(matches)],
            component
          })
        }
      }

      // Sort by score
      results.sort((a, b) => b.score - a.score)

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              query,
              resultsCount: results.length,
              results: results.map(r => ({
                id: r.id,
                name: r.name,
                category: r.category,
                score: r.score,
                matches: r.matches,
                description: r.component.description,
                frameworks: r.component.frameworks,
                presets: Object.keys(r.component.presets || {})
              }))
            }, null, 2)
          }
        ]
      }
    }

    case 'get_component': {
      const { componentId } = args
      const component = componentRegistry.components?.[componentId]

      if (!component) {
        throw new Error(`Component not found: ${componentId}`)
      }

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(component, null, 2)
          }
        ]
      }
    }

    case 'list_components': {
      const { category, includePresets = false } = args
      const components = []

      for (const [id, component] of Object.entries(componentRegistry.components || {})) {
        if (category && component.category !== category) continue

        const entry = {
          id,
          name: component.name,
          category: component.category,
          description: component.description,
          frameworks: component.frameworks,
          performance: component.performance
        }

        if (includePresets && component.presets) {
          entry.presets = component.presets
        }

        components.push(entry)
      }

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              count: components.length,
              components
            }, null, 2)
          }
        ]
      }
    }

    case 'get_gif_template': {
      const { platform } = args
      const templates = componentRegistry.gifTemplates || {}

      const template = Object.values(templates).find(
        t => t.platform === platform
      )

      if (!template) {
        throw new Error(`No GIF template found for platform: ${platform}`)
      }

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(template, null, 2)
          }
        ]
      }
    }

    case 'recommend_component': {
      const { useCase, minConfidence = 0.8 } = args
      const recommendations = []

      for (const [id, component] of Object.entries(componentRegistry.components || {})) {
        if (!component.useCases) continue

        for (const uc of component.useCases) {
          const useCaseLower = uc.name.toLowerCase()
          const queryLower = useCase.toLowerCase()

          if (useCaseLower.includes(queryLower) && uc.confidence >= minConfidence) {
            recommendations.push({
              id,
              name: component.name,
              category: component.category,
              description: component.description,
              useCase: uc.name,
              confidence: uc.confidence,
              presets: Object.keys(component.presets || {}),
              aiPromptExamples: component.aiPromptExamples
            })
          }
        }
      }

      // Sort by confidence
      recommendations.sort((a, b) => b.confidence - a.confidence)

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              useCase,
              recommendationCount: recommendations.length,
              recommendations
            }, null, 2)
          }
        ]
      }
    }

    default:
      throw new Error(`Unknown tool: ${name}`)
  }
})

// Start server
async function main() {
  const transport = new StdioServerTransport()
  await server.connect(transport)
  console.error('🚀 Next Style Patterns MCP Server running')
  console.error('📊 Registry loaded with', Object.keys(componentRegistry?.components || {}).length, 'components')
}

main().catch(error => {
  console.error('❌ Server error:', error)
  process.exit(1)
})
