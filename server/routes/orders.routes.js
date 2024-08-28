const express = require("express");
const router = express.Router();
const Order = require("../models/Order.model");
const Customer = require("../models/Customer.model");
const Item = require("../models/Item.model");

router.get("/", async (req, res) => {
    try {
      const orders = await Order.find().populate("items");
      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  router.get("/:orderid", async (req, res) => {
    try {
      const order = await Order.findById(req.params.orderid).populate("items");
      if (order) {
        res.json(order);
      } else {
        res.status(404).json({ error: "Item not found" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  router.post("/create", async (req, res) => {
    const { items, customer } = req.body;
  
    try {
      // Validate customer
      const foundCustomer = await Customer.findById(customer);
      if (!foundCustomer) {
        return res.status(400).json({ error: "Customer not found" });
      }
  
      // Validate and process items
      const itemIds = items.map(item => item.id);
      const foundItems = await Item.find({ _id: { $in: itemIds } });
      const itemMap = foundItems.reduce((map, item) => {
        map[item._id.toString()] = item;
        return map;
      }, {});
  
      let total = 0;
  
      for (const item of items) {
        const itemDetails = itemMap[item.id];
        if (!itemDetails) {
          return res.status(400).json({ error: `Item ${item.id} not found` });
        }
  
        if (item.quantity > itemDetails.quantity) {
          return res.status(400).json({ error: `Insufficient quantity for item ${item.id}` });
        }
  
        if (item.serialNumbers.length !== item.quantity) {
          return res.status(400).json({ error: `Number of serial numbers must match the quantity for item ${item.id}` });
        }
  
        // Deduct quantity and update item
        itemDetails.quantity -= item.quantity;
        await itemDetails.save();
  
        total += itemDetails.price * item.quantity;
      }
  
      // Create new order
      const newOrder = new Order({
        items: items.map(item => ({
          id: item.id,
          quantity: item.quantity,
          serialNumbers: item.serialNumbers,
        })),
        total,
        customer,
      });
  
      await newOrder.save();
      res.status(201).json(newOrder);
  
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  

  module.exports = router;