'use client';

import { useEffect } from 'react';

export function useScrollReveal() {
  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      // If reduced motion is on, just make everything visible immediately
      const elements = document.querySelectorAll('.sr-up, .sr-left, .sr-right, .sr-fade');
      elements.forEach(el => el.classList.add('visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove('sr-hidden');
            entry.target.classList.add('visible');
            // Once visible, we can stop observing this specific element
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px' // Start triggering slightly before it enters
      }
    );

    const elements = document.querySelectorAll('.sr-up, .sr-left, .sr-right, .sr-fade');
    elements.forEach((el) => {
      el.classList.add('sr-hidden');
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);
}
