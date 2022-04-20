const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    inStock: {
      type: String,
      required: true,
    },
    rate: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    category: { type: Schema.Types.ObjectId, ref: "Category" },
    property: [{ type: Schema.Types.ObjectId, ref: "Property" }],
  },
  {
    timestamps: true,
  }
);

module.exports = model("Product", schema);
