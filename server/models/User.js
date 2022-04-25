const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    image: String,
    cart: {
      type: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("User", schema);
