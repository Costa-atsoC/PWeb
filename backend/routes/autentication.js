require('dotenv').config()

const express = require("express");
const router = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const jwt = require("jsonwebtoken");

router.post("/", (req,res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if(token == null)
    return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if(err)
      return res.sendStatus(403);
    req.user = user;
    next(); 
  });
})