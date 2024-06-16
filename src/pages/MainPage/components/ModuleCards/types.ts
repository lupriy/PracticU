import React from 'react';

export type ModuleCardProps = {
  number: number;
  title: string;
  description: React.ReactNode;
  progress: Progress | null;
  isLocked?: boolean | null;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
};

type Progress = {
  total: number;
  done: number;
};
