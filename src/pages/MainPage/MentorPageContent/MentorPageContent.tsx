//УДАЛИТЬ ФАЙЛ

import { useCallback, useEffect, useRef, useState } from 'react';
import { Modal, DialogContent, Tab, useMediaQuery } from '@mui/material';
import cn from 'classnames';

import {
  api,
  PaginatedTaskResultContentList,
  TaskResultContent,
} from '../../../api';
import { StyledTabs } from '../../../shared/components/mui-styled/Tabs';
import {
  MEDIA_QUERY_DESKTOP,
  MEDIA_QUERY_MOBILE,
  MEDIA_QUERY_TABLET,
} from '../../../shared/theme/mediaQuery';
import { StudentTaskResultCard } from './StudentTaskResultCard';
import { TaskResultModal } from './TaskResultModal';
import { MentorPageContentProps } from './types';
import styles from './styles.module.scss';

export const MentorPageContent = ({ className }: MentorPageContentProps) => {
  const ref: React.LegacyRef<HTMLDivElement> = useRef(null);
  const [taskResultList, setTaskResultList] =
    useState<PaginatedTaskResultContentList>();
  const [currentTaskResult, setCurrentTaskResult] =
    useState<TaskResultContent | null>(null);
  const [tabValue, setTabValue] = useState(0);
  const [openModal, setOpenModal] = useState(false);

  const matchesDesktop = useMediaQuery(MEDIA_QUERY_DESKTOP);
  const matchesTablet = useMediaQuery(MEDIA_QUERY_TABLET);
  const matchesMobile = useMediaQuery(MEDIA_QUERY_MOBILE);

  const updateTaskResultList = useCallback(async () => {
    const response = await api.taskResult.taskResultList({ group: 'mentor' });
    response.ok && setTaskResultList(response.data);
  }, []);

  useEffect(() => {
    updateTaskResultList();
  }, [updateTaskResultList]);

  const handleTabChange = useCallback((event, newValue: number) => {
    setTabValue(newValue);
  }, []);

  const handleOpenModal = useCallback((result: TaskResultContent) => {
    setOpenModal(true);
    setCurrentTaskResult(result);
  }, []);

  const handleCloseModal = useCallback(() => {
    setOpenModal(false);
    setCurrentTaskResult(null);
  }, []);

  const shouldRenderCard = (result: TaskResultContent) => {
    // TODO: Заменить на фильтры в query
    if (
      result.task.type === 'detailed_answer_task' ||
      result.task.type === 'project_task'
    )
      return result.task;
  };

  const handleTask = useCallback(
    async (accept: boolean) => {
      try {
        const id = currentTaskResult?.id;

        if (accept && id) {
          await api.taskResult.taskResultAcceptCreate(id);
        } else if (id) {
          await api.taskResult.taskResultDeclineCreate(id);
        }

        updateTaskResultList();
        handleCloseModal();
      } catch (e) {
        console.error(e);
      }
    },
    [currentTaskResult, updateTaskResultList, handleCloseModal]
  );

  const handleAccept = useCallback(() => handleTask(true), [handleTask]);
  const handleReject = useCallback(() => handleTask(false), [handleTask]);

  const isActiveFirstTab = tabValue === 0;
  const isActiveSecondTab = tabValue === 1;

  return (
    <div className={cn(styles.container, className)}>
      <h1>Мои ученики</h1>
      <StyledTabs
        value={tabValue}
        onChange={handleTabChange}
        textColor='inherit'
        className={styles.tabs}
      >
        <Tab label='Требуют проверки' />
        <Tab label='Завершено' />
      </StyledTabs>
      <div className={styles.content}>
        {taskResultList?.results
          ?.filter(result => {
            return isActiveFirstTab
              ? result.accepted === null
              : result.accepted || result.accepted === false;
          })
          .map(result => {
            const {
              id,
              student: {
                first_name: firstName,
                last_name: lastName,
                id: studentId,
              },
              task: {
                course: { name: courseName, id: courseId },
                module: { position },
              },
              created_at: createdAt,
            } = result;

            //const studentTaskText: string = JSON.parse(result?.content)?.text;

            return (
              shouldRenderCard(result) && (
                <StudentTaskResultCard
                  key={id}
                  studentId={studentId}
                  courseId={courseId}
                  isActiveSecondTab={isActiveSecondTab}
                  matchesMobile={matchesMobile}
                  matchesTablet={matchesTablet}
                  firstName={firstName}
                  lastName={lastName}
                  courseName={courseName}
                  position={position}
                  createdAt={createdAt}
                  isActiveFirstTab={isActiveFirstTab}
                  onClick={() => handleOpenModal(result)}
                />
              )
            );
          })}
      </div>
      <Modal open={openModal} onClose={handleCloseModal}>
        <DialogContent style={{ border: 'none', padding: 0 }}>
          <TaskResultModal
            ref={ref}
            id={currentTaskResult?.id ?? 0}
            onAccept={handleAccept}
            onReject={handleReject}
            withButtons={isActiveFirstTab}
            /* content={currentTaskResult?.content} */
            attachments={currentTaskResult?.attachments ?? []}
            currentTaskResultId={currentTaskResult?.id ?? 0}
            matchesDesktop={matchesDesktop}
          />
        </DialogContent>
      </Modal>
    </div>
  );
};
