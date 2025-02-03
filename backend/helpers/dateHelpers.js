// find the 1st date in a group of dates array
const findFirstDate = (dateArray) => {
  if (dateArray.length === 0) return null;

  const correctDate = new Date(dateArray[0]);
  let firstDate = new Date(
    Date.UTC(
      correctDate.getFullYear(),
      correctDate.getMonth(),
      correctDate.getDate()
    )
  );

  let count = 1;
  while (count < dateArray.length) {
    const newFixedDate = new Date(dateArray[count]);
    const newDate = new Date(
      Date.UTC(
        newFixedDate.getFullYear(),
        newFixedDate.getMonth(),
        newFixedDate.getDate()
      )
    );
    newDate.setUTCHours(0, 0, 0, 0);

    if (newDate < firstDate) firstDate = newDate;
    count++;
  }

  return firstDate.toISOString().split("T")[0];
};

// calculate the next date
const calculateNextDate = (rawDate) => {
  const newDate = new Date(rawDate);
  newDate.setDate(newDate.getDate() + 1);
  return newDate.toISOString().split("T")[0];
};

module.exports = {
  findFirstDate,
  calculateNextDate,
};
