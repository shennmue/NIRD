import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface UseScrollAnimationOptions {
  trigger?: string | Element;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  pin?: boolean;
  markers?: boolean;
  onEnter?: () => void;
  onLeave?: () => void;
  onEnterBack?: () => void;
  onLeaveBack?: () => void;
}

export const useScrollAnimation = (options: UseScrollAnimationOptions = {}) => {
  const ref = useRef<HTMLElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const {
      start = 'top top',
      end = 'bottom top',
      scrub = true,
      pin = false,
      markers = false,
      onEnter,
      onLeave,
      onEnterBack,
      onLeaveBack,
    } = options;

    timelineRef.current = gsap.timeline({
      scrollTrigger: {
        trigger: ref.current,
        start,
        end,
        scrub,
        pin,
        markers,
        onEnter,
        onLeave,
        onEnterBack,
        onLeaveBack,
      },
    });

    return () => {
      timelineRef.current?.kill();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === ref.current) {
          trigger.kill();
        }
      });
    };
  }, [options]);

  return { ref, timeline: timelineRef };
};
