export const getElemByDataId = (dataId: string) => {
  return document.body.querySelector(`[data-id=${dataId}]`) as HTMLElement;
};
