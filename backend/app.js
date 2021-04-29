require("dotenv").config();
const express = require("express");
const morgan = require("morgan"); //this helps to log requests to console
const routes = require("./routes");
const cors = require("cors");
const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use("/", routes);

app.use((err, req, res, next) => {
  res.json(err);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port : ${port}`);
});
