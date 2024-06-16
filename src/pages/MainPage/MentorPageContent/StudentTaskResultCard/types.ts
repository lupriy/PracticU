export type StudentTaskResultCardProps = {
  studentId: number;
  courseId: number;
  isActiveFirstTab: boolean;
  isActiveSecondTab: boolean;
  matchesMobile: boolean;
  matchesTablet: boolean;
  firstName: string;
  lastName: string;
  courseName: string;
  position: number;
  createdAt: string;
  className?: string;
  onClick?: () => void;
};
