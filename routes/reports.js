const express = require("express");
const router = express.Router();
const { Report, validate } = require("../models/report");

router.get("/:id", async (req, res) => {
  const report = await Report.findById(req.params.id);
  if (!report)
    return res.status(404).send("The is no report with the specified ID");

  res.send(report);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const {
    cmdtyID,
    cmdtyName,
    marketID,
    marketName,
    userID,
    convFctr,
    price,
  } = req.body;

  const priceInKg = price / convFctr;
  const newReport = {
    cmdtyID,
    cmdtyName,
    marketID,
    marketName,
    users: [userID],
    price: priceInKg,
  };

  let existingReport = await Report.findOne({
    marketID: req.body.marketID,
    cmdtyID: req.body.cmdtyID,
  });
  if (existingReport) {
    const averagePrice = (existingReport.price + priceInKg) / 2;

    existingReport.users.push(userID);
    existingReport.price = averagePrice;
    existingReport.timeStamp = Date.now();

    existingReport = await existingReport.save();

    return res.send(existingReport);
  }

  let report = new Report(newReport);
  report = await report.save();
  res.send(report);
});

module.exports = router;
