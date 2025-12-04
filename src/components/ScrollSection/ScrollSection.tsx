import { useRef, forwardRef } from 'react';

type Theme = 'empire' | 'village' | 'transition';

interface ScrollSectionProps {
  id: string;
  theme?: Theme;
  className?: string;
  children: React.ReactNode;
}

const themeStyles: Record<Theme, string> = {
  empire: 'bg-empire-bg text-text-light',
  village: 'bg-village-bg text-text-dark',
  transition: 'bg-gradient-to-b from-empire-bg to-village-bg',
};

export const ScrollSection = forwardRef<HTMLElement, ScrollSectionProps>(
  ({ id, theme = 'empire', className = '', children }, ref) => {
    const internalRef = useRef<HTMLElement>(null);
    const sectionRef = ref || internalRef;

    return (
      <section
        id={id}
        ref={sectionRef}
        data-theme={theme}
        className={`relative min-h-screen w-full ${themeStyles[theme]} ${className}`}
      >
        {children}
      </section>
    );
  }
);

ScrollSection.displayName = 'ScrollSection';
