export const formatWeekDate = (date: string): string => {
  const currentDate = new Date();
  const messageDate = new Date(date);

  if (currentDate.toDateString() === messageDate.toDateString()) {
    return 'Today';
  } else if (currentDate.getDate() - messageDate.getDate() === 1) {
    return 'Yesterday';
  } else {
    return messageDate.toLocaleDateString('en-US', { weekday: 'long' });
  }
};

export const timeFormat = (date: Date) => {
  const formatTwoDigits = (number: number) => {
    return number < 10 ? '0' + number : number;
  };

  const hours = formatTwoDigits(date.getHours());
  const minutes = formatTwoDigits(date.getMinutes());

  return `${hours}:${minutes}`;
};

export const formatDate = (date: Date) => {
  const dateToFormat = new Date(date);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  if (dateToFormat.toDateString() === yesterday.toDateString()) {
    return 'Yesterday';
  } else if (dateToFormat < yesterday) {
    return dateToFormat.toLocaleDateString('en-US', { weekday: 'long' });
  } else {
    const hours = dateToFormat.getHours();
    const minutes = dateToFormat.getMinutes();

    return `${hours}:${minutes}`;
  }
};
