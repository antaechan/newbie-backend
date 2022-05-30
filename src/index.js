const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const teamRouter = require("./routes/team");
const matchRouter = require("./routes/match");

// server port, mongodb url
const PORT = 8080;
const MONGO_URI = "mongodb://127.0.0.1:27017/newbie";
// "mongodb://127.0.0.1:27017/newbie"
// "mongodb://sparcs:tnfqkrtm@ssal.sparcs.org:52190?authSource=admin";

// connect to MongoDB
const connect = () => {
  mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

connect();

const db = mongoose.connection;

const handleOpen = () => console.log("connected to DB");
const handleError = (error) => console.log(`disconnected: ${error}`);

db.once("open", handleOpen);
db.once("error", handleError);
db.once("disconnected", connect);

const app = express();

// server CORS handling
const corsOptions = {
  origin: true,
  credentials: true,
};
app.use(cors(corsOptions));

// parses incoming JSON requests and puts the parsed data in req.body
app.use(express.json());

//Middleware
app.use("/team", teamRouter);
app.use("/match", matchRouter);

// Implement Server
app.listen(PORT, function () {
  console.log("listening on 8080");
});

module.exports = app;
