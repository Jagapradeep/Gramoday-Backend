const express = require("express");
const app = express();
const config = require("config");
const mongoose = require("mongoose");

const connectionString = `${config.get("db")}`;

mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log(" -info: Connected Successfully To mongodb");
  })
  .catch((e) => {
    console.log(e);
  });
