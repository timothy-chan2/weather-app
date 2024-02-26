const getLongDate = (dateObject = new Date()) => {
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

const getCurrentTime = () => {
  const currentDate = new Date();
  const currentTime = currentDate.toLocaleTimeString();
 
  return currentTime;
};

const getCurrentDateInMilliseconds = () => {
  const currentDate = new Date();
  const currentDateInMilliseconds = Date.parse(currentDate.toString());

  return currentDateInMilliseconds;
};

export { getLongDate, getShortDate, getCurrentTime, getCurrentDateInMilliseconds };