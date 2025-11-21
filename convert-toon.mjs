#!/usr/bin/env node
/**
 * TOON Conversion Utilities
 * Converts between JSON and TOON formats with validation
 */

import { decode as parseToon, encode as stringifyToon } from '@toon-format/toon'
import { readFileSync, writeFileSync, existsSync } from 'fs'
import { join, extname, basename } from 'path'

const COMMANDS = {
  'json-to-toon': 'Convert JSON file to TOON format',
  'toon-to-json': 'Convert TOON file to JSON format',
  'validate-toon': 'Validate TOON file syntax and structure',
  'compare': 'Compare file sizes and token counts between formats'
}

function showHelp() {
  console.log('TOON Conversion Utilities\n')
  console.log('Usage: node convert-toon.mjs <command> <input-file> [output-file]\n')
  console.log('Commands:')
  for (const [cmd, desc] of Object.entries(COMMANDS)) {
    console.log(`  ${cmd.padEnd(15)} - ${desc}`)
  }
  console.log('\nExamples:')
  console.log('  node convert-toon.mjs json-to-toon data.json data.toon')
  console.log('  node convert-toon.mjs toon-to-json data.toon data.json')
  console.log('  node convert-toon.mjs validate-toon component-registry.toon')
  console.log('  node convert-toon.mjs compare data.json data.toon')
  process.exit(0)
}

function estimateTokens(text) {
  // Rough estimation: ~4 characters per token
  return Math.ceil(text.length / 4)
}

function validateComponentRegistry(data) {
  const errors = []
  const warnings = []

  // Check required top-level fields
  if (!data.version) errors.push('Missing required field: version')
  if (!data.format) errors.push('Missing required field: format')
  if (!data.components) errors.push('Missing required field: components')

  // Validate components
  if (data.components) {
    for (const [id, component] of Object.entries(data.components)) {
      const path = `components.${id}`

      // Required fields
      if (!component.id) errors.push(`${path}: Missing required field 'id'`)
      if (!component.name) errors.push(`${path}: Missing required field 'name'`)
      if (!component.category) errors.push(`${path}: Missing required field 'category'`)

      // Validate semantic tags
      if (component.semanticTags) {
        if (!Array.isArray(component.semanticTags)) {
          errors.push(`${path}.semanticTags: Must be an array`)
        } else if (component.semanticTags.length === 0) {
          warnings.push(`${path}.semanticTags: Empty array`)
        }
      } else {
        warnings.push(`${path}: Missing semanticTags (recommended for AI discovery)`)
      }

      // Validate use cases
      if (component.useCases) {
        if (!Array.isArray(component.useCases)) {
          errors.push(`${path}.useCases: Must be an array`)
        } else {
          component.useCases.forEach((useCase, i) => {
            if (!useCase.name) errors.push(`${path}.useCases[${i}]: Missing 'name'`)
            if (useCase.confidence !== undefined) {
              if (typeof useCase.confidence !== 'number' || useCase.confidence < 0 || useCase.confidence > 1) {
                errors.push(`${path}.useCases[${i}].confidence: Must be between 0 and 1`)
              }
            }
          })
        }
      }

      // Validate performance metrics
      if (component.performance) {
        if (component.performance.fps) {
          const fps = component.performance.fps
          if (fps.avg && (typeof fps.avg !== 'number' || fps.avg <= 0)) {
            errors.push(`${path}.performance.fps.avg: Must be a positive number`)
          }
        }
      } else {
        warnings.push(`${path}: Missing performance metrics`)
      }

      // Validate frameworks
      if (component.frameworks) {
        if (!Array.isArray(component.frameworks)) {
          errors.push(`${path}.frameworks: Must be an array`)
        }
      } else {
        warnings.push(`${path}: Missing frameworks list`)
      }
    }
  }

  // Validate GIF templates
  if (data.gifTemplates) {
    for (const [id, template] of Object.entries(data.gifTemplates)) {
      const path = `gifTemplates.${id}`

      if (!template.id) errors.push(`${path}: Missing required field 'id'`)
      if (!template.name) errors.push(`${path}: Missing required field 'name'`)
      if (!template.platform) errors.push(`${path}: Missing required field 'platform'`)

      // Validate specifications
      if (template.specifications) {
        const specs = template.specifications
        if (!specs.dimensions) warnings.push(`${path}.specifications: Missing dimensions`)
        if (!specs.maxSize) warnings.push(`${path}.specifications: Missing maxSize`)
      } else {
        warnings.push(`${path}: Missing specifications`)
      }
    }
  }

  return { errors, warnings }
}

