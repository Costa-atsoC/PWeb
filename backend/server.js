const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

const register = require("./routes/register");
const login = require("./routes/login");

const port = 5000

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use("/register", register);
app.use("/login", login);

app.listen(port, async () => {
  console.log(`App listening at http://localhost:${port}`);
});