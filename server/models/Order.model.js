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
   user:{
     type: Schema.Types.ObjectId,
     ref: "User",
   }
  },
  {
    timestamps: true,
  }
);

const Order = model("Order", orderSchema);

module.exports = Item;