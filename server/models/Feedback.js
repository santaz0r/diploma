const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    pageId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: { createdAt: "created_at" },
  }
);

module.exports = model("Feedback", schema);
