import { ReactNode } from 'react';

type ButtonProps = {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md';
  className?: string;
  rightIcon?: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
};

export function Button({ children, variant = 'primary', size = 'md', className = '', rightIcon, onClick, disabled = false }: ButtonProps) {
  const base = 'btn';
  const variantClass = variant === 'secondary' ? 'btn-secondary' : 'btn-primary';
  const sizeClass = size === 'sm' ? 'btn-sm' : 'btn-md';

  return (
    <button className={[base, variantClass, sizeClass, className].filter(Boolean).join(' ')} onClick={onClick} disabled={disabled}>
      <span>{children}</span>
      {rightIcon ? <span className="btn-icon">{rightIcon}</span> : null}
    </button>
  );
}
