import React from 'react';
import { useNavigate } from 'react-router-dom';

import {
  MY_STUDENTS_URL_PART,
  MY_MENTORS_URL_PART,
} from '../../../../../constants/paths';
import {
  ID_ROLE_MENTOR,
  ID_ROLE_STUDENT,
} from '../../../../../constants/constants';
import { useAppSelector } from '../../../../../../redux/hooks';
import { userGroupSelector } from '../../../../../../redux/user/selectors';
import s from './styles.module.scss';

export const ButtonBack = () => {
  const navigate = useNavigate();
  const userGroup = useAppSelector(userGroupSelector);

  const isMentor = userGroup === ID_ROLE_MENTOR;
  const isStudent = userGroup === ID_ROLE_STUDENT;

  const handleClick = () => {
    if (isMentor) {
      navigate(`/${MY_STUDENTS_URL_PART}`);
    } else if (isStudent) {
      navigate(`/${MY_MENTORS_URL_PART}`);
    }
  };

  return (
    <button className={s.button} onClick={handleClick}>
      <svg
        width='16'
        height='16'
        viewBox='0 0 16 16'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <g clipPath='url(#clip0_1442_22317)'>
          <path
            d='M0.861674 8.47132L5.52834 13.138C5.65408 13.2594 5.82248 13.3266 5.99727 13.3251C6.17207 13.3236 6.33928 13.2535 6.46289 13.1299C6.58649 13.0063 6.6566 12.8391 6.65812 12.6643C6.65964 12.4895 6.59245 12.3211 6.47101 12.1953L2.94234 8.66666L14.6663 8.66666C14.8432 8.66666 15.0127 8.59642 15.1377 8.4714C15.2628 8.34637 15.333 8.1768 15.333 7.99999C15.333 7.82318 15.2628 7.65361 15.1377 7.52859C15.0127 7.40356 14.8432 7.33333 14.6663 7.33333L2.94234 7.33332L6.47101 3.80466C6.53468 3.74316 6.58547 3.6696 6.62041 3.58826C6.65535 3.50693 6.67374 3.41944 6.67451 3.33093C6.67528 3.24241 6.65841 3.15462 6.62489 3.07269C6.59137 2.99076 6.54187 2.91632 6.47927 2.85373C6.41668 2.79113 6.34224 2.74163 6.26031 2.70811C6.17838 2.67459 6.09059 2.65772 6.00207 2.65849C5.91355 2.65926 5.82607 2.67765 5.74474 2.71259C5.6634 2.74753 5.58984 2.79832 5.52834 2.86199L0.861674 7.52866C0.736693 7.65368 0.666483 7.82322 0.666483 7.99999C0.666483 8.17677 0.736693 8.34631 0.861674 8.47132Z'
            fill='#1E1E20'
          />
        </g>
        <defs>
          <clipPath id='clip0_1442_22317'>
            <rect
              width='16'
              height='16'
              fill='white'
              transform='translate(16 16) rotate(-180)'
            />
          </clipPath>
        </defs>
      </svg>
    </button>
  );
};
