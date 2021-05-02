const mongoose = require("mongoose");
const Joi = require("joi");

const User = mongoose.model(
  "user",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
    },
  })
);

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required().label("Name"),
  });
  return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;
