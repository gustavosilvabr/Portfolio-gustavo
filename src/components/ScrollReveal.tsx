
import { useEffect, useRef, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  threshold?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
}

const ScrollReveal = ({
  children,
  className,
  delay = 0,
  threshold = 0.1,
  direction = 'up',
  distance = 20,
}: ScrollRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              element.classList.add('active');
            }, delay);
            observer.unobserve(element);
          }
        });
      },
      {
        threshold,
        rootMargin: '0px',
      }
    );
    
    observer.observe(element);
    
    return () => {
      if (element) observer.unobserve(element);
    };
  }, [delay, threshold]);
  
  const getDirectionStyles = () => {
    switch (direction) {
      case 'up':
        return `translateY(${distance}px)`;
      case 'down':
        return `translateY(-${distance}px)`;
      case 'left':
        return `translateX(${distance}px)`;
      case 'right':
        return `translateX(-${distance}px)`;
      case 'none':
        return 'none';
      default:
        return `translateY(${distance}px)`;
    }
  };
  
  return (
    <div
      ref={ref}
      className={cn('reveal', className)}
      style={{
        transform: getDirectionStyles(),
      }}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;
