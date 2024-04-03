import '@testing-library/jest-dom';
import { render, cleanup, fireEvent, screen } from '@testing-library/react';

import StartDatePicker from '../components/startDatePicker';
import { getCurrentTime } from '../helpers/selectors';

afterEach(cleanup);

describe('StartDatePicker', () => {
  it('renders without crashing', () => {
    render(<StartDatePicker />);
  });

  it('renders "Pictures from April 1, 2024 onward" when April 1 is picked as the start date' , () => {
    render(<StartDatePicker date={new Date(`Sun April 1 2024 ${getCurrentTime()}`)} />);
    expect(screen.getByText('Pictures from April 1, 2024 onward')).toBeInTheDocument();
  });

  it('does not render the date picker calendar when the page first loads', () => {
    render(<StartDatePicker />);
  
    expect(screen.queryByTestId('calendar')).toBeNull();
  });

  it('renders the date picker calendar after Pick Start Date button is pressed', () => {
    render(<StartDatePicker />);
  
    const button = screen.getByText('Pick Start Date');
    fireEvent.click(button);
  
    expect(screen.getByTestId('calendar')).toBeTruthy();
  });

  it('does not render the date picker calendar after Pick Start Date button is pressed twice', () => {
    render(<StartDatePicker />);
  
    const button = screen.getByText('Pick Start Date');
    fireEvent.click(button);
    fireEvent.click(button);
  
    expect(screen.queryByTestId('calendar')).toBeNull();
  });
});