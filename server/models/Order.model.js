const { Schema, model } = require("mongoose");

const orderSchema = new Schema(
  {
    items: [
      {
        item: {
          type: Schema.Types.ObjectId,
          ref: "Item",
        },
        quantity: {
          type: Number,
          required: true
        },
        serialNumbers: [String],
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