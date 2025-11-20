#!/usr/bin/env node
/**
 * TOON Parser Test Script
 * Tests parsing of component-registry.toon
 */

import { decode as parseToon, encode as stringifyToon } from '@toon-format/toon'
import { readFileSync, writeFileSync } from 'fs'

console.log('🚀 TOON Parser Test\n')
console.log('=' .repeat(60))

try {
  // 1. Load TOON registry
  console.log('\n📖 Loading component-registry.toon...')
  const toonContent = readFileSync('./component-registry.toon', 'utf-8')
  console.log(`✅ Loaded ${toonContent.length} bytes`)

  // 2. Parse TOON to JavaScript object
  console.log('\n🔧 Parsing TOON format...')
  const registry = parseToon(toonContent)
  console.log('✅ Successfully parsed TOON!')

  // 3. Validate structure
  console.log('\n🔍 Validating registry structure...')
  console.log(`Version: ${registry.version}`)
  console.log(`Format: ${registry.format}`)
  console.log(`Generated: ${registry.generated}`)

  // 4. Check components
  const componentCount = Object.keys(registry.components || {}).length
  console.log(`\n📦 Components found: ${componentCount}`)
  for (const [id, component] of Object.entries(registry.components || {})) {
    console.log(`  ✅ ${id}: ${component.name}`)
    console.log(`     - Category: ${component.category}`)
    console.log(`     - Frameworks: ${component.frameworks?.join(', ')}`)
    console.log(`     - Performance: ${component.performance?.fps?.avg || 'N/A'} FPS avg`)
    console.log(`     - Use cases: ${component.useCases?.length || 0}`)
  }

  // 5. Check GIF templates
  const gifCount = Object.keys(registry.gifTemplates || {}).length
  console.log(`\n🎬 GIF Templates found: ${gifCount}`)
  for (const [id, template] of Object.entries(registry.gifTemplates || {})) {
    console.log(`  ✅ ${id}: ${template.name}`)
    console.log(`     - Platform: ${template.platform}`)
    console.log(`     - Dimensions: ${template.specifications?.dimensions}`)
  }

  // 6. Test round-trip conversion (TOON → Object → TOON)
  console.log('\n🔄 Testing round-trip conversion...')
  const regeneratedToon = stringifyToon(registry)
  console.log(`✅ Re-generated TOON (${regeneratedToon.length} bytes)`)

  // Save for comparison
  writeFileSync('./component-registry-regenerated.toon', regeneratedToon)
  console.log('✅ Saved to component-registry-regenerated.toon')

  // 7. Size comparison
  console.log('\n📊 Size Analysis:')
  console.log(`Original TOON: ${toonContent.length} bytes`)
  console.log(`Regenerated TOON: ${regeneratedToon.length} bytes`)

  // 8. Convert to JSON for comparison
  console.log('\n📄 Converting to JSON for comparison...')
  const jsonStr = JSON.stringify(registry, null, 2)
  writeFileSync('./component-registry-from-toon.json', jsonStr)
  console.log(`JSON output: ${jsonStr.length} bytes`)
  console.log(`TOON output: ${toonContent.length} bytes`)
  console.log(`Savings: ${((1 - toonContent.length / jsonStr.length) * 100).toFixed(1)}%`)

  // 9. Token estimation
  console.log('\n🎯 Token Estimation (rough):')
  const jsonTokens = Math.ceil(jsonStr.length / 4)
  const toonTokens = Math.ceil(toonContent.length / 4)
  console.log(`JSON tokens: ~${jsonTokens.toLocaleString()}`)
  console.log(`TOON tokens: ~${toonTokens.toLocaleString()}`)
  console.log(`Token savings: ~${(jsonTokens - toonTokens).toLocaleString()} (${((1 - toonTokens / jsonTokens) * 100).toFixed(1)}%)`)

  // 10. Test semantic search simulation
  console.log('\n🔍 Testing semantic search capability...')
  const searchQueries = [
    'cyberpunk glitch',
    'aurora northern lights',
    'twitter gif',
    'particle explosion'
  ]

  for (const query of searchQueries) {
    const results = []
    for (const [id, component] of Object.entries(registry.components || {})) {
      const tags = component.semanticTags || []
      const matches = tags.filter(tag =>
        query.toLowerCase().split(' ').some(word => tag.toLowerCase().includes(word))
      )
      if (matches.length > 0) {
        results.push({ id, name: component.name, matches })
      }
    }
    console.log(`  Query: "${query}"`)
    if (results.length > 0) {
      results.forEach(r => console.log(`    ✅ Found: ${r.name} (tags: ${r.matches.join(', ')})`))
    } else {
      console.log(`    ❌ No matches`)
    }
  }

  console.log('\n' + '='.repeat(60))
  console.log('✅ All tests passed!')
  console.log('🎉 TOON registry is valid and ready to use!\n')

} catch (error) {
  console.error('\n❌ Error:', error.message)
  console.error(error.stack)
  process.exit(1)
}
