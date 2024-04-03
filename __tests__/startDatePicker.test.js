import '@testing-library/jest-dom';
import { render, cleanup, fireEvent, screen } from '@testing-library/react';

import StartDatePicker from '../components/startDatePicker';
import { getCurrentTime } from '../helpers/selectors';

afterEach(cleanup);

describe('Post', () => {
  it('renders without crashing', () => {
    render(<StartDatePicker />);
  });
});