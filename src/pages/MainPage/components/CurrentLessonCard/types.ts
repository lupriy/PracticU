import React from 'react';
import { Theme } from '@mui/material';

export type CurrentLessonCardProps = {
  module: number | undefined;
  lesson: number | undefined;
  courseName: string | undefined;
  title: string | null | undefined;
  children: React.ReactNode;
  className?: string;
};
