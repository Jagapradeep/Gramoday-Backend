const express = require("express");
const app = express();
const config = require("config");
const mongoose = require("mongoose");
const users = require("./routes/users");

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
app.use(express.json());

app.use("/users", users);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(` -info: Listening on port ${port}`));
