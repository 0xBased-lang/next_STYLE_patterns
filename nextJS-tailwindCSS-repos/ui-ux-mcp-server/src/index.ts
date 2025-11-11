import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ErrorCode,
  McpError
} from '@modelcontextprotocol/sdk/types.js';
import dotenv from 'dotenv';

// Import tool handlers
import { StorybookTools } from './tools/storybook.js';
import { TailwindTools } from './tools/tailwind.js';
import { AnimationTools } from './tools/animation.js';
import { PlaywrightTools } from './tools/playwright.js';
import { ComponentTools } from './tools/components.js';
import { WorkflowTools } from './tools/workflows.js';

// Load environment variables
dotenv.config();

// Server metadata
const SERVER_NAME = 'ui-ux-mcp-server';
const SERVER_VERSION = '1.0.0';

class UIUXMCPServer {
  private server: Server;
  private storybookTools: StorybookTools;
  private tailwindTools: TailwindTools;
  private animationTools: AnimationTools;
  private playwrightTools: PlaywrightTools;
  private componentTools: ComponentTools;
  private workflowTools: WorkflowTools;

  constructor() {
    this.server = new Server(
      {
        name: SERVER_NAME,
        version: SERVER_VERSION,
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    // Initialize tool handlers
    this.storybookTools = new StorybookTools();
    this.tailwindTools = new TailwindTools();
    this.animationTools = new AnimationTools();
    this.playwrightTools = new PlaywrightTools();
    this.componentTools = new ComponentTools();
    this.workflowTools = new WorkflowTools();

    this.setupHandlers();
  }

  private setupHandlers(): void {
    // Handle tool listing
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: [
        // Storybook Tools
        {
          name: 'storybook_get_stories',
          description: 'Get list of all Storybook stories',
          inputSchema: {
            type: 'object',
            properties: {
              url: { type: 'string', description: 'Storybook URL' }
            }
          }
        },
        {
          name: 'storybook_test_component',
          description: 'Run visual and accessibility tests on a component',
          inputSchema: {
            type: 'object',
            properties: {
              componentName: { type: 'string' },
              storyName: { type: 'string' },
              testTypes: {
                type: 'array',
                items: { 
                  type: 'string',
                  enum: ['visual', 'accessibility', 'interaction']
                }
              }
            },
            required: ['componentName']
          }
        },
        // Tailwind Tools
        {
          name: 'tailwind_generate_config',
          description: 'Generate Tailwind configuration from design tokens',
          inputSchema: {
            type: 'object',
            properties: {
              colors: { type: 'object' },
              spacing: { type: 'object' },
              typography: { type: 'object' },
              breakpoints: { type: 'object' }
            }
          }
        },
        {
          name: 'tailwind_optimize_classes',
          description: 'Optimize and deduplicate Tailwind classes',
          inputSchema: {
            type: 'object',
            properties: {
              html: { type: 'string' },
              purge: { type: 'boolean', default: false }
            },
            required: ['html']
          }
        },
        // Animation Tools
        {
          name: 'animation_create_timeline',
          description: 'Create animation timeline with Framer Motion or GSAP',
          inputSchema: {
            type: 'object',
            properties: {
              library: { 
                type: 'string', 
                enum: ['framer-motion', 'gsap'],
                default: 'framer-motion'
              },
              animations: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    target: { type: 'string' },
                    properties: { type: 'object' },
                    duration: { type: 'number' },
                    delay: { type: 'number' },
                    easing: { type: 'string' }
                  }
                }
              }
            },
            required: ['animations']
          }
        },
        {
          name: 'animation_preview',
          description: 'Generate preview of animation sequence',
          inputSchema: {
            type: 'object',
            properties: {
              timeline: { type: 'object' },
              format: { 
                type: 'string',
                enum: ['gif', 'mp4', 'webm'],
                default: 'gif'
              }
            },
            required: ['timeline']
          }
        },
        // Playwright Tools
        {
          name: 'playwright_test_ui',
          description: 'Run UI tests with Playwright',
          inputSchema: {
            type: 'object',
            properties: {
              url: { type: 'string' },
              tests: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    name: { type: 'string' },
                    actions: { type: 'array' },
                    assertions: { type: 'array' }
                  }
                }
              },
              browsers: {
                type: 'array',
                items: { 
                  type: 'string',
                  enum: ['chromium', 'firefox', 'webkit']
                },
                default: ['chromium']
              }
            },
            required: ['url', 'tests']
          }
        },
        {
          name: 'playwright_capture_screenshots',
          description: 'Capture screenshots across browsers and viewports',
          inputSchema: {
            type: 'object',
            properties: {
              url: { type: 'string' },
              viewports: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    width: { type: 'number' },
                    height: { type: 'number' },
                    deviceScaleFactor: { type: 'number' }
                  }
                }
              },
              fullPage: { type: 'boolean', default: false }
            },
            required: ['url']
          }
        },
        // Component Tools
        {
          name: 'component_create',
          description: 'Create a new UI component with best practices',
          inputSchema: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              type: { 
                type: 'string',
                enum: ['react', 'vue', 'svelte', 'web-component']
              },
              props: { type: 'array', items: { type: 'object' } },
              styles: { type: 'object' },
              accessibility: { type: 'object' }
            },
            required: ['name', 'type']
          }
        },
        {
          name: 'component_analyze',
          description: 'Analyze component for performance and accessibility',
          inputSchema: {
            type: 'object',
            properties: {
              code: { type: 'string' },
              checks: {
                type: 'array',
                items: {
                  type: 'string',
                  enum: ['performance', 'accessibility', 'best-practices', 'seo']
                }
              }
            },
            required: ['code']
          }
        },
        // Workflow Tools
        {
          name: 'workflow_optimize_ux',
          description: 'Run comprehensive UX optimization analysis',
          inputSchema: {
            type: 'object',
            properties: {
              url: { type: 'string' },
              analyses: {
                type: 'array',
                items: {
                  type: 'string',
                  enum: ['performance', 'accessibility', 'usability', 'mobile', 'seo']
                }
              }
            },
            required: ['url']
          }
        },
        {
          name: 'workflow_build_design_system',
          description: 'Generate complete design system from components',
          inputSchema: {
            type: 'object',
            properties: {
              source: {
                type: 'string',
                enum: ['storybook', 'code']
              },
              sourceId: { type: 'string' },
              includeTokens: { type: 'boolean', default: true },
              includeComponents: { type: 'boolean', default: true },
              includeDocumentation: { type: 'boolean', default: true }
            },
            required: ['source', 'sourceId']
          }
        }
      ]
    }));

    // Handle tool execution
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      try {
        switch (name) {
          // Storybook tools
          case 'storybook_get_stories':
            return await this.storybookTools.getStories(args);
          case 'storybook_test_component':
            return await this.storybookTools.testComponent(args);
          
          // Tailwind tools
          case 'tailwind_generate_config':
            return await this.tailwindTools.generateConfig(args);
          case 'tailwind_optimize_classes':
            return await this.tailwindTools.optimizeClasses(args);
          
          // Animation tools
          case 'animation_create_timeline':
            return await this.animationTools.createTimeline(args);
          case 'animation_preview':
            return await this.animationTools.preview(args);
          
          // Playwright tools
          case 'playwright_test_ui':
            return await this.playwrightTools.testUI(args);
          case 'playwright_capture_screenshots':
            return await this.playwrightTools.captureScreenshots(args);
          
          // Component tools
          case 'component_create':
            return await this.componentTools.create(args);
          case 'component_analyze':
            return await this.componentTools.analyze(args);
          
          // Workflow tools
          case 'workflow_optimize_ux':
            return await this.workflowTools.optimizeUX(args);
          case 'workflow_build_design_system':
            return await this.workflowTools.buildDesignSystem(args);
          
          default:
            throw new McpError(
              ErrorCode.MethodNotFound,
              `Tool ${name} not found`
            );
        }
      } catch (error) {
        if (error instanceof McpError) {
          throw error;
        }
        throw new McpError(
          ErrorCode.InternalError,
          `Error executing tool ${name}: ${error}`
        );
      }
    });
  }

  async start(): Promise<void> {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error(`${SERVER_NAME} v${SERVER_VERSION} started successfully`);
  }
}

// Start the server
const server = new UIUXMCPServer();
server.start().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});