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
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    type: {
      type: String,
      enum: ["electronics", "non-electronics"],
      required: [true, "Type is required."],
    },
    brand: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          return this.type === "non-electronics" || value != null;
        },
        message: "Brand is required for both electronics and non-electronics.",
      },
    },
    model: {
      type: String,
      required: function () {
        return this.type === "electronics";
      },
      validate: {
        validator: function (value) {
          if (this.type === "electronics" && !value) {
            return false;
          }
          if (this.type === "non-electronics" && value) {
            return false;
          }
          return true;
        },
        message: function (props) {
          return this.type === "electronics"
            ? "Model is required for electronics."
            : "Model should not be provided for non-electronics.";
        },
      },
    },
    serialNumbers: {
      type: [String],
      required: function () {
        return this.type === "electronics";
      },
      validate: {
        validator: function (value) {
          return value.length === this.quantity;
        },
        message: "Number of serial numbers must match the quantity.",
      },
    },
  },
  {
    timestamps: true,
  }
);

itemSchema.pre("save", function (next) {
  if (
    this.type === "electronics" &&
    (!this.serialNumbers || this.serialNumbers.length === 0)
  ) {
    this.serialNumbers = [];
    for (let i = 0; i < this.quantity; i++) {
      // Generate a random serial number or customize this logic
      this.serialNumbers.push(
        `SN-${Date.now()}-${Math.floor(Math.random() * 10000)}`
      );
    }
  }
  next();
});
const Items = model("Items", itemSchema, "inventory");

module.exports = Items;
