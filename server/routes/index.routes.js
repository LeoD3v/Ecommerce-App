const express = require("express");
const router = express.Router();
const Order = require("../models/Order.model");
const Items = require("../models/Item.model");
const User = require("../models/User.model");
router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.get("/items", async (req, res) => {
  try {
    const items = await Items.find();
    res.json(items);
    console.log(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/users", async (req, res) => {
  try {
    const items = await User.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/order/create", async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).send(order);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/item/create", async (req, res) => {
  try {
    const item = new Item(req.body);
    await item.save();
    res.status(201).send(item);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
