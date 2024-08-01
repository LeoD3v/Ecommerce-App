const express = require("express");
const router = express.Router();
const Order = require("../models/Order.model"); 
const Item = require("../models/Item.model"); 
const Inventory = require("../models/Inventory.model"); 

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.post('/order/create', async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).send(order);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post('/item/create', async (req, res) => {
  try {
    const item = new Item(req.body);
    await item.save();
    res.status(201).send(item);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post('/inventory/create', async (req, res) => {
  try {
    const inventory = new Inventory(req.body);
    await inventory.save();
    res.status(201).send(inventory);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
