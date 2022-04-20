const express = require("express");
const router = express.Router({ mergeParams: true });

router.use("/auth", require("./auth.routes"));
router.use("/feedback", require("./feedback.routes"));
router.use("/property", require("./property.routes"));
router.use("/category", require("./category.routes"));
router.use("/user", require("./user.routes"));
router.use("/product", require("./product.routes"));

module.exports = router;
