const { Router } = require("express");
const restaurants = require("./restaurants");
const reviews = require("./reviews");

const router = Router();

router.use("/restaurants", restaurants);
router.use("/restaurants", reviews);

module.exports = router;
