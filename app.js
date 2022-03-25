const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

// MONGODB Connection
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", (error) => {
  console.log("Mongoose error: " + error);
});

db.once("open", () => {
  console.log("Mongoose is connected ...");
});

// Routes Prefix
app.use("/", require("./routes/index"));
app.use("/api/auth", require("./routes/Auth"));
app.use("/api/bank", require("./routes/Bank"));
app.use("/api/event", require("./routes/Event"));
app.use("/api/ticket", require("./routes/Ticket"));
app.use("/api/user", require("./routes/User"));

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("Server Running on PORT: " + PORT);
});
