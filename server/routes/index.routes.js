const express = require("express");
const router = express.Router();
const Items = require("../models/Item.model");
const User = require("../models/User.model");
const Customer = require("../models/Customer.model");
router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.get("/items", async (req, res) => {
  const { name_like = "", _start = 0, _limit = 10 } = req.query;

  try {
    const query = {};
    if (name_like) {
      query.name = { $regex: name_like, $options: "i" };
    }

    // Convert _start and _limit to integers
    const start = parseInt(_start, 10);
    const limit = parseInt(_limit, 10);

    if (isNaN(start) || isNaN(limit) || limit <= 0) {
      return res.status(400).json({ message: "Invalid pagination parameters" });
    }

    // Fetch total count
    const totalItems = await Items.countDocuments(query);

    // Fetch items with pagination
    const items = await Items.find(query).skip(start).limit(limit);

    res.status(200).json({ items, totalItems });
  } catch (error) {
    console.error("Error fetching items:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
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

router.post("/item/create", async (req, res) => {
  console.log("the req.body", req.body);
  try {
    const item = new Items(req.body);
    await item.save();
    res.status(201).json(item);
  } catch (error) {
    res.status(400).send(error);
  }
});
router.get("/itemdetails/:id", async (req, res) => {
  try {
    const item = await Items.findById(req.params.id);
    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ error: "Item not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/itemdetails/update/:id", async (req, res) => {
  try {
    const updatedItem = await Items.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedItem) {
      return res.status(404).json({ error: "Item not found" });
    }
    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/customer/create", async (req, res) => {
  try {
    const customer = new Customer(req.body);
    await customer.save();
    res.status(201).json(customer);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