function jsonToToon(inputFile, outputFile) {
  console.log(`📖 Reading JSON: ${inputFile}`)

  if (!existsSync(inputFile)) {
    console.error(`❌ Error: File not found: ${inputFile}`)
    process.exit(1)
  }

  const jsonContent = readFileSync(inputFile, 'utf-8')
  const data = JSON.parse(jsonContent)

  console.log(`✅ Parsed JSON (${jsonContent.length} bytes)`)

  // Validate structure
  console.log('\n🔍 Validating structure...')
  const { errors, warnings } = validateComponentRegistry(data)

  if (errors.length > 0) {
    console.error(`\n❌ Validation errors (${errors.length}):`)
    errors.forEach(err => console.error(`   - ${err}`))
    process.exit(1)
  }

  if (warnings.length > 0) {
    console.warn(`\n⚠️  Validation warnings (${warnings.length}):`)
    warnings.forEach(warn => console.warn(`   - ${warn}`))
  }

  console.log('✅ Structure valid')

  // Convert to TOON
  console.log('\n🔧 Converting to TOON format...')
  const toonContent = stringifyToon(data)

  // Save output
  writeFileSync(outputFile, toonContent)
  console.log(`✅ Saved: ${outputFile} (${toonContent.length} bytes)`)

  // Show comparison
  const jsonTokens = estimateTokens(jsonContent)
  const toonTokens = estimateTokens(toonContent)
  const savings = ((1 - toonContent.length / jsonContent.length) * 100).toFixed(1)
  const tokenSavings = jsonTokens - toonTokens

  console.log('\n📊 Comparison:')
  console.log(`   JSON: ${jsonContent.length.toLocaleString()} bytes (~${jsonTokens.toLocaleString()} tokens)`)
  console.log(`   TOON: ${toonContent.length.toLocaleString()} bytes (~${toonTokens.toLocaleString()} tokens)`)
  console.log(`   Savings: ${savings}% (${tokenSavings.toLocaleString()} tokens)`)
}

function toonToJson(inputFile, outputFile) {
  console.log(`📖 Reading TOON: ${inputFile}`)

  if (!existsSync(inputFile)) {
    console.error(`❌ Error: File not found: ${inputFile}`)
    process.exit(1)
  }

  const toonContent = readFileSync(inputFile, 'utf-8')

  console.log(`🔧 Parsing TOON format (${toonContent.length} bytes)...`)
  const data = parseToon(toonContent)

  console.log('✅ Successfully parsed TOON')

  // Validate structure
  console.log('\n🔍 Validating structure...')
  const { errors, warnings } = validateComponentRegistry(data)

  if (errors.length > 0) {
    console.error(`\n❌ Validation errors (${errors.length}):`)
    errors.forEach(err => console.error(`   - ${err}`))
  } else {
    console.log('✅ Structure valid')
  }

  if (warnings.length > 0) {
    console.warn(`\n⚠️  Validation warnings (${warnings.length}):`)
    warnings.forEach(warn => console.warn(`   - ${warn}`))
  }

  // Convert to JSON
  console.log('\n🔧 Converting to JSON format...')
  const jsonContent = JSON.stringify(data, null, 2)

  // Save output
  writeFileSync(outputFile, jsonContent)
  console.log(`✅ Saved: ${outputFile} (${jsonContent.length} bytes)`)

  // Show comparison
  const jsonTokens = estimateTokens(jsonContent)
  const toonTokens = estimateTokens(toonContent)
  const overhead = ((jsonContent.length / toonContent.length - 1) * 100).toFixed(1)

  console.log('\n📊 Comparison:')
  console.log(`   TOON: ${toonContent.length.toLocaleString()} bytes (~${toonTokens.toLocaleString()} tokens)`)
  console.log(`   JSON: ${jsonContent.length.toLocaleString()} bytes (~${jsonTokens.toLocaleString()} tokens)`)
  console.log(`   JSON overhead: +${overhead}%`)
}

function validateToon(inputFile) {
  console.log(`📖 Reading TOON: ${inputFile}`)

  if (!existsSync(inputFile)) {
    console.error(`❌ Error: File not found: ${inputFile}`)
    process.exit(1)
  }

  const toonContent = readFileSync(inputFile, 'utf-8')

  console.log(`🔧 Parsing TOON format (${toonContent.length} bytes)...`)

  try {
    const data = parseToon(toonContent)
    console.log('✅ TOON syntax is valid')

    // Validate structure
    console.log('\n🔍 Validating registry structure...')
    const { errors, warnings } = validateComponentRegistry(data)

    if (errors.length > 0) {
      console.error(`\n❌ Validation errors (${errors.length}):`)
      errors.forEach(err => console.error(`   - ${err}`))
      process.exit(1)
    }

    console.log('✅ Structure is valid')

    if (warnings.length > 0) {
      console.warn(`\n⚠️  Validation warnings (${warnings.length}):`)
      warnings.forEach(warn => console.warn(`   - ${warn}`))
    }

    // Show statistics
    const componentCount = Object.keys(data.components || {}).length
    const gifCount = Object.keys(data.gifTemplates || {}).length
    const tokens = estimateTokens(toonContent)

    console.log('\n📊 Registry Statistics:')
    console.log(`   Components: ${componentCount}`)
    console.log(`   GIF Templates: ${gifCount}`)
    console.log(`   File Size: ${toonContent.length.toLocaleString()} bytes`)
    console.log(`   Estimated Tokens: ~${tokens.toLocaleString()}`)

    console.log('\n✅ All validation checks passed!')

  } catch (error) {
    console.error(`\n❌ TOON syntax error:`)
    console.error(`   ${error.message}`)
    process.exit(1)
  }
}

