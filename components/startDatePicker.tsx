import { useState, useMemo } from 'react';
import DatePicker from 'sassy-datepicker';

import { getLongDate } from '../helpers/selectors';

import space from '../styles/Spacestagram.module.css';
import styles from '../styles/StartDatePicker.module.css';

// The StartDatePicker component shows the button to open the calendar
const StartDatePicker = (props) => {
  const [visible, setVisible] = useState(false);

  const longStartDate = useMemo(
    () => getLongDate(new Date(props.date)),
    [props.date]
  );
  
  const currentLongDate = getLongDate();

  const handleDateSelect = (newDate) => {
    props.setDate(newDate);
    setVisible(false);
    props.setPosts([]);
  };

  const togglePicker = () => setVisible(prev => !prev);
  
  return (
    <form>
      <button
        onClick={togglePicker}
        className={`${styles.startDatePickerBtn} ${space.spaceButton}`}
        type='button'
        aria-controls='calendar'
      >
        Pick Start Date
      </button>
      {longStartDate === currentLongDate &&
        <p className={styles.startDateSelected}>Picture from {longStartDate}</p>
      }
      {longStartDate !== currentLongDate &&
        <p className={styles.startDateSelected}>Pictures from {longStartDate} onward</p>
      }
      {visible ? (
        <DatePicker
          selected={props.date}
          onChange={handleDateSelect}
          maxDate={new Date()}
          className={styles.calendar}
          data-testid='calendar'
        />
      ) : null}
    </form>
  );
};

export default StartDatePicker;