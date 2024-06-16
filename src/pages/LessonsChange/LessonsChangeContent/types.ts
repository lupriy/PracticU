export type TDataChangeItem = {
  id: number;
  position: number;
  value: string;
  type: string;
  header?: string;
  isTaskRequired?: boolean;
  text?: string;
  photoLabel?: string;
  language?: string;
  options?: any;
  content?: any;
};

export type TDataChange = Record<number, TDataChangeItem>;

// если type = тип из элемента текстового блока, то value = Markdown
