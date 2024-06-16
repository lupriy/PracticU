export type FileUploadProps = {
  labelId: number;
  onClick: (
    event?: React.MouseEvent<HTMLButtonElement>
  ) => Promise<number | undefined>;
  handleChatClick: () => void;
};
