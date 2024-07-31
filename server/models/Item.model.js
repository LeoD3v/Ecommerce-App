const { Schema, model } = require("mongoose");

const itemSchema = new Schema(
  {
     name: {
        type: String,
        required: [true, "Name is required."],
      },
      price: {
        type: Number,
        required: [true, "Price is required."],
      },
      inventory: {
        type: Schema.Types.ObjectId,
        ref: "Inventory",
      },
  },
  {
    timestamps: true,
  }
);

const Item = model("Item", itemSchema);

module.exports = Item;
