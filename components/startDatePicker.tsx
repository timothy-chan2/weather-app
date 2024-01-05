import { useState, useMemo } from 'react';
import DatePicker from 'sassy-datepicker';

import { getLongDate } from '../helpers/selectors';

// The StartDatePicker component shows the button to open the calendar
const StartDatePicker = (props) => {
  const [visible, setVisible] = useState(false);

  const longStartDate = useMemo(
    () => getLongDate(new Date(props.date)),
    [props.date]
  );
  
  const currentLongDate = getLongDate(new Date());

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
        className='start-date-picker-btn'
        type='button'
        aria-controls='calendar'
      >
        Pick Start Date
      </button>
      {longStartDate === currentLongDate &&
        <p className='start-date-selected'>Picture from {longStartDate}</p>
      }
      {longStartDate !== currentLongDate &&
        <p className='start-date-selected'>Pictures from {longStartDate} onward</p>
      }
      {visible ? (
        <DatePicker
          selected={props.date}
          onChange={handleDateSelect}
          maxDate={new Date()}
          id='calendar'
          data-testid='calendar'
        />
      ) : null}
    </form>
  );
};

export default StartDatePicker;