function compareFormats(jsonFile, toonFile) {
  console.log('📊 Comparing JSON and TOON formats\n')
  console.log('=' .repeat(60))

  if (!existsSync(jsonFile)) {
    console.error(`❌ Error: JSON file not found: ${jsonFile}`)
    process.exit(1)
  }

  if (!existsSync(toonFile)) {
    console.error(`❌ Error: TOON file not found: ${toonFile}`)
    process.exit(1)
  }

  // Read both files
  const jsonContent = readFileSync(jsonFile, 'utf-8')
  const toonContent = readFileSync(toonFile, 'utf-8')

  // Parse both
  const jsonData = JSON.parse(jsonContent)
  const toonData = parseToon(toonContent)

  // Calculate metrics
  const jsonSize = jsonContent.length
  const toonSize = toonContent.length
  const jsonTokens = estimateTokens(jsonContent)
  const toonTokens = estimateTokens(toonContent)

  const sizeSavings = ((1 - toonSize / jsonSize) * 100).toFixed(1)
  const tokenSavings = jsonTokens - toonTokens
  const tokenSavingsPercent = ((1 - toonTokens / jsonTokens) * 100).toFixed(1)

  console.log('\n📁 File Sizes:')
  console.log(`   JSON: ${jsonSize.toLocaleString()} bytes`)
  console.log(`   TOON: ${toonSize.toLocaleString()} bytes`)
  console.log(`   Savings: ${sizeSavings}% (${(jsonSize - toonSize).toLocaleString()} bytes)`)

  console.log('\n🎯 Token Estimates:')
  console.log(`   JSON: ~${jsonTokens.toLocaleString()} tokens`)
  console.log(`   TOON: ~${toonTokens.toLocaleString()} tokens`)
  console.log(`   Savings: ${tokenSavingsPercent}% (~${tokenSavings.toLocaleString()} tokens)`)

  console.log('\n📦 Content:')
  console.log(`   Components: ${Object.keys(jsonData.components || {}).length}`)
  console.log(`   GIF Templates: ${Object.keys(jsonData.gifTemplates || {}).length}`)

  // Cost estimation (assuming $3/M input tokens for Claude Sonnet)
  const costPerMillionTokens = 3.0
  const jsonCost = (jsonTokens / 1_000_000) * costPerMillionTokens
  const toonCost = (toonTokens / 1_000_000) * costPerMillionTokens
  const costSavings = jsonCost - toonCost

  console.log('\n💰 Cost Estimation (at $3/M input tokens):')
  console.log(`   JSON: $${jsonCost.toFixed(6)} per read`)
  console.log(`   TOON: $${toonCost.toFixed(6)} per read`)
  console.log(`   Savings: $${costSavings.toFixed(6)} per read`)

  // Annual savings (assuming 1000 reads/day)
  const readsPerDay = 1000
  const annualSavings = costSavings * readsPerDay * 365
  console.log(`   Annual savings (1000 reads/day): $${annualSavings.toFixed(2)}`)

  console.log('\n' + '='.repeat(60))
  console.log('✅ Comparison complete!')
}

// Main execution
const [,, command, inputFile, outputFile] = process.argv

if (!command || command === 'help' || command === '--help' || command === '-h') {
  showHelp()
}

if (!COMMANDS[command]) {
  console.error(`❌ Error: Unknown command '${command}'`)
  console.error(`Run 'node convert-toon.mjs help' for usage information`)
  process.exit(1)
}

if (!inputFile) {
  console.error(`❌ Error: Input file required`)
  console.error(`Run 'node convert-toon.mjs help' for usage information`)
  process.exit(1)
}

try {
  switch (command) {
    case 'json-to-toon': {
      const output = outputFile || inputFile.replace(/\.json$/, '.toon')
      jsonToToon(inputFile, output)
      break
    }

    case 'toon-to-json': {
      const output = outputFile || inputFile.replace(/\.toon$/, '.json')
      toonToJson(inputFile, output)
      break
    }

    case 'validate-toon': {
      validateToon(inputFile)
      break
    }

    case 'compare': {
      if (!outputFile) {
        console.error(`❌ Error: Both JSON and TOON files required for comparison`)
        console.error(`Usage: node convert-toon.mjs compare <json-file> <toon-file>`)
        process.exit(1)
      }
      compareFormats(inputFile, outputFile)
      break
    }
  }
} catch (error) {
  console.error(`\n❌ Error: ${error.message}`)
  if (error.stack) {
    console.error('\nStack trace:')
    console.error(error.stack)
  }
  process.exit(1)
}
