export const preventBodyScrolling = (popupOpened: boolean) => {
  if (popupOpened) {
    document.body.style.overflow = 'hidden';
    document.body.style.height = '100%';
  } else {
    document.body.style.overflow = 'auto';
    document.body.style.height = 'auto';
  }
};
