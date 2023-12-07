export const formatDate = (date: Date) => {
  const dateToFormat = new Date(date);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  if (dateToFormat.toDateString() === yesterday.toDateString()) {
    return 'yesterday';
  } else if (date < yesterday) {
    const day = dateToFormat.getDate();
    const month = dateToFormat.getMonth() + 1;
    const year = dateToFormat.getFullYear();

    return `${month}/${day}/${year}`;
  } else {
    const hours = dateToFormat.getHours();
    const minutes = dateToFormat.getMinutes();

    return `${hours}:${minutes}`;
  }
};
