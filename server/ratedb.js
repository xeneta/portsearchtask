const { generateGraph } = require("./generator");
const { tradeLaneKeyProvider } = require("./keyprovider");
const { generateSeedFromLane, enumerateDates } = require("./utils");

class RateDatabase {
  static rates = {};
  static instance;

  constructor() {}

  static getInstance() {
    if (!RateDatabase.instance) {
      RateDatabase.instance = new RateDatabase();
    }

    return RateDatabase.instance;
  }

  addLane(origin, destination, rate) {
    const key = tradeLaneKeyProvider(origin, destination);

    if (rate === null) {
      RateDatabase.rates[key] = {};
    } else {
      const graph = generateGraph(
        rate,
        generateSeedFromLane(origin, destination)
      );
      RateDatabase.rates[key] = graph.reduce((prev, curr) => {
        prev[curr.date] = {
          low: curr.low,
          average: curr.average,
          high: curr.high,
        };

        return prev;
      }, {});
    }
  }
  /**
   * Returns rates on a trade lane on the following format
   *
   * {
   *  "low": ["YYYY-MM-DD", number][],
   *  "average": ["YYYY-MM-DD", number][],
   *  "high": ["YYYY-MM-DD", number][]
   * }
   * @param origin string
   * @param destination string
   * @param from Date
   * @param to Date
   */
  getRates(origin, destination, from, to) {
    const tradeLaneRates =
      RateDatabase.rates[tradeLaneKeyProvider(origin, destination)] || {};
    const days = enumerateDates(from, to);
    const low = [];
    const average = [];
    const high = [];

    for (let i = 0; i < days.length; i++) {
      const currentDay = days[i];
      const rates = tradeLaneRates[currentDay];
      if (typeof rates !== "undefined") {
        low.push([currentDay, rates.low]);
        average.push([currentDay, rates.average]);
        high.push([currentDay, rates.high]);
      } else {
        low.push([currentDay, null]);
        average.push([currentDay, null]);
        high.push([currentDay, null]);
      }
    }

    return {
      low,
      average,
      high,
    };
  }
}

const RDB = RateDatabase.getInstance();

RDB.addLane("USNYC", "NOOSL", 1426);
RDB.addLane("USNYC", "CNSGH", 694);
RDB.addLane("USNYC", "CNSTG", 1373);
RDB.addLane("USNYC", "NLRTM", 964);
RDB.addLane("USNYC", "DEHAM", 2064);
RDB.addLane("USNYC", "GBFXT", 895);
RDB.addLane("NOOSL", "USNYC", null);
RDB.addLane("NOOSL", "CNSGH", 1950);
RDB.addLane("NOOSL", "CNSTG", 1798);
RDB.addLane("NOOSL", "NLRTM", 2387);
RDB.addLane("NOOSL", "DEHAM", 985);
RDB.addLane("NOOSL", "GBFXT", 1470);
RDB.addLane("NOOSL", "GBFXT", 1992);
RDB.addLane("CNSGH", "USNYC", 1185);
RDB.addLane("CNSGH", "NOOSL", 1555);
RDB.addLane("CNSGH", "CNSTG", 1799);
RDB.addLane("CNSGH", "NLRTM", 278);
RDB.addLane("CNSGH", "DEHAM", 718);
RDB.addLane("CNSGH", "GBFXT", 908);
RDB.addLane("CNSTG", "USNYC", 288);
RDB.addLane("CNSTG", "NOOSL", 534);
RDB.addLane("CNSTG", "CNSGH", 2387);
RDB.addLane("CNSTG", "NLRTM", 985);
RDB.addLane("CNSTG", "DEHAM", 1470);
RDB.addLane("CNSTG", "GBFXT", 1992);
RDB.addLane("NLRTM", "USNYC", 1185);
RDB.addLane("NLRTM", "NOOSL", 1555);
RDB.addLane("NLRTM", "CNSGH", 2370);
RDB.addLane("NLRTM", "CNSTG", 950);
RDB.addLane("NLRTM", "DEHAM", 1381);
RDB.addLane("NLRTM", "GBFXT", 2338);
RDB.addLane("DEHAM", "USNYC", 1160);
RDB.addLane("DEHAM", "NOOSL", 1615);
RDB.addLane("DEHAM", "CNSGH", 1002);
RDB.addLane("DEHAM", "CNSTG", 239);
RDB.addLane("DEHAM", "NLRTM", 506);
RDB.addLane("DEHAM", "GBFXT", 549);
RDB.addLane("GBFXT", "USNYC", 294);
RDB.addLane("GBFXT", "NOOSL", 425);
RDB.addLane("GBFXT", "CNSGH", 1989);
RDB.addLane("GBFXT", "CNSTG", 1090);
RDB.addLane("GBFXT", "NLRTM", 1397);
RDB.addLane("GBFXT", "DEHAM", null);

module.exports = {
  rateDB: RateDatabase.getInstance(),
};
