const { Schema, model } = require("mongoose");

const orderSchema = new Schema(
  {
   items: [
   {
    type: Schema.Types.ObjectId,
    ref: "Inventory",
   }
  ],
   total: {
     type: Number,
     required: [true, "Price is required."],
   },
   customer:{
     type: Schema.Types.ObjectId,
     ref: "Customer",
   }
  },
  {
    timestamps: true,
  }
);

const Order = model("Order", orderSchema);

module.exports = Order;