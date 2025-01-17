export const dateFormater = (rawDate) => {
  const newDate = new Date(rawDate);
  return newDate.toLocaleDateString();
};

export const fromAndToDateFormatter = (startRawDate, endRawDate) => {
  const startDate = new Date(startRawDate);
  const endDate = new Date(endRawDate);
  return `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`;
};
