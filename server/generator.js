const { MersenneTwister } = require("./mt");
const {
  START_YEAR,
  START_MONTH,
  START_DAY,
  BEARCYCLE,
  BULLCYCLE,
  DATAPOINTS_PER_DAY,
} = require("./constants");
const { daysDiff, dateToIsoString } = require("./utils");

/**
 * Uses the Z0 part of the box muller transform to generate a gaussian variate.
 *
 * @param mu number
 * @param sigma number
 */
function noiseMaker(mu, sigma) {
  return Math.sqrt(-2 * Math.log(mu)) * Math.cos(2 * Math.PI * sigma);
}

/**
 * Generates a graph
 * @param start number price at day 0
 * @param seed number seed for pngr
 */
const generateGraph = (start, seed) => {
  /**
   * Generates random numbers (0,1)-real-interval
   */
  const pngr = MersenneTwister(seed);
  const graph = [];
  // Total days we will generate data for
  const totalDays = daysDiff(
    Date.now(),
    new Date(START_YEAR, START_MONTH, START_DAY).getTime()
  );

  for (let i = 0; i <= totalDays; i++) {
    // Is the current day in a bear or a bull cycle?
    const isBullMarket = i % ((BEARCYCLE + BULLCYCLE) * 30) < BULLCYCLE * 30;
    // Market cycle factor
    const marketCycleFactor = isBullMarket ? 0.0015 : -0.005;
    // Either the start value or yesterdays value
    const yesterdayAverage = i === 0 ? start : graph[i - 1].average;

    // Generate some datapoints for today
    const datapoints = [];
    for (let j = 0; j < DATAPOINTS_PER_DAY; j++) {
      let change = 1 + noiseMaker(pngr(), pngr()) / 100 + marketCycleFactor;
      datapoints.push(yesterdayAverage * change);
    }
    datapoints.sort();

    const currentDate = new Date(START_YEAR, START_MONTH, START_DAY);
    currentDate.setDate(currentDate.getDate() + i);
    graph.push({
      high: Math.round(datapoints[DATAPOINTS_PER_DAY - 1]),
      average: Math.round(
        datapoints.reduce((a, b) => a + b, 0) / DATAPOINTS_PER_DAY
      ),
      low: Math.round(datapoints[0]),
      date: dateToIsoString(currentDate),
    });
  }

  return graph;
};

module.exports = { generateGraph };
