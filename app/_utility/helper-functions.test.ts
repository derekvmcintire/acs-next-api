import { getYearFromDateString } from "./helper-functions";

describe('getYearFromDateString', () => {
  test('returns the correct year for a valid date string', () => {
    expect(getYearFromDateString('2023-10-28')).toBe(2023);
    expect(getYearFromDateString('2000-01-01')).toBe(2000);
    expect(getYearFromDateString('1995-07-15')).toBe(1995);
  });

  test('throws an error for an invalid date string', () => {
    expect(() => getYearFromDateString('invalid-date')).toThrow('Invalid date string');
    expect(() => getYearFromDateString('')).toThrow('Invalid date string');
    expect(() => getYearFromDateString('2023-13-40')).toThrow('Invalid date string'); // Non-existent date
  });

  test('handles date strings with different formats', () => {
    expect(getYearFromDateString('2023-10-28T12:00:00Z')).toBe(2023);
    expect(getYearFromDateString('2023-10-28 12:00:00')).toBe(2023);
    expect(getYearFromDateString('October 28, 2023')).toBe(2023);
  });
});
