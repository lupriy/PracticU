export type MessageInfo = {
  avatar: string;
  name: string;
  text: string;
  date: string;
};

export type StateMessageInfo = MessageInfo | null;

export type ParamsAsyncEffect = {
  text: string;
  date: string;
  id: number;
};
