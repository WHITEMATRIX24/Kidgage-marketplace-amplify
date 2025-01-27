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
    console.log(existingData);

    const { duration, durationUnit } = existingData;
    if (
      `${duration}${durationUnit}` ===
      `${compareData.duration}${compareData.durationUnit}`
    )
      return existingData.bookedDates;
    else return [];
  } else return [];
};
