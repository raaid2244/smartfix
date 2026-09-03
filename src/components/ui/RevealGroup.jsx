import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function RevealGroup({ children, className = "", delay = 0, once = true }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || !containerRef.current) return;

    let ctx = gsap.context(() => {
      const container = containerRef.current;
      
      // Select the standardized elements
      const eyebrow = container.querySelector('.section-eyebrow');
      const paragraph = container.querySelector('.section-paragraph');
      const headingWords = container.querySelectorAll('.heading-word');
      
      // Select all direct children to find "other" elements
      const directChildren = Array.from(container.children);
      const others = directChildren.filter(child => {
        return !child.classList.contains('section-eyebrow') && 
               !child.classList.contains('section-heading') && 
               !child.classList.contains('section-paragraph') &&
               !child.querySelector('.heading-word');
      });

      // Reset starting positions
      if (eyebrow) gsap.set(eyebrow, { opacity: 0, y: 15 });
      if (headingWords.length) gsap.set(headingWords, { y: '120%' });
      if (paragraph) gsap.set(paragraph, { opacity: 0, y: 20 });
      if (others.length) gsap.set(others, { opacity: 0, y: 30 });

      // Build the Master Expertise Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top 85%',
          toggleActions: once ? 'play none none none' : 'play none none reverse',
        }
      });

      let nextStartTime = delay;

      // 1. Reveal Label
      if (eyebrow) {
        tl.to(eyebrow, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, nextStartTime);
        nextStartTime += 0.2; 
      }

      // 2. Reveal Heading
      if (headingWords.length) {
        // Group by line dynamically
        let currentTop = -1;
        let currentLine = -1;
        headingWords.forEach(word => {
          const mask = word.parentElement;
          if (Math.abs(mask.offsetTop - currentTop) > 5) {
            currentTop = mask.offsetTop;
            currentLine++;
          }
          word.dataset.line = currentLine;
        });

        tl.to(headingWords, {
          y: '0%',
          duration: 1.0,
          ease: 'power4.out',
          stagger: (i, t) => parseInt(t.dataset.line) * 0.15
        }, nextStartTime);
        
        nextStartTime += 0.3; // wait slightly before paragraphs
      }

      // 3. Reveal Paragraph
      if (paragraph) {
        tl.to(paragraph, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, nextStartTime);
        nextStartTime += 0.2;
      }

      // 4. Reveal Rest
      if (others.length) {
        tl.to(others, { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' }, nextStartTime);
      }

    }, containerRef);

    // Add resize listener to recalculate lines
    const handleResize = () => {
      if (!containerRef.current) return;
      const headingWords = containerRef.current.querySelectorAll('.heading-word');
      let currentTop = -1;
      let currentLine = -1;
      headingWords.forEach(word => {
        const mask = word.parentElement;
        if (Math.abs(mask.offsetTop - currentTop) > 5) {
          currentTop = mask.offsetTop;
          currentLine++;
        }
        word.dataset.line = currentLine;
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      ctx.revert();
    };
  }, [delay, once]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}

export function RevealLine({ children, className = "", delay = 0, yOffset = 30 }) {
  const lineRef = useRef(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || !lineRef.current) return;

    let ctx = gsap.context(() => {
      gsap.fromTo(lineRef.current,
        { opacity: 0, y: yOffset },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          delay: delay,
          scrollTrigger: {
            trigger: lineRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          }
        }
      );
    }, lineRef);

    return () => ctx.revert();
  }, [delay, yOffset]);

  return (
    <div ref={lineRef} className={className}>
      {children}
    </div>
  );
}
