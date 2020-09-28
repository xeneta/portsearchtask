var express = require("express");
var router = express.Router();
const db = require("../db/index.js");
const { rateDB } = require("../server/ratedb.js");

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

router.get("/ports/:id", function (req, res) {
  db.getPort(req.params.id).then((result) => {
    res.send(result ? result : {});
  });
});

router.get("/ports/search/:query", function (req, res) {
  const query = escapeRegExp(req.params.query);

  db.searchPorts(query).then((result) => {
    res.send({ results: result });
  });
});

router.get("/rates/:origin/:destination/:fromdate/:todate", function (
  req,
  res
) {
  const ISO8601RegEx = /(\d{4})-(\d{2})-(\d{2})/;

  if (req.params.fromdate > req.params.todate) {
    res.send(400);
  }

  if (
    !ISO8601RegEx.test(req.params.fromdate) ||
    !ISO8601RegEx.test(req.params.todate)
  ) {
    res.send(400);
  }

  const { origin, destination, fromdate, todate } = req.params;

  const result = rateDB.getRates(origin, destination, fromdate, todate);
  res.send({
    origin,
    destination,
    startDate: fromdate,
    endDate: todate,
    rates: result,
  });
  //   db.getRates(origin, destination, fromdate, todate).then((result) => {
  //     res.send({
  //       rates: result ? result : [],
  //     });
  //   });
});

module.exports = router;
