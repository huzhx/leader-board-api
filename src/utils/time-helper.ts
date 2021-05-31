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

const mockCurrentTimeInJan2021 = () => {
  const day = moment().format('DD');
  const hourMinSec = moment().format('HH:mm:ss');
  return getEpochTimeInJan2021(day, hourMinSec);
};

export { getTimestampStringInJan2021, getEpochTimeInJan2021, mockCurrentTimeInJan2021 };
