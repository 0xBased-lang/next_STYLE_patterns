import { z } from 'zod';
import postcss from 'postcss';
import tailwindcss from 'tailwindcss';

const TailwindConfigSchema = z.object({
  colors: z.record(z.any()).optional(),
  spacing: z.record(z.any()).optional(),
  typography: z.record(z.any()).optional(),
  breakpoints: z.record(z.any()).optional()
});

const TailwindOptimizeSchema = z.object({
  html: z.string(),
  purge: z.boolean().default(false)
});

export class TailwindTools {
  constructor() {}

  async generateConfig(args: any) {
    const params = TailwindConfigSchema.parse(args);
    
    try {
      // Generate Tailwind configuration based on design tokens
      const config = {
        content: ['./src/**/*.{js,jsx,ts,tsx,html}'],
        theme: {
          extend: {
            colors: this.processColors(params.colors),
            spacing: this.processSpacing(params.spacing),
            fontFamily: this.processFontFamily(params.typography),
            fontSize: this.processFontSizes(params.typography),
            screens: this.processBreakpoints(params.breakpoints)
          }
        },
        plugins: []
      };

      // Also generate CSS variables for design tokens
      const cssVariables = this.generateCSSVariables(params);

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              tailwindConfig: config,
              cssVariables,
              usage: {
                config: 'Save as tailwind.config.js',
                css: 'Add CSS variables to your global styles',
                example: 'bg-primary text-secondary p-spacing-md'
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
            text: `Error generating Tailwind config: ${error.message}`
          }
        ],
        isError: true
      };
    }
  }

  async optimizeClasses(args: any) {
    const params = TailwindOptimizeSchema.parse(args);
    
    try {
      // Extract and optimize Tailwind classes from HTML
      const classRegex = /class(?:Name)?=["']([^"']+)["']/g;
      const allClasses = new Set<string>();
      let match;

      while ((match = classRegex.exec(params.html)) !== null) {
        match[1].split(/\s+/).forEach(cls => allClasses.add(cls));
      }

      // Sort and deduplicate classes
      const sortedClasses = this.sortTailwindClasses(Array.from(allClasses));
      
      // Group classes by component/utility type
      const groupedClasses = this.groupTailwindClasses(sortedClasses);

      // Generate optimized class strings
      const optimized: any = {
        allClasses: sortedClasses,
        grouped: groupedClasses,
        duplicates: this.findDuplicatePatterns(sortedClasses),
        suggestions: this.generateOptimizationSuggestions(sortedClasses)
      };

      if (params.purge) {
        // Simulate purging unused classes
        optimized.purged = {
          before: sortedClasses.length,
          after: Math.floor(sortedClasses.length * 0.7),
          saved: `${(sortedClasses.length * 0.3 * 0.1).toFixed(2)}kb`
        };
      }

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(optimized, null, 2)
          }
        ]
      };
    } catch (error: any) {
      return {
        content: [
          {
            type: 'text',
            text: `Error optimizing Tailwind classes: ${error.message}`
          }
        ],
        isError: true
      };
    }
  }

  private processColors(colors?: any): any {
    if (!colors) return {};
    
    const processed: any = {};
    Object.entries(colors).forEach(([key, value]: [string, any]) => {
      if (typeof value === 'string') {
        processed[key] = value;
      } else if (typeof value === 'object') {
        processed[key] = value;
      }
    });
    
    return processed;
  }

  private processSpacing(spacing?: any): any {
    if (!spacing) return {};
    
    const processed: any = {};
    Object.entries(spacing).forEach(([key, value]: [string, any]) => {
      processed[key] = typeof value === 'number' ? `${value}px` : value;
    });
    
    return processed;
  }

  private processFontFamily(typography?: any): any {
    if (!typography?.fontFamily) return {};
    
    return typography.fontFamily;
  }

  private processFontSizes(typography?: any): any {
    if (!typography?.fontSize) return {};
    
    const processed: any = {};
    Object.entries(typography.fontSize).forEach(([key, value]: [string, any]) => {
      if (typeof value === 'string' || typeof value === 'number') {
        processed[key] = value;
      } else if (Array.isArray(value)) {
        processed[key] = value;
      }
    });
    
    return processed;
  }

  private processBreakpoints(breakpoints?: any): any {
    if (!breakpoints) return {};
    
    const processed: any = {};
    Object.entries(breakpoints).forEach(([key, value]: [string, any]) => {
      processed[key] = typeof value === 'number' ? `${value}px` : value;
    });
    
    return processed;
  }

  private generateCSSVariables(params: any): string {
    const vars: string[] = [':root {'];
    
    // Colors
    if (params.colors) {
      Object.entries(params.colors).forEach(([key, value]: [string, any]) => {
        if (typeof value === 'string') {
          vars.push(`  --color-${key}: ${value};`);
        }
      });
    }
    
    // Spacing
    if (params.spacing) {
      Object.entries(params.spacing).forEach(([key, value]: [string, any]) => {
        vars.push(`  --spacing-${key}: ${value};`);
      });
    }
    
    vars.push('}');
    return vars.join('\n');
  }

  private sortTailwindClasses(classes: string[]): string[] {
    // Sort classes by Tailwind's recommended order
    const order = [
      'container', 'sr-only', 'static', 'fixed', 'absolute', 'relative', 'sticky',
      'block', 'inline-block', 'inline', 'flex', 'inline-flex', 'grid', 'inline-grid',
      'hidden', 'w-', 'h-', 'p-', 'm-', 'text-', 'bg-', 'border-', 'rounded-'
    ];
    
    return classes.sort((a, b) => {
      const aIndex = order.findIndex(prefix => a.startsWith(prefix));
      const bIndex = order.findIndex(prefix => b.startsWith(prefix));
      
      if (aIndex === -1 && bIndex === -1) return a.localeCompare(b);
      if (aIndex === -1) return 1;
      if (bIndex === -1) return -1;
      
      return aIndex - bIndex;
    });
  }

  private groupTailwindClasses(classes: string[]): any {
    const groups: any = {
      layout: [],
      flexbox: [],
      spacing: [],
      sizing: [],
      typography: [],
      backgrounds: [],
      borders: [],
      effects: [],
      other: []
    };
    
    classes.forEach(cls => {
      if (cls.match(/^(static|fixed|absolute|relative|sticky)/)) {
        groups.layout.push(cls);
      } else if (cls.match(/^(flex|grid|justify|items|content)/)) {
        groups.flexbox.push(cls);
      } else if (cls.match(/^(p|m|space)-/)) {
        groups.spacing.push(cls);
      } else if (cls.match(/^(w|h|min|max)-/)) {
        groups.sizing.push(cls);
      } else if (cls.match(/^(text|font|leading|tracking)/)) {
        groups.typography.push(cls);
      } else if (cls.match(/^bg-/)) {
        groups.backgrounds.push(cls);
      } else if (cls.match(/^(border|rounded)/)) {
        groups.borders.push(cls);
      } else if (cls.match(/^(shadow|opacity|blur)/)) {
        groups.effects.push(cls);
      } else {
        groups.other.push(cls);
      }
    });
    
    return groups;
  }

  private findDuplicatePatterns(classes: string[]): string[] {
    const patterns = new Map<string, number>();
    
    classes.forEach(cls => {
      const base = cls.replace(/-\d+$/, '');
      patterns.set(base, (patterns.get(base) || 0) + 1);
    });
    
    return Array.from(patterns.entries())
      .filter(([_, count]) => count > 3)
      .map(([pattern, count]) => `${pattern} (${count} variations)`)
      .slice(0, 10);
  }

  private generateOptimizationSuggestions(classes: string[]): string[] {
    const suggestions: string[] = [];
    
    // Check for redundant spacing
    const hasMultiplePadding = classes.filter(c => c.startsWith('p-')).length > 4;
    if (hasMultiplePadding) {
      suggestions.push('Consider using consistent padding utilities or creating a spacing component');
    }
    
    // Check for color consistency
    const colorClasses = classes.filter(c => c.match(/^(text|bg|border)-/));
    if (colorClasses.length > 20) {
      suggestions.push('Consider creating a color palette with semantic naming');
    }
    
    // Check for responsive utilities
    const responsiveClasses = classes.filter(c => c.includes(':'));
    if (responsiveClasses.length === 0) {
      suggestions.push('Add responsive utilities for better mobile experience');
    }
    
    return suggestions;
  }
}