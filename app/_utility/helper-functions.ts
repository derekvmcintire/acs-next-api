export const getYearFromDateString = (dateString: string): number => {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    throw new Error("Invalid date string");
  }

  return date.getFullYear();
};
