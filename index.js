const express = require("express");
const app = express();
const checker = require("./checker");

app.use(express.json());

require("./routes")(app);

module.exports = app;

// const port = process.env.PORT || 5000;
// app.listen(port, () => console.log("Listening on port ${port}"));
