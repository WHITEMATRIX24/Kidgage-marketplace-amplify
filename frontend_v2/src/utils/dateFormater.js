export const dateFormater = (rawDate) => {
  const newDate = new Date(rawDate);
  return newDate.toLocaleDateString();
};

export const fromAndToDateFormatter = (startRawDate, endRawDate) => {
  const startDate = new Date(startRawDate);
  const endDate = new Date(endRawDate);
  return `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`;
};

// find the 1st date in a group of dates array
export const findFirstDate = (dateArray) => {
  if (dateArray.length === 0) return null;

  let firstDate = new Date(dateArray[0]);
  firstDate.setHours(0, 0, 0, 0);

  let count = 1;
  while (count < dateArray.length) {
    const newDate = new Date(dateArray[count]);
    newDate.setHours(0, 0, 0, 0);

    if (newDate < firstDate) firstDate = newDate;
    count++;
  }
  return firstDate.toLocaleDateString();
};
export const findLastDate = (dateArray) => {
  if (dateArray.length === 0) return null;

  let lastDate = new Date(dateArray[0]);
  lastDate.setHours(0, 0, 0, 0);

  let count = 1;
  while (count < dateArray.length) {
    const newDate = new Date(dateArray[count]);
    newDate.setHours(0, 0, 0, 0);

    if (newDate > lastDate) lastDate = newDate;
    count++;
  }
  return lastDate.toLocaleDateString();
};


// time formater
export const formatTimeToString = (rawTime) => {
  const [startTime, endTime] = rawTime.split("-");

  const startTimeFormated = convertTo12HourFormat(startTime);
  const endTimeFormated = convertTo12HourFormat(endTime);

  return `${startTimeFormated} to ${endTimeFormated}`;
};
const convertTo12HourFormat = (time) => {
  const [startHour, startMinutes] = time.split(":");
  let hour = parseInt(startHour);
  const period = hour >= 12 ? "pm" : "am";

  hour = hour % 12 || 12;

  return `${hour}:${startMinutes} ${period}`;
};
