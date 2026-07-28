import { ReactNode } from 'react';

type SectionHeadingProps = {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  className?: string;
};

export function SectionHeading({ eyebrow, title, description, className = '' }: SectionHeadingProps) {
  return (
    <div className={['section-heading', className].filter(Boolean).join(' ')}>
      {eyebrow ? <div className="section-eyebrow">{eyebrow}</div> : null}
      <h2>{title}</h2>
      {description ? <p>{description}</p> : null}
    </div>
  );
}
