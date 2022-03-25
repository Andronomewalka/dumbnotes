let revalidate = 0;
export const getRevalidateValue = () => {
  if (!revalidate) {
    revalidate = parseInt(process.env.PAGE_REVALIDATE_TIME_S || '1800');
  }
  return revalidate;
};
