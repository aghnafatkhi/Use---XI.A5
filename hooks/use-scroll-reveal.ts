'use client';

import { useEffect } from 'react';

export function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // observer.unobserve(entry.target); // keep it to animate again? Guidelines say add class visible.
          }
        });
      },
      {
        threshold: 0.1,
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
