import { useEffect } from 'react';
import { useMediaQuery } from './useMediaQuery';

export function useImageReveals() {
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  useEffect(() => {
    if (reducedMotion) return;
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('image-arrived');
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.15 });
    document.querySelectorAll('[data-reveal="image"]').forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [reducedMotion]);
}
