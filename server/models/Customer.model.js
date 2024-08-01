const { Schema, model } = require("mongoose");

const customerSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    name: {
      type: String,
      required: [true, "Name is required."],
    },
    items: [
      {
        type: Schema.Types.ObjectId,
        ref: "Item",
      }
    ]
  },
  {
    timestamps: true,
  }
);

const Customer = model("Customer", customerSchema);

module.exports = Customer;
