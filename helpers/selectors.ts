const getLongDate = (dateObject: Date) => {
  const day = dateObject.getDate();
  const monthName = dateObject.toLocaleString('default', { month: 'long' });
  const year = dateObject.getFullYear();
  const longDate = `${monthName} ${day}, ${year}`;

  return longDate;
};

const getShortDate = (dateObject) => {
  const padTo2Digits = (num) => {
    return num.toString().padStart(2, '0');
  };

  return [
    dateObject.getFullYear(),
    padTo2Digits(dateObject.getMonth() + 1),
    padTo2Digits(dateObject.getDate()),
  ].join('-');
};

const getCurrentTime = () => {
  const currentDate = new Date();
  const currentTime = currentDate.getHours() + ':' + currentDate.getMinutes()
  + ':' + currentDate.getSeconds();

  return currentTime;
};

export { getLongDate, getShortDate, getCurrentTime };