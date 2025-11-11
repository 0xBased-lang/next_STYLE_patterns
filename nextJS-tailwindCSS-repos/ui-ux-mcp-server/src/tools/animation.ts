import { z } from 'zod';

const AnimationTimelineSchema = z.object({
  library: z.enum(['framer-motion', 'gsap']).default('framer-motion'),
  animations: z.array(z.object({
    target: z.string(),
    properties: z.record(z.any()),
    duration: z.number().optional(),
    delay: z.number().optional(),
    easing: z.string().optional()
  }))
});

const AnimationPreviewSchema = z.object({
  timeline: z.any(),
  format: z.enum(['gif', 'mp4', 'webm']).default('gif')
});

export class AnimationTools {
  constructor() {}

  async createTimeline(args: any) {
    const params = AnimationTimelineSchema.parse(args);
    
    try {
      let timeline: any;
      
      if (params.library === 'framer-motion') {
        timeline = this.createFramerMotionTimeline(params.animations);
      } else {
        timeline = this.createGSAPTimeline(params.animations);
      }

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              library: params.library,
              timeline,
              usage: this.getUsageExample(params.library),
              totalDuration: this.calculateTotalDuration(params.animations)
            }, null, 2)
          }
        ]
      };
    } catch (error: any) {
      return {
        content: [
          {
            type: 'text',
            text: `Error creating animation timeline: ${error.message}`
          }
        ],
        isError: true
      };
    }
  }

  async preview(args: any) {
    const params = AnimationPreviewSchema.parse(args);
    
    try {
      // Simulate animation preview generation
      const previewData = {
        format: params.format,
        duration: this.getTimelineDuration(params.timeline),
        frames: params.format === 'gif' ? 30 : 60,
        size: {
          width: 800,
          height: 600
        },
        preview: {
          url: `preview_${Date.now()}.${params.format}`,
          message: 'Preview generated successfully (simulated)'
        }
      };

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(previewData, null, 2)
          }
        ]
      };
    } catch (error: any) {
      return {
        content: [
          {
            type: 'text',
            text: `Error generating preview: ${error.message}`
          }
        ],
        isError: true
      };
    }
  }

  private createFramerMotionTimeline(animations: any[]): any {
    const variants: any = {};
    const sequence: any[] = [];
    
    animations.forEach((anim, index) => {
      const variantName = `step${index}`;
      variants[variantName] = {
        ...anim.properties,
        transition: {
          duration: anim.duration || 0.3,
          delay: anim.delay || 0,
          ease: this.convertToFramerEasing(anim.easing)
        }
      };
      
      sequence.push({
        target: anim.target,
        variant: variantName,
        at: anim.delay || index * 0.1
      });
    });

    return {
      type: 'framer-motion',
      variants,
      sequence,
      code: this.generateFramerMotionCode(variants, sequence)
    };
  }

  private createGSAPTimeline(animations: any[]): any {
    const timeline: any[] = [];
    
    animations.forEach((anim) => {
      timeline.push({
        target: anim.target,
        vars: {
          ...anim.properties,
          duration: anim.duration || 0.3,
          delay: anim.delay || 0,
          ease: this.convertToGSAPEasing(anim.easing)
        }
      });
    });

    return {
      type: 'gsap',
      timeline,
      code: this.generateGSAPCode(timeline)
    };
  }

  private convertToFramerEasing(easing?: string): string {
    const easingMap: any = {
      'ease-in': 'easeIn',
      'ease-out': 'easeOut',
      'ease-in-out': 'easeInOut',
      'linear': 'linear',
      'bounce': [0.68, -0.55, 0.265, 1.55],
      'elastic': [0.175, 0.885, 0.32, 1.275]
    };
    
    return easingMap[easing || 'ease-in-out'] || 'easeInOut';
  }

  private convertToGSAPEasing(easing?: string): string {
    const easingMap: any = {
      'ease-in': 'power2.in',
      'ease-out': 'power2.out',
      'ease-in-out': 'power2.inOut',
      'linear': 'none',
      'bounce': 'bounce.out',
      'elastic': 'elastic.out'
    };
    
    return easingMap[easing || 'ease-in-out'] || 'power2.inOut';
  }

  private generateFramerMotionCode(variants: any, sequence: any[]): string {
    return `
import { motion, useAnimation } from 'framer-motion';

const variants = ${JSON.stringify(variants, null, 2)};

function AnimatedComponent() {
  const controls = useAnimation();
  
  const runAnimation = async () => {
    ${sequence.map(s => `
    await controls.start('${s.variant}');`).join('')}
  };
  
  return (
    <motion.div
      variants={variants}
      animate={controls}
      onClick={runAnimation}
    >
      {/* Your content */}
    </motion.div>
  );
}`;
  }

  private generateGSAPCode(timeline: any[]): string {
    return `
import { gsap } from 'gsap';
import { useEffect, useRef } from 'react';

function AnimatedComponent() {
  const containerRef = useRef(null);
  
  useEffect(() => {
    const tl = gsap.timeline();
    ${timeline.map(t => `
    tl.to('${t.target}', ${JSON.stringify(t.vars, null, 2)});`).join('')}
    
    return () => tl.kill();
  }, []);
  
  return (
    <div ref={containerRef}>
      {/* Your content */}
    </div>
  );
}`;
  }

  private calculateTotalDuration(animations: any[]): number {
    let maxEndTime = 0;
    
    animations.forEach(anim => {
      const startTime = anim.delay || 0;
      const duration = anim.duration || 0.3;
      const endTime = startTime + duration;
      maxEndTime = Math.max(maxEndTime, endTime);
    });
    
    return maxEndTime;
  }

  private getTimelineDuration(timeline: any): number {
    if (timeline?.type === 'framer-motion') {
      return Object.keys(timeline.variants || {}).length * 0.3;
    } else if (timeline?.type === 'gsap') {
      return (timeline.timeline || []).length * 0.3;
    }
    return 1;
  }

  private getUsageExample(library: string): string {
    if (library === 'framer-motion') {
      return 'npm install framer-motion\n// Import and use the generated code in your React component';
    } else {
      return 'npm install gsap\n// Import and use the generated code in your component';
    }
  }
}