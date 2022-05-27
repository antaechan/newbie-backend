const express = require("express");
const app = express();

PORT = 8080;
app.set("views", "./views");

app.listen(PORT, function () {
  console.log("listening on 8080");
});
