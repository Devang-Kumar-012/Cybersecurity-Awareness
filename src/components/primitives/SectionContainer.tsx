import { ReactNode } from 'react';

type SectionContainerProps = {
  children: ReactNode;
  className?: string;
  as?: 'section' | 'div';
};

export function SectionContainer({ children, className = '', as: Component = 'section' }: SectionContainerProps) {
  return <Component className={['section-container', className].filter(Boolean).join(' ')}>{children}</Component>;
}
