import React from 'react';

import s from './PanelNewBlock.module.scss';

type TPropsItem = {
  id: string;
  name: string;
  icon: React.SVGProps<SVGSVGElement>;
  setNewBlockId: React.Dispatch<React.SetStateAction<string>>;
};

const Item = ({ id, name, icon, setNewBlockId }: TPropsItem) => {
  const handleSaveId = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { id } = e.currentTarget;
    setNewBlockId(id);
  };

  return (
    <div className={s.item} id={id} onClick={handleSaveId}>
      {icon}
      <p>{name}</p>
    </div>
  );
};

type TPropsColumn = {
  id: string;
  list: TPropsItem[];
  setNewBlockId: React.Dispatch<React.SetStateAction<string>>;
};
export const Column = ({ id, list, setNewBlockId }: TPropsColumn) => {
  return (
    <div className={s.column}>
      <p>
        {id === 'textBlocks' && 'Текстовые блоки'}
        {id === 'lessonStructure' && 'Структура урока'}
        {id === 'media' && 'Медиа'}
        {id === 'tasks' && 'Задания'}
      </p>
      {list.map(({ id, name, icon }) => (
        <Item
          key={id}
          id={id}
          name={name}
          icon={icon}
          setNewBlockId={setNewBlockId}
        />
      ))}
    </div>
  );
};
