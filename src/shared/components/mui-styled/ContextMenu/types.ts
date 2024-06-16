import React from 'react';

export type ContextMenuProps = {
  list: ListProp;
  className?: string;
};

type ListProp = {
  content: React.ReactNode;
  color?: string;
  onClick: () => void;
  iconName?: string;
}[];
