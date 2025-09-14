import React, { ReactNode } from 'react';

const Container = ({ children }: { children: ReactNode }) => {
  return <div className="mx-auto max-w-7xl px-4">{children}</div>;
};

export default Container;
