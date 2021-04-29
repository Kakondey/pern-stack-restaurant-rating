const { Router } = require("express");

const router = Router();
const pool = require("../database");

// get all restaurants
router.get("/", async (request, response, next) => {
  await pool.query(
    "SELECT * FROM restaurants left join (select restaurant_id, COUNT(*), TRUNC(AVG(rating), 1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id;",
    (err, res) => {
      if (err) return next(err);
      // response.json();
      response.json({
        status: "success",
        results: res.rows.length,
        data: {
          restaurants: res.rows,
        },
      });
    }
  );
});

// get one restaurants
router.get("/:id", async (request, response, next) => {
  const { id } = request.params;
  await pool.query(
    "SELECT * FROM restaurants left join (select restaurant_id, COUNT(*), TRUNC(AVG(rating), 1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id WHERE id = $1",
    [id],
    (err, res) => {
      if (err) return next(err);
      response.json({
        status: "success",
        results: res.rows.length,
        data: {
          restaurant: res.rows[0],
        },
      });
    }
  );
});

// insert restaurant
router.post("/", async (request, response, next) => {
  const { name, location, price_range } = request.body;

  await pool.query(
    "INSERT INTO restaurants (name, location, price_range) VALUES($1,$2,$3) returning *",
    [name, location, price_range],
    (err, res) => {
      if (err) return next(err);

      response.status(201).json({
        status: "success",
        data: {
          restaurant: res.rows[0],
        },
      });
    }
  );
});

// update restaurant
router.put("/:id", (request, response, next) => {
  const { id } = request.params;
  const { name, location, price_range } = request.body;

  pool.query(
    `UPDATE restaurants SET name=$1, location=$2, price_range=$3 WHERE id=$4 returning *`,
    [name, location, price_range, id],
    (err, res) => {
      if (err) return next(err);

      response.status(200).json({
        status: "success",
        data: {
          restaurant: res.rows[0],
        },
      });
    }
  );
});
// });

// delete restaurant
router.delete("/:id", (request, response) => {
  const { id } = request.params;

  pool.query(`DELETE FROM restaurants WHERE id = ($1)`, [id], (err, res) => {
    if (err) return next(err);

    response.status(204).json({
      status: "success",
    });
  });
});

module.exports = router;
