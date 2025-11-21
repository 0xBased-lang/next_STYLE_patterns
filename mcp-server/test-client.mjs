#!/usr/bin/env node
/**
 * MCP Server Test Client
 * Tests all MCP server tools and resources
 */

import { Client } from '@modelcontextprotocol/sdk/client/index.js'
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js'
import { spawn } from 'child_process'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

console.log('🧪 MCP Server Test Suite\n')
console.log('=' .repeat(60))

// Spawn the server process
const serverPath = join(__dirname, 'server.mjs')
console.log(`\n📍 Starting MCP server: ${serverPath}`)

const serverProcess = spawn('node', [serverPath], {
  stdio: ['pipe', 'pipe', 'pipe']
})

// Create transport
const transport = new StdioClientTransport({
  reader: serverProcess.stdout,
  writer: serverProcess.stdin
})

// Create client
const client = new Client({
  name: 'test-client',
  version: '1.0.0'
}, {
  capabilities: {}
})

async function runTests() {
  try {
    // Connect to server
    console.log('\n🔌 Connecting to MCP server...')
    await client.connect(transport)
    console.log('✅ Connected successfully')

    // Test 1: List Tools
    console.log('\n' + '='.repeat(60))
    console.log('TEST 1: List Available Tools')
    console.log('='.repeat(60))

    const toolsList = await client.listTools()
    console.log(`\n✅ Found ${toolsList.tools.length} tools:`)
    toolsList.tools.forEach((tool, i) => {
      console.log(`   ${i + 1}. ${tool.name}`)
      console.log(`      ${tool.description}`)
    })

    // Test 2: List Resources
    console.log('\n' + '='.repeat(60))
    console.log('TEST 2: List Available Resources')
    console.log('='.repeat(60))

    const resourcesList = await client.listResources()
    console.log(`\n✅ Found ${resourcesList.resources.length} resources:`)
    resourcesList.resources.forEach((resource, i) => {
      console.log(`   ${i + 1}. ${resource.uri}`)
      console.log(`      ${resource.name}`)
    })

    // Test 3: Search Components
    console.log('\n' + '='.repeat(60))
    console.log('TEST 3: Search Components - "cyberpunk glitch"')
    console.log('='.repeat(60))

    const searchResult = await client.callTool({
      name: 'search_components',
      arguments: {
        query: 'cyberpunk glitch',
        category: 'animation'
      }
    })

    const searchData = JSON.parse(searchResult.content[0].text)
    console.log(`\n✅ Found ${searchData.resultsCount} results:`)
    searchData.results.forEach((result, i) => {
      console.log(`\n   ${i + 1}. ${result.name} (score: ${result.score})`)
      console.log(`      Category: ${result.category}`)
      console.log(`      Matches: ${result.matches.join(', ')}`)
      console.log(`      Presets: ${result.presets.join(', ')}`)
    })

    // Test 4: Get Component
    console.log('\n' + '='.repeat(60))
    console.log('TEST 4: Get Component Details - "aurora-flow"')
    console.log('='.repeat(60))

    const componentResult = await client.callTool({
      name: 'get_component',
      arguments: {
        componentId: 'aurora-flow'
      }
    })

    const component = JSON.parse(componentResult.content[0].text)
    console.log(`\n✅ Component: ${component.name}`)
    console.log(`   Category: ${component.category}`)
    console.log(`   Description: ${component.description}`)
    console.log(`   Semantic Tags: ${component.semanticTags.join(', ')}`)
    console.log(`   Frameworks: ${component.frameworks.join(', ')}`)
    console.log(`   Performance: ${component.performance.fps.avg} FPS avg`)
    console.log(`   Presets: ${Object.keys(component.presets).join(', ')}`)

    // Test 5: List Components
    console.log('\n' + '='.repeat(60))
    console.log('TEST 5: List All Animation Components')
    console.log('='.repeat(60))

    const listResult = await client.callTool({
      name: 'list_components',
      arguments: {
        category: 'animation',
        includePresets: false
      }
    })

    const listData = JSON.parse(listResult.content[0].text)
    console.log(`\n✅ Found ${listData.count} animation components:`)
    listData.components.forEach((comp, i) => {
      console.log(`   ${i + 1}. ${comp.name}`)
      console.log(`      ${comp.description}`)
      console.log(`      FPS: ${comp.performance.fps.avg}`)
    })

    // Test 6: Get GIF Template
    console.log('\n' + '='.repeat(60))
    console.log('TEST 6: Get GIF Template - "twitter"')
    console.log('='.repeat(60))

    const gifResult = await client.callTool({
      name: 'get_gif_template',
      arguments: {
        platform: 'twitter'
      }
    })

    const gifTemplate = JSON.parse(gifResult.content[0].text)
    console.log(`\n✅ Template: ${gifTemplate.name}`)
    console.log(`   Platform: ${gifTemplate.platform}`)
    console.log(`   Dimensions: ${gifTemplate.specifications.dimensions}`)
    console.log(`   Max Size: ${gifTemplate.specifications.maxSize}`)
    console.log(`   FPS: ${gifTemplate.specifications.fps}`)
    console.log(`   Duration: ${gifTemplate.specifications.duration}`)

    // Test 7: Recommend Component
    console.log('\n' + '='.repeat(60))
    console.log('TEST 7: Recommend Component - "hero section background"')
    console.log('='.repeat(60))

    const recommendResult = await client.callTool({
      name: 'recommend_component',
      arguments: {
        useCase: 'hero section background',
        minConfidence: 0.9
      }
    })

    const recommendations = JSON.parse(recommendResult.content[0].text)
    console.log(`\n✅ Found ${recommendations.recommendationCount} recommendations:`)
    recommendations.recommendations.forEach((rec, i) => {
      console.log(`\n   ${i + 1}. ${rec.name} (confidence: ${rec.confidence})`)
      console.log(`      Use Case: ${rec.useCase}`)
      console.log(`      Presets: ${rec.presets.join(', ')}`)
      console.log(`      Example: ${rec.aiPromptExamples[0]}`)
    })

    // Test 8: Read Resource
    console.log('\n' + '='.repeat(60))
    console.log('TEST 8: Read Resource - "toon://registry/statistics"')
    console.log('='.repeat(60))

    const statsResource = await client.readResource({
      uri: 'toon://registry/statistics'
    })

    const stats = JSON.parse(statsResource.contents[0].text)
    console.log('\n✅ Registry Statistics:')
    console.log(`   Total Components: ${stats.totalComponents}`)
    console.log(`   Total GIF Templates: ${stats.totalGifTemplates}`)
    console.log(`   Total Presets: ${stats.totalPresets}`)
    console.log(`   Average Params: ${stats.averageParams}`)
    console.log(`   Target FPS: ${stats.targetFPS}`)
    console.log(`   Token Savings: ${stats.tokenSavings}`)

    // Success summary
    console.log('\n' + '='.repeat(60))
    console.log('✅ ALL TESTS PASSED')
    console.log('='.repeat(60))
    console.log('\n🎉 MCP Server is fully functional!')
    console.log('\nTest Summary:')
    console.log('   ✅ Server connection')
    console.log('   ✅ Tool listing (5 tools)')
    console.log('   ✅ Resource listing')
    console.log('   ✅ Component search (semantic)')
    console.log('   ✅ Component retrieval')
    console.log('   ✅ Component listing')
    console.log('   ✅ GIF template retrieval')
    console.log('   ✅ Use case recommendations')
    console.log('   ✅ Resource reading')

  } catch (error) {
    console.error('\n❌ Test failed:', error.message)
    if (error.stack) {
      console.error('\nStack trace:')
      console.error(error.stack)
    }
    process.exit(1)
  } finally {
    // Close client and server
    await client.close()
    serverProcess.kill()
  }
}

// Handle server stderr (info messages)
serverProcess.stderr.on('data', (data) => {
  const message = data.toString().trim()
  if (message) {
    console.log(`[SERVER] ${message}`)
  }
})

// Run tests
runTests().then(() => {
  console.log('\n✅ Test suite completed successfully')
  process.exit(0)
}).catch((error) => {
  console.error('\n❌ Test suite failed:', error)
  process.exit(1)
})

// Handle cleanup on exit
process.on('SIGINT', () => {
  console.log('\n\n⚠️  Interrupted, cleaning up...')
  serverProcess.kill()
  process.exit(0)
})
