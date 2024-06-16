import React, { useMemo, useState } from 'react';

import { Tab } from './Tab';
import { TypeMessenger } from '../types';
import { ID_TYPE_MESSENGER_NOT_VERIFIED } from '../constants';
import { TABS } from './constants';
import s from './styles.module.scss';

export const Tabs = () => {
  const [tabSelect, setTabSelect] = useState<TypeMessenger>(
    ID_TYPE_MESSENGER_NOT_VERIFIED
  );

  const displayTabs = useMemo(
    () =>
      TABS.map(({ id, lable }) => {
        const isActive = id === tabSelect;

        return (
          <Tab
            key={id}
            id={id}
            lable={lable}
            isActive={isActive}
            setTabSelect={setTabSelect}
          />
        );
      }),
    [tabSelect]
  );

  return <div className={s.tabs}>{displayTabs}</div>;
};
