// initial package selector
export const getTheinitialSelectedPackage = ({
  data,
  existingData,
  coustomData,
}) => {
  if (existingData && data) {
    const { duration, durationUnit } = existingData;
    if (`${duration}${durationUnit}` === `${data.duration}${data.durationUnit}`)
      return existingData;
    else return data;
  }
  if (existingData && coustomData) {
    const { duration, durationUnit } = existingData;
    const exCompareValue = `${duration}${durationUnit}`;
    const isDataInCoustomData = coustomData.find(
      (val) => exCompareValue === `${val.duration}${val.durationUnit}`
    );
    if (isDataInCoustomData) return existingData;
    else coustomData[0];
  }
  if (data) return data;
  if (coustomData) return coustomData[0];
};

// selected dates based on package name
export const getSelectedDatedBasedOnPackageName = ({
  existingData,
  compareData,
}) => {
  if (existingData && compareData) {
    const { duration, durationUnit } = existingData;
    if (
      `${duration}${durationUnit}` ===
      `${compareData.duration}${compareData.durationUnit}`
    )
      return existingData.bookedDates;
    else return [];
  } else return [];
};

// check wether the date is before or after the package dates
export const checkTheDatesBeforeOrAfterThePackageDates = ({
  currentDay,
  startDate,
  endDate,
}) => {
  const newStartDate = new Date(startDate);
  newStartDate.setHours(0, 0, 0, 0);
  const newEndDate = new Date(endDate);
  newEndDate.setHours(0, 0, 0, 0);
  const newCurrentDate = new Date(currentDay);
  newCurrentDate.setHours(0, 0, 0, 0);

  // todays date
  const todaysDate = new Date();
  todaysDate.setHours(0, 0, 0, 0);

  // console.log(
  //   `newCurrentDate: ${newCurrentDate} < todaysDate: ${todaysDate} is ${
  //     newCurrentDate < todaysDate
  //   }`
  // );

  if (
    newCurrentDate < newStartDate ||
    newCurrentDate > newEndDate ||
    newCurrentDate < todaysDate
  )
    return true;
  else return false;
};
