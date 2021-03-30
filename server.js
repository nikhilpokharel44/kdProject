/** @format */
if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const layouts = require("express-ejs-layouts");

//connection port
const PORT = process.env.PORT || 4040;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.use(layouts);
app.set("layout", "layouts/layout");

//all routes endpoints
app.use("/v1/ads", require("./routes/ads"));

//database connection
mongoose
  .connect(process.env.db_uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("database connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(PORT, () => console.log(`server running at port ${PORT}`));
