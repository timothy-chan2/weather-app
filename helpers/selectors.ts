const getLongDate = (defaultDate) => {
  const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
  'August', 'September', 'October', 'November', 'December'][defaultDate.getMonth()];
  const longDate = `${month} ${defaultDate.getDate()}, ${defaultDate.getFullYear()}`;

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