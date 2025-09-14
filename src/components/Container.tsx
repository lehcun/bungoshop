import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

const Container = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn('mx-auto max-w-7xl px-4', className)}>{children}</div>
  );
};

export default Container;
