let express = require("express");
require("dotenv").config();
let app = express();
const bodyParser = require("body-parser");

console.log("Hello World");

app.use(bodyParser.urlencoded({ extended: false }));

app.use("/public", express.static(__dirname + "/public"));

// Logging middleware
app.use(function (req, res, next) {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

app.get(
  "/now",
  function (req, res, next) {
    req.time = new Date().toString();
    next();
  },
  function (req, res) {
    return res.json({ time: req.time });
  }
);

// Echo route (Request params)
app.get("/:word/echo", function (req, res, next) {
  const word = req.params.word;
  return res.json({ echo: word });
});

// Name route (Query string)
app.get("/name", function (req, res, next) {
  const { first, last } = req.query;
  return res.json({ name: `${first} ${last}` });
});

app.post("/name", function (req, res, next) {
  const { first, last } = req.body;
  return res.json({ name: `${first} ${last}` });
});


// json route
app.get("/json", (req, res) => {
  const messageStyle = process.env.MESSAGE_STYLE;
  if (messageStyle === "uppercase") {
    return res.json({ message: "HELLO JSON" });
  }
  return res.json({ message: "Hello json" });
});

// Home route
app.get("/", (req, res) => {
  // res.send("Hello Express");
  res.sendFile(__dirname + "/views/index.html");
});

module.exports = app;
