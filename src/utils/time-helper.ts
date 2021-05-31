import moment from 'moment';

const getTimestampStringInJan2021 = (day: string, hourMinSec: string) => {
  // Mock the current time to be within January 2021 (UTC)
  const timestamp = moment.utc(`2021-01-${day} ${hourMinSec}`, 'YYYY-MM-DD HH:mm:ss');
  return timestamp.format();
};

const getEpochTimeInJan2021 = (day: string, hourMinSec: string) => {
  const timestampStr = getTimestampStringInJan2021(day, hourMinSec);
  const timestamp = moment(timestampStr);
  return timestamp.unix();
};

export { getTimestampStringInJan2021, getEpochTimeInJan2021 };
