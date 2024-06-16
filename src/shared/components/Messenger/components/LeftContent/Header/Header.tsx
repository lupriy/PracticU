import React, { forwardRef } from 'react';

import { useAppSelector } from '../../../../../../redux/hooks';
import { userGroupSelector } from '../../../../../../redux/user/selectors';
import { ID_ROLE_MENTOR } from '../../../../../constants/constants';
import { Tabs, Search } from '../';
import s from './styles.module.scss';

export const Header = forwardRef(
  (props, ref: React.LegacyRef<HTMLDivElement>) => {
    const userGroup = useAppSelector(userGroupSelector);

    const isMentor = userGroup === ID_ROLE_MENTOR;
    const text = isMentor ? 'Мои ученики' : 'Мои наставники';

    return (
      <div className={s.block} ref={ref}>
        {userGroup && <div className={s.header}>{text}</div>}
        {isMentor && (
          <>
            <Tabs />
            <Search />
          </>
        )}
      </div>
    );
  }
);
