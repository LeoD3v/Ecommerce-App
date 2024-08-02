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
      created_by: {
        type: Schema.Types.ObjectId,
        ref: "User",
      }
  },
  {
    timestamps: true,
  }
);

const Item = model("Item", itemSchema);

module.exports = Item;
