const express = require("express");
const path = require("path");
const cors = require("cors");

// routes modules
const errorController = require("./controllers/errorController");
const viewRoute = require("./routes/viewRoute");
const userRoute = require("./routes/userRoute");
const coinRoute = require("./routes/coinRoute");
const transactionRoute = require("./routes/transactionRoute");
const withdrawRoute = require("./routes/withdrawRoute");
const emailRoute = require("./routes/emailRoute");

const app = express();

require("events").EventEmitter.defaultMaxListeners = 30;

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "pug");
app.set("views", __dirname + "/views");

app.use("/api/v1/users", userRoute);
app.use("/api/v1/coins", coinRoute);
app.use("/api/v1/transactions", transactionRoute);
app.use("/api/v1/withdrawals", withdrawRoute);
app.use("/api/v1/emails", emailRoute);
app.use("/", viewRoute);

app.use(errorController);

module.exports = app;
