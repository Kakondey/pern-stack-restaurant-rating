const { Router } = require("express");
const restaurants = require("./restaurants");
const reviews = require("./reviews");

const router = Router();

router.use("/api/v1/restaurants", restaurants);
router.use("/api/v1/restaurants", reviews);

module.exports = router;
