import React, { useMemo, useRef, useState } from 'react';

import { Dialog, InputDialog } from './components';

type Props = {
  chatId: number;
  courseId: number;
  studentId: number;
  idRecipient: number;
  heightBlock: number;
  refHeader?: React.RefObject<HTMLDivElement>;
  updateRender?: number;
  classNameInputDialog?: string;
  heightTotalHeader?: number;
};

export const Chat = ({
  chatId,
  courseId,
  studentId,
  idRecipient,
  heightBlock,
  refHeader,
  updateRender,
  classNameInputDialog,
  heightTotalHeader = 0,
}: Props) => {
  const refInputDialog: React.LegacyRef<HTMLDivElement> = useRef(null);

  const [countUpdate, setCountUpdate] = useState(0);

  const heightDialog = useMemo(() => {
    if (countUpdate) {
      const currentHeader = refHeader?.current;
      const { current: currentBottomBlock } = refInputDialog;

      if (currentBottomBlock) {
        const heightHeader = currentHeader?.offsetHeight || 0;
        const heightBottomBlock = currentBottomBlock.offsetHeight;

        const heightExtra =
          heightHeader + heightBottomBlock + heightTotalHeader;
        const heightDialog = heightBlock - heightExtra;

        return heightDialog;
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    refHeader?.current,
    heightBlock,
    heightTotalHeader,
    updateRender,
    countUpdate,
    refInputDialog,
  ]);

  return (
    <>
      <Dialog
        chatId={chatId}
        courseId={courseId}
        studentId={studentId}
        heightDialog={heightDialog ?? 0}
      />
      <InputDialog
        ref={refInputDialog}
        courseId={courseId}
        studentId={studentId}
        idRecipient={idRecipient}
        classNameInputDialog={classNameInputDialog}
        setCountUpdate={setCountUpdate}
      />
    </>
  );
};
