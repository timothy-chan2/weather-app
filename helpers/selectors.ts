const getLongDate = (dateObject: Date) => {
  const day = dateObject.getDate();
  const monthName = dateObject.toLocaleString('default', { month: 'long' });
  const year = dateObject.getFullYear();
  const longDate = `${monthName} ${day}, ${year}`;

  return longDate;
};

const getShortDate = (dateObject: Date) => {
  const padTo2Digits = (num: number) => {
    return num.toString().padStart(2, '0');
  };

  const year = dateObject.getFullYear();
  const monthNumber = padTo2Digits(dateObject.getMonth() + 1);
  const day = padTo2Digits(dateObject.getDate());
  const shortDate = `${year}-${monthNumber}-${day}`;

  return shortDate;
};

const getCurrentTime = (typeOfTime: string) => {
  const currentDate = new Date();
  let currentTime: string | number;

  if (typeOfTime === 'human') {
    currentTime = currentDate.toLocaleTimeString();
  } else if (typeOfTime === 'milliseconds') {
    currentTime = Date.parse(currentDate.toString());
  }

  return currentTime;
};

export { getLongDate, getShortDate, getCurrentTime };