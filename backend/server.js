const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

const register = require("./routes/register");
const login = require("./routes/login");
const userInfo = require("./routes/userInfo");
const admin = require("./routes/admin")
const ingredients = require("./routes/ingredients");
const coffee = require("./routes/coffee");

const port = 5000

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use("/register", register);
app.use("/login", login);
app.use("/userInfo", userInfo);
app.use("/admin", admin);
app.use("/ingredients", ingredients);
app.use("/coffee", coffee);



app.listen(port, async () => {
  console.log(`App listening at http://localhost:${port}`);
});