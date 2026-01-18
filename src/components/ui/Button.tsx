'use client';

import Link from 'next/link';
import { ReactNode } from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ButtonProps {
  variant?:
    | 'primary'
    | 'secondary'
    | 'outline'
    | 'ghost'
    | 'danger'
    | 'link'
    | 'custom';
  size?: 'sm' | 'md' | 'lg';
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  loading?: boolean;
  disabled?: boolean;
  href?: string;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

export default function Button({
  variant = 'primary',
  size = 'md',
  iconLeft,
  iconRight,
  loading = false,
  disabled = false,
  href,
  className,
  children,
  onClick,
  type = 'button',
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variants = {
    primary:
      'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 disabled:bg-blue-200',
    secondary:
      'bg-gray-100 text-gray-800 hover:bg-gray-200 focus:ring-gray-400 disabled:bg-gray-100',
    outline:
      'border border-blue-500 text-blue-600 hover:bg-blue-50 focus:ring-blue-400 disabled:border-gray-300 disabled:text-gray-400',
    ghost:
      'text-gray-700 hover:bg-gray-100 focus:ring-gray-300 disabled:text-gray-400',
    danger:
      'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 disabled:bg-red-300',
    link: 'text-blue-600 underline-offset-4 hover:underline focus:ring-0 px-0',
    custom: '',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const content = (
    <>
      {loading && <Loader2 className="h-4 w-4 animate-spin" />}
      {!loading && iconLeft && <span className="text-lg">{iconLeft}</span>}
      <span>{children}</span>
      {!loading && iconRight && <span className="text-lg">{iconRight}</span>}
    </>
  );

  const classes = cn(baseStyles, variants[variant], sizes[size], className);

  // Nếu có href → dùng Link (Next.js)
  if (href) {
    return (
      <Link
        href={href}
        className={cn(classes, disabled && 'pointer-events-none opacity-60')}
      >
        {content}
      </Link>
    );
  }

  // Ngược lại → là nút thường
  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={classes}
    >
      {content}
    </button>
  );
}
