export type PopupProps = {
  opened: boolean;
  setOpened: (prevState: boolean) => void;
  children: React.ReactNode;
};
