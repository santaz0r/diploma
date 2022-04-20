const express = require("express");
const Product = require("../models/Product");
const auth = require("../middleware/auth.middleware");
const router = express.Router({ mergeParams: true });
const config = require("config");

router.patch("/:productId", auth, async (req, res) => {
  const { productId } = req.params;

  try {
    if (req.user?._id === config.get("ADMIN_ACCESS")) {
      const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        req.body,
        { new: true }
      );
      res.send(updatedProduct);
    } else {
      res.status(403).json({ message: "Forbidden" });
    }
  } catch (error) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

router
  .route("/")
  .get(async (req, res) => {
    try {
      const list = await Product.find();
      res.status(200).send(list);
    } catch (error) {
      res.status(500).json({
        message: "На сервере произошла ошибка. Попробуйте позже",
      });
    }
  })
  .post(auth, async (req, res) => {
    try {
      if (req.user?._id === config.get("ADMIN_ACCESS")) {
        const newProduct = await Product.create({ ...req.body });
        res.status(201).send(newProduct);
      } else {
        res.status(403).json({ message: "Forbidden" });
      }
    } catch (error) {
      res.status(500).json({
        message: "На сервере произошла ошибка. Попробуйте позже",
      });
    }
  });

router.delete("/:productId", auth, async (req, res) => {
  try {
    const { productId } = req.params;
    const removedProduct = await Product.findById(productId);
    if (req.user?._id === config.get("ADMIN_ACCESS")) {
      await removedProduct.remove();
      return res.send(null);
    } else {
      res.status(403).json({ message: "Forbidden" });
    }
  } catch (error) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});
module.exports = router;
