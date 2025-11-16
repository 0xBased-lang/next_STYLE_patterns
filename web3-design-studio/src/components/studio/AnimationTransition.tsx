"use client";

import { useEffect, useState, useRef } from "react";
import { useStudioStore } from "@/lib/store/studio";
import type { AnimationType } from "@/lib/types/animation";

interface AnimationTransitionProps {
  children: React.ReactNode;
  currentAnimation: AnimationType;
}

const allAnimations: AnimationType[] = [
  "matrix",
  "fluid",
  "aurora",
  "particle",
  "glitch",
  "neonTrails",
  "morphBlob",
  "cosmic",
  "dnaHelix",
  "waveInterference",
  "plasma",
  "fractal",
  "lightning",
  "tessellation",
  "fire",
];

export function AnimationTransition({ children, currentAnimation }: AnimationTransitionProps) {
  const {
    transitionType,
    transitionDuration,
    autoRotate,
    autoRotateInterval,
    setActiveAnimation,
  } = useStudioStore();

  const [isTransitioning, setIsTransitioning] = useState(false);
  const [opacity, setOpacity] = useState(1);
  const previousAnimation = useRef<AnimationType>(currentAnimation);
  const autoRotateTimer = useRef<NodeJS.Timeout | null>(null);

  // Handle transitions when animation changes
  useEffect(() => {
    if (previousAnimation.current !== currentAnimation && transitionType !== "none") {
      setIsTransitioning(true);

      if (transitionType === "fade") {
        // Fade out then fade in
        setOpacity(0);
        setTimeout(() => {
          setOpacity(1);
          setIsTransitioning(false);
        }, transitionDuration);
      } else if (transitionType === "crossfade") {
        // Simple opacity transition
        setOpacity(0);
        setTimeout(() => {
          setOpacity(1);
        }, 50);
        setTimeout(() => {
          setIsTransitioning(false);
        }, transitionDuration);
      }

      previousAnimation.current = currentAnimation;
    }
  }, [currentAnimation, transitionType, transitionDuration]);

  // Handle auto-rotate
  useEffect(() => {
    if (autoRotate) {
      autoRotateTimer.current = setInterval(() => {
        const currentIndex = allAnimations.indexOf(currentAnimation);
        const nextIndex = (currentIndex + 1) % allAnimations.length;
        setActiveAnimation(allAnimations[nextIndex]);
      }, autoRotateInterval);
    }

    return () => {
      if (autoRotateTimer.current) {
        clearInterval(autoRotateTimer.current);
      }
    };
  }, [autoRotate, autoRotateInterval, currentAnimation, setActiveAnimation]);

  return (
    <div
      className="transition-opacity"
      style={{
        opacity,
        transitionDuration: transitionType === "none" ? "0ms" : `${transitionDuration}ms`,
      }}
    >
      {children}
    </div>
  );
}
