const mongoose = require("mongoose");
const Joi = require("joi");

const Report = mongoose.model(
  "report",
  new mongoose.Schema({
    cmdtyID: {
      type: String,
      required: true,
    },
    cmdtyName: {
      type: String,
      required: true,
    },
    marketID: {
      type: String,
      required: true,
    },
    marketName: {
      type: String,
      required: true,
    },
    users: {
      type: Array,
      required: true,
    },
    timeStamp: {
      type: Date,
      default: Date.now(),
    },
    priceUnit: {
      type: String,
      default: "kg",
    },
    price: {
      type: Number,
      required: true,
    },
  })
);

function validateReport(report) {
  const schema = Joi.object({
    userID: Joi.string().required().label("User ID"),
    marketID: Joi.string().required().label("Market ID"),
    marketName: Joi.string().required().label("Market Name"),
    marketType: Joi.string(),
    cmdtyID: Joi.string().required().label("Commodity ID"),
    cmdtyName: Joi.string().required().label("Commodity Name"),
    priceUnit: Joi.string().required().label("Price Unit"),
    convFctr: Joi.number().required().label("Conversion Factor"),
    price: Joi.number().required().label("Price"),
  });
  return schema.validate(report);
}

exports.Report = Report;
exports.validate = validateReport;
