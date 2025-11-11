import { z } from 'zod';

const ComponentCreateSchema = z.object({
  name: z.string(),
  type: z.enum(['react', 'vue', 'svelte', 'web-component']),
  props: z.array(z.object({
    name: z.string(),
    type: z.string(),
    required: z.boolean().optional(),
    default: z.any().optional()
  })).optional(),
  styles: z.record(z.any()).optional(),
  accessibility: z.object({
    role: z.string().optional(),
    ariaLabel: z.string().optional(),
    ariaDescribedBy: z.string().optional(),
    tabIndex: z.number().optional()
  }).optional()
});

const ComponentAnalyzeSchema = z.object({
  code: z.string(),
  checks: z.array(z.enum(['performance', 'accessibility', 'best-practices', 'seo'])).optional()
});

export class ComponentTools {
  constructor() {}

  async create(args: any) {
    const params = ComponentCreateSchema.parse(args);
    
    try {
      let componentCode: string;
      
      switch (params.type) {
        case 'react':
          componentCode = this.generateReactComponent(params);
          break;
        case 'vue':
          componentCode = this.generateVueComponent(params);
          break;
        case 'svelte':
          componentCode = this.generateSvelteComponent(params);
          break;
        case 'web-component':
          componentCode = this.generateWebComponent(params);
          break;
        default:
          throw new Error(`Unsupported component type: ${params.type}`);
      }

      const tests = this.generateTests(params);
      const storybook = this.generateStorybookStory(params);
      const documentation = this.generateDocumentation(params);

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              component: {
                name: params.name,
                type: params.type,
                code: componentCode,
                tests,
                storybook,
                documentation
              },
              files: {
                component: `${params.name}.${this.getFileExtension(params.type)}`,
                test: `${params.name}.test.${this.getFileExtension(params.type)}`,
                story: `${params.name}.stories.${this.getFileExtension(params.type)}`,
                docs: `${params.name}.md`
              }
            }, null, 2)
          }
        ]
      };
    } catch (error: any) {
      return {
        content: [
          {
            type: 'text',
            text: `Error creating component: ${error.message}`
          }
        ],
        isError: true
      };
    }
  }

  async analyze(args: any) {
    const params = ComponentAnalyzeSchema.parse(args);
    const checks = params.checks || ['performance', 'accessibility', 'best-practices'];
    
    try {
      const results: any = {
        summary: {
          score: 0,
          issues: [],
          suggestions: []
        },
        checks: {}
      };

      if (checks.includes('performance')) {
        results.checks.performance = this.analyzePerformance(params.code);
      }

      if (checks.includes('accessibility')) {
        results.checks.accessibility = this.analyzeAccessibility(params.code);
      }

      if (checks.includes('best-practices')) {
        results.checks.bestPractices = this.analyzeBestPractices(params.code);
      }

      if (checks.includes('seo')) {
        results.checks.seo = this.analyzeSEO(params.code);
      }

      // Calculate overall score
      const scores = Object.values(results.checks).map((check: any) => check.score);
      results.summary.score = scores.reduce((a, b) => a + b, 0) / scores.length;
      
      // Collect all issues and suggestions
      Object.values(results.checks).forEach((check: any) => {
        results.summary.issues.push(...(check.issues || []));
        results.summary.suggestions.push(...(check.suggestions || []));
      });

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(results, null, 2)
          }
        ]
      };
    } catch (error: any) {
      return {
        content: [
          {
            type: 'text',
            text: `Error analyzing component: ${error.message}`
          }
        ],
        isError: true
      };
    }
  }

  private generateReactComponent(params: any): string {
    const props = params.props || [];
    const propTypes = props.map((p: any) => `  ${p.name}${p.required ? '' : '?'}: ${this.mapTypeToTS(p.type)};`).join('\n');
    const defaultProps = props.filter((p: any) => p.default !== undefined);

    return `import React from 'react';

interface ${params.name}Props {
${propTypes}
}

export const ${params.name}: React.FC<${params.name}Props> = ({
  ${props.map((p: any) => p.name + (p.default ? ` = ${JSON.stringify(p.default)}` : '')).join(',\n  ')}
}) => {
  return (
    <div 
      className="${params.name.toLowerCase()}"
      ${params.accessibility?.role ? `role="${params.accessibility.role}"` : ''}
      ${params.accessibility?.ariaLabel ? `aria-label="${params.accessibility.ariaLabel}"` : ''}
      ${params.accessibility?.tabIndex !== undefined ? `tabIndex={${params.accessibility.tabIndex}}` : ''}
    >
      {/* Component content */}
    </div>
  );
};

${params.name}.displayName = '${params.name}';`;
  }

  private generateVueComponent(params: any): string {
    const props = params.props || [];
    
    return `<template>
  <div 
    class="${params.name.toLowerCase()}"
    ${params.accessibility?.role ? `:role="${params.accessibility.role}"` : ''}
    ${params.accessibility?.ariaLabel ? `:aria-label="${params.accessibility.ariaLabel}"` : ''}
  >
    <!-- Component content -->
  </div>
</template>

<script setup lang="ts">
interface Props {
  ${props.map((p: any) => `${p.name}${p.required ? '' : '?'}: ${this.mapTypeToTS(p.type)}`).join(';\n  ')};
}

const props = withDefaults(defineProps<Props>(), {
  ${props.filter((p: any) => p.default).map((p: any) => `${p.name}: ${JSON.stringify(p.default)}`).join(',\n  ')}
});
</script>

<style scoped>
.${params.name.toLowerCase()} {
  /* Component styles */
}
</style>`;
  }

  private generateSvelteComponent(params: any): string {
    const props = params.props || [];
    
    return `<script lang="ts">
  ${props.map((p: any) => `export let ${p.name}${p.type ? `: ${this.mapTypeToTS(p.type)}` : ''}${p.default ? ` = ${JSON.stringify(p.default)}` : ''};`).join('\n  ')}
</script>

<div 
  class="${params.name.toLowerCase()}"
  ${params.accessibility?.role ? `role="${params.accessibility.role}"` : ''}
  ${params.accessibility?.ariaLabel ? `aria-label="${params.accessibility.ariaLabel}"` : ''}
>
  <!-- Component content -->
</div>

<style>
  .${params.name.toLowerCase()} {
    /* Component styles */
  }
</style>`;
  }

  private generateWebComponent(params: any): string {
    return `class ${params.name} extends HTMLElement {
  static get observedAttributes() {
    return [${(params.props || []).map((p: any) => `'${p.name}'`).join(', ')}];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  render() {
    this.shadowRoot.innerHTML = \`
      <style>
        :host {
          display: block;
        }
      </style>
      <div ${params.accessibility?.role ? `role="${params.accessibility.role}"` : ''}>
        <!-- Component content -->
      </div>
    \`;
  }
}

customElements.define('${params.name.toLowerCase()}-component', ${params.name});`;
  }

  private generateTests(params: any): string {
    return `import { render, screen } from '@testing-library/react';
import { ${params.name} } from './${params.name}';

describe('${params.name}', () => {
  it('renders without crashing', () => {
    render(<${params.name} />);
  });

  ${(params.props || []).filter((p: any) => p.required).map((p: any) => `
  it('renders with required prop ${p.name}', () => {
    render(<${params.name} ${p.name}={${this.getTestValue(p.type)}} />);
  });`).join('')}

  ${params.accessibility?.role ? `
  it('has correct ARIA role', () => {
    render(<${params.name} />);
    expect(screen.getByRole('${params.accessibility.role}')).toBeInTheDocument();
  });` : ''}
});`;
  }

  private generateStorybookStory(params: any): string {
    return `import type { Meta, StoryObj } from '@storybook/react';
import { ${params.name} } from './${params.name}';

const meta: Meta<typeof ${params.name}> = {
  title: 'Components/${params.name}',
  component: ${params.name},
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ${(params.props || []).map((p: any) => `${p.name}: ${JSON.stringify(p.default || this.getTestValue(p.type))}`).join(',\n    ')}
  },
};`;
  }

  private generateDocumentation(params: any): string {
    return `# ${params.name}

## Overview
${params.name} component for ${params.type} applications.

## Props
${(params.props || []).length > 0 ? `
| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
${params.props.map((p: any) => `| ${p.name} | ${p.type} | ${p.required ? 'Yes' : 'No'} | ${p.default || '-'} | - |`).join('\n')}
` : 'No props defined.'}

## Accessibility
${params.accessibility ? `
- Role: ${params.accessibility.role || 'Not specified'}
- ARIA Label: ${params.accessibility.ariaLabel || 'Not specified'}
- Tab Index: ${params.accessibility.tabIndex !== undefined ? params.accessibility.tabIndex : 'Default'}
` : 'No accessibility attributes specified.'}

## Usage
\`\`\`${this.getFileExtension(params.type)}
// Import the component
import { ${params.name} } from './${params.name}';

// Use in your application
<${params.name} ${(params.props || []).filter((p: any) => p.required).map((p: any) => `${p.name}={...}`).join(' ')} />
\`\`\``;
  }

  private analyzePerformance(code: string): any {
    const issues = [];
    const suggestions = [];
    
    // Check for common performance issues
    if (code.includes('componentDidUpdate') && !code.includes('shouldComponentUpdate')) {
      issues.push('Missing shouldComponentUpdate optimization');
    }
    
    if (code.match(/useState.*map/)) {
      suggestions.push('Consider using useMemo for expensive computations');
    }
    
    if (code.includes('addEventListener') && !code.includes('removeEventListener')) {
      issues.push('Event listener not cleaned up');
    }

    return {
      score: Math.max(100 - issues.length * 20, 0),
      issues,
      suggestions,
      metrics: {
        renderComplexity: 'Low',
        reRenderRisk: issues.length > 0 ? 'High' : 'Low',
        memoryLeakRisk: code.includes('addEventListener') ? 'Medium' : 'Low'
      }
    };
  }

  private analyzeAccessibility(code: string): any {
    const issues = [];
    const suggestions = [];
    
    // Check for accessibility issues
    if (code.includes('<img') && !code.includes('alt=')) {
      issues.push('Images missing alt text');
    }
    
    if (code.includes('<button') && !code.includes('aria-label') && !code.includes('>')) {
      suggestions.push('Consider adding aria-label to buttons');
    }
    
    if (code.includes('onClick') && !code.includes('onKeyDown')) {
      suggestions.push('Add keyboard support for click handlers');
    }
    
    if (!code.includes('role=') && !code.includes('aria-')) {
      suggestions.push('Consider adding ARIA attributes for better screen reader support');
    }

    return {
      score: Math.max(100 - issues.length * 25, 0),
      issues,
      suggestions,
      wcagCompliance: {
        'A': issues.length === 0,
        'AA': issues.length === 0 && suggestions.length < 2,
        'AAA': issues.length === 0 && suggestions.length === 0
      }
    };
  }

  private analyzeBestPractices(code: string): any {
    const issues = [];
    const suggestions = [];
    
    // Check for best practices
    if (code.includes('var ')) {
      issues.push('Using var instead of const/let');
    }
    
    if (code.includes('==') && !code.includes('===')) {
      issues.push('Using loose equality instead of strict equality');
    }
    
    if (!code.includes('PropTypes') && !code.includes('interface') && !code.includes('type')) {
      suggestions.push('Add type checking with PropTypes or TypeScript');
    }
    
    if (code.length > 500 && !code.includes('function') && !code.includes('const')) {
      suggestions.push('Consider breaking down into smaller components');
    }

    return {
      score: Math.max(100 - issues.length * 15, 0),
      issues,
      suggestions,
      codeQuality: {
        maintainability: issues.length === 0 ? 'High' : 'Medium',
        readability: code.length < 300 ? 'High' : 'Medium',
        testability: 'Medium'
      }
    };
  }

  private analyzeSEO(code: string): any {
    const issues = [];
    const suggestions = [];
    
    // Check for SEO considerations
    if (code.includes('<h1') && code.split('<h1').length > 2) {
      issues.push('Multiple H1 tags detected');
    }
    
    if (!code.includes('meta') && code.includes('head')) {
      suggestions.push('Add meta tags for better SEO');
    }
    
    if (!code.includes('semantic') && (code.includes('<div>') || code.includes('<span>'))) {
      suggestions.push('Use semantic HTML elements');
    }

    return {
      score: 100 - issues.length * 30,
      issues,
      suggestions,
      seoReadiness: issues.length === 0 ? 'Good' : 'Needs Improvement'
    };
  }

  private mapTypeToTS(type: string): string {
    const typeMap: any = {
      'string': 'string',
      'number': 'number',
      'boolean': 'boolean',
      'array': 'any[]',
      'object': 'Record<string, any>',
      'function': '(...args: any[]) => any',
      'any': 'any'
    };
    
    return typeMap[type.toLowerCase()] || 'any';
  }

  private getFileExtension(type: string): string {
    const extensions: any = {
      'react': 'tsx',
      'vue': 'vue',
      'svelte': 'svelte',
      'web-component': 'js'
    };
    
    return extensions[type] || 'js';
  }

  private getTestValue(type: string): any {
    const values: any = {
      'string': '"test"',
      'number': '42',
      'boolean': 'true',
      'array': '[]',
      'object': '{}',
      'function': '() => {}'
    };
    
    return values[type.toLowerCase()] || 'null';
  }
}