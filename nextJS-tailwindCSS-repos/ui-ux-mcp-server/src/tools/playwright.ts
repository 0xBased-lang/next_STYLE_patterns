import { z } from 'zod';
import { chromium, firefox, webkit, Browser, Page } from 'playwright';

const PlaywrightTestSchema = z.object({
  url: z.string().url(),
  tests: z.array(z.object({
    name: z.string(),
    actions: z.array(z.any()),
    assertions: z.array(z.any())
  })),
  browsers: z.array(z.enum(['chromium', 'firefox', 'webkit'])).default(['chromium'])
});

const PlaywrightScreenshotSchema = z.object({
  url: z.string().url(),
  viewports: z.array(z.object({
    width: z.number(),
    height: z.number(),
    deviceScaleFactor: z.number().optional()
  })).optional(),
  fullPage: z.boolean().default(false)
});

export class PlaywrightTools {
  private browsers: Map<string, Browser> = new Map();

  constructor() {}

  async testUI(args: any) {
    const params = PlaywrightTestSchema.parse(args);
    const results: any = {
      url: params.url,
      tests: [],
      summary: {
        passed: 0,
        failed: 0,
        total: params.tests.length
      }
    };

    try {
      for (const browserName of params.browsers) {
        const browser = await this.getBrowser(browserName);
        const page = await browser.newPage();

        try {
          await page.goto(params.url);

          for (const test of params.tests) {
            const testResult: any = {
              name: test.name,
              browser: browserName,
              passed: true,
              errors: []
            };

            try {
              // Execute actions
              for (const action of test.actions) {
                await this.executeAction(page, action);
              }

              // Run assertions
              for (const assertion of test.assertions) {
                await this.runAssertion(page, assertion);
              }

              results.summary.passed++;
            } catch (error: any) {
              testResult.passed = false;
              testResult.errors.push(error.message);
              results.summary.failed++;
            }

            results.tests.push(testResult);
          }
        } finally {
          await page.close();
        }
      }

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
            text: `Error running UI tests: ${error.message}`
          }
        ],
        isError: true
      };
    } finally {
      await this.closeBrowsers();
    }
  }

  async captureScreenshots(args: any) {
    const params = PlaywrightScreenshotSchema.parse(args);
    
    const defaultViewports = [
      { width: 1920, height: 1080, deviceScaleFactor: 1 }, // Desktop
      { width: 768, height: 1024, deviceScaleFactor: 2 },  // Tablet
      { width: 375, height: 812, deviceScaleFactor: 3 }    // Mobile
    ];
    
    const viewports = params.viewports || defaultViewports;
    const screenshots: any[] = [];

    try {
      const browser = await this.getBrowser('chromium');

      for (const viewport of viewports) {
        const context = await browser.newContext({
          viewport: {
            width: viewport.width,
            height: viewport.height
          },
          deviceScaleFactor: viewport.deviceScaleFactor || 1
        });

        const page = await context.newPage();
        
        try {
          await page.goto(params.url, { waitUntil: 'networkidle' });
          
          const screenshotBuffer = await page.screenshot({
            fullPage: params.fullPage
          });

          screenshots.push({
            viewport: `${viewport.width}x${viewport.height}`,
            deviceScaleFactor: viewport.deviceScaleFactor || 1,
            size: `${(screenshotBuffer.length / 1024).toFixed(2)}KB`,
            fullPage: params.fullPage,
            timestamp: new Date().toISOString()
          });
        } finally {
          await context.close();
        }
      }

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              url: params.url,
              screenshots,
              message: `Captured ${screenshots.length} screenshots across different viewports`
            }, null, 2)
          }
        ]
      };
    } catch (error: any) {
      return {
        content: [
          {
            type: 'text',
            text: `Error capturing screenshots: ${error.message}`
          }
        ],
        isError: true
      };
    } finally {
      await this.closeBrowsers();
    }
  }

  private async getBrowser(browserName: string): Promise<Browser> {
    if (!this.browsers.has(browserName)) {
      let browser: Browser;
      
      switch (browserName) {
        case 'firefox':
          browser = await firefox.launch({ headless: true });
          break;
        case 'webkit':
          browser = await webkit.launch({ headless: true });
          break;
        case 'chromium':
        default:
          browser = await chromium.launch({ headless: true });
      }
      
      this.browsers.set(browserName, browser);
    }
    
    return this.browsers.get(browserName)!;
  }

  private async closeBrowsers(): Promise<void> {
    for (const browser of this.browsers.values()) {
      await browser.close();
    }
    this.browsers.clear();
  }

  private async executeAction(page: Page, action: any): Promise<void> {
    switch (action.type) {
      case 'click':
        await page.click(action.selector);
        break;
      case 'fill':
        await page.fill(action.selector, action.value);
        break;
      case 'select':
        await page.selectOption(action.selector, action.value);
        break;
      case 'hover':
        await page.hover(action.selector);
        break;
      case 'wait':
        if (action.selector) {
          await page.waitForSelector(action.selector);
        } else {
          await page.waitForTimeout(action.timeout || 1000);
        }
        break;
      case 'scroll':
        await page.evaluate((scrollPosition) => {
          window.scrollTo(0, scrollPosition || document.body.scrollHeight);
        }, action.position);
        break;
      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }
  }

  private async runAssertion(page: Page, assertion: any): Promise<void> {
    switch (assertion.type) {
      case 'visible':
        const isVisible = await page.isVisible(assertion.selector);
        if (!isVisible) {
          throw new Error(`Element ${assertion.selector} is not visible`);
        }
        break;
      case 'text':
        const text = await page.textContent(assertion.selector);
        if (!text?.includes(assertion.value)) {
          throw new Error(`Text "${assertion.value}" not found in ${assertion.selector}`);
        }
        break;
      case 'count':
        const elements = await page.$$(assertion.selector);
        if (elements.length !== assertion.value) {
          throw new Error(`Expected ${assertion.value} elements, found ${elements.length}`);
        }
        break;
      case 'attribute':
        const attr = await page.getAttribute(assertion.selector, assertion.attribute);
        if (attr !== assertion.value) {
          throw new Error(`Attribute ${assertion.attribute} has value "${attr}", expected "${assertion.value}"`);
        }
        break;
      case 'url':
        const currentUrl = page.url();
        if (!currentUrl.includes(assertion.value)) {
          throw new Error(`URL does not contain "${assertion.value}"`);
        }
        break;
      default:
        throw new Error(`Unknown assertion type: ${assertion.type}`);
    }
  }
}