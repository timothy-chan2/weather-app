import { getLongDate, getCurrentTime, getShortDate } from '../helpers/selectors';

describe('getLongDate', () => {
  test('returns a string', () => {
    const result = getLongDate(new Date('2024-04-02'));
    expect(typeof result).toBe('string');
  });
});