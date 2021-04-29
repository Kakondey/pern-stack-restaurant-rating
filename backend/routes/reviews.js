const { Router } = require("express");

const router = Router();
const pool = require("../database");

// get reviews for a restaurant
router.get("/:id/reviews", async (request, response, next) => {
  const { id } = request.params;

  await pool.query(
    "SELECT * FROM reviews where restaurant_id = $1",
    [id],
    (err, res) => {
      if (err) return next(err);

      response.json({
        status: "success",
        results: res.rows.length,
        data: {
          reviews: res.rows,
        },
      });
    }
  );
});

// insert a review
router.post("/:id/add-review", async (request, response, next) => {
  const { id } = request.params;
  const { name, review, rating } = request.body;

  await pool.query(
    "INSERT INTO reviews (restaurant_id, name, review, rating) VALUES ($1, $2, $3, $4) returning *",
    [id, name, review, rating],
    (err, res) => {
      if (err) return next(err);

      response.status(201).json({
        status: "success",
        data: {
          review: res.rows[0],
        },
      });
    }
  );
});

// get average rating

module.exports = router;
