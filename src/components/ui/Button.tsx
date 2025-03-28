'use client';

import { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
};

export function Button({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  className = '', 
  ...props 
}: ButtonProps) {
  const baseStyles = 'rounded-lg font-semibold transition-colors';
  
  const variants = {
    primary: 'bg-purple-600 text-white hover:bg-purple-700',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
    outline: 'border-2 border-purple-600 text-purple-600 hover:bg-purple-50'
  };

  const sizes = {
    sm: 'px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm',
    md: 'px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base',
    lg: 'px-4 sm:px-6 py-2 sm:py-3 text-base sm:text-lg'
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
} 