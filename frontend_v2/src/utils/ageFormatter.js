export const ageFormatter = ({ rawStartAge, rawEndAge }) => {
  const newStartAge = new Date(rawStartAge);
  const newEndAge = new Date(rawEndAge);
  const todaysDate = new Date();

  const startAge = todaysDate.getFullYear() - newEndAge.getFullYear();
  const endAge = todaysDate.getFullYear() - newStartAge.getFullYear();

  return `${startAge} to ${endAge}`;
};
