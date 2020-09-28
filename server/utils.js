/**
 * Returns days between two dates (d1 - d2) that has been convereted to milliseconds
 * @param d1 number
 * @param d2 number
 */
const daysDiff = (d1, d2) => {
  return Math.floor((d1 - d2) / (1000 * 60 * 60 * 24));
};

/**
 * Converts a Date object to a short ISO-8601 string (YYYY-MM-DD)
 * @param {Date} date
 */
const dateToIsoString = (date) => date.toISOString().slice(0, 10);

/**
 * Add days to a Date and returns a new date
 * @param {Date} date
 * @param {number} days
 */
const addDays = (date, days) => {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + days);

  return newDate;
};

/**
 * Simple check an ISO date (YYYY-MM-DD)
 * @param date string
 */
const isIsoDate = (date) => date.match(/^\d{4}-\d{2}-\d{2}$/) !== null;

/**
 * Enumerates all the dates between two dats
 * @param startDate Date
 * @param stopDate Date
 */
const enumerateDates = (startDate, endDate) => {
  if (!isIsoDate(startDate) || !isIsoDate(endDate)) {
    return [];
  }

  let dateArray = [];
  let currentDate = new Date(startDate);
  let stopDate = new Date(endDate);
  // console.log(startDate.toISOString());
  while (currentDate <= stopDate) {
    dateArray.push(dateToIsoString(currentDate));
    currentDate = addDays(currentDate, 1);
  }
  return dateArray;
};

/**
 * Converts a string to an integer by taking the charcode of the current value
 * and discards everything but the last number. Since the portcodes are 5
 * characters per port this should be less than the max safe integer in
 * javascript
 *
 * @param str string
 */
const strToInt = (str) =>
  str
    .split("")
    .reduce((a, b, i) => a + (b.charCodeAt(0) % 10) * Math.pow(10, i), 0);

/**
 * Generates a seed for a pseudorandom number generator from an origin
 * and destination. To prevent mirroring of lane rates a multiplier of origin is
 * used.
 *
 * @param origin string
 * @param destination string
 */
const generateSeedFromLane = (origin, destination) =>
  strToInt(`${origin}${destination}`);

module.exports = {
  daysDiff,
  dateToIsoString,
  addDays,
  isIsoDate,
  enumerateDates,
  strToInt,
  generateSeedFromLane,
};
