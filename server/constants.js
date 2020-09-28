module.exports = {
  // Market related constants
  BEARCYCLE: 14, // in months
  BULLCYCLE: 54, // in months
  // Start date of when we have rates
  START_YEAR: 2014,
  START_MONTH: 5,
  START_DAY: 22,
  DATAPOINTS_PER_DAY: 10,
  PORTS: [
    {
      id: "NOOSL",
      country: "NO",
      name: "Oslo",
    },
    {
      id: "CNSGH",
      country: "CN",
      name: "Shanghai",
    },
    {
      id: "CNSTG",
      country: "CN",
      name: "Shantou",
    },
    {
      id: "NLRTM",
      country: "NL",
      name: "Rotterdam",
    },
    {
      id: "DEHAM",
      country: "DE",
      name: "Hamburg",
    },
    {
      id: "GBFXT",
      country: "GB",
      name: "Felixstowe",
    },
    {
      id: "USNYC",
      country: "US",
      name: "New York",
    },
  ],
};
