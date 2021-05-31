import { getTimestampStringInJan2021, getEpochTimeInJan2021 } from '../utils/time-helper';

describe('getTimestampStringInJan2021', () => {
  it('returns 2021-01-31T13:17:00Z for day 31 time 13:17:00', () => {
    const result = getTimestampStringInJan2021('31', '13:17:00');
    const expected = '2021-01-31T13:17:00Z';
    expect(result).toBe(expected);
  });
});

describe('getEpochTimeInJan2021', () => {
  it('returns 1612099020 for day 31 time 13:17:00', () => {
    const result = getEpochTimeInJan2021('31', '13:17:00');
    const expected = 1612099020;
    expect(result).toBe(expected);
  });
});
