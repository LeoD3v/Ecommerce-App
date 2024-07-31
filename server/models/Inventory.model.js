const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const inventorySchema = new Schema(
  {
    quantity: {
        type: String,
        required: [true, "Name is required."],
      },
      items: [
        {
          type: Schema.Types.ObjectId,
          ref: "Item",
      },
    ]
  },
  {
    timestamps: true,
  }
);

const Inventory = model("Inventory", inventorySchema);

module.exports = Inventory;
