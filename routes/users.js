const express = require("express");
const router = express.Router();
const { User, validate } = require("../models/user");

router.get("/", async (req, res) => {
  const user = await User.find();
  res.send(user);
});

router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user)
    return res.status(404).send("The is no user with the specified ID");

  res.send(user);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = new User(req.body);
  user = await user.save();
  res.send(user);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { name } = req.body;
  let user = await User.findByIdAndUpdate(
    req.params.id,
    { name },
    { new: true }
  );
  if (!user)
    return res.send(404).send("There is no user with the specified ID");

  res.send(user);
});

router.delete("/:id", async (req, res) => {
  const user = await User.findByIdAndRemove(req.params.id);
  if (!user)
    return res.status(404).send("There is no user with the specified ID");

  res.send(user);
});

module.exports = router;
