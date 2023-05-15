const express = require("express");
const router = express();
const jwt = require("jsonwebtoken");
require('dotenv').config()

const { db } = require("./../database"); 

router.post("/", (req,res) => {
  let username = req.body.username;
  let password = req.body.password;
  let user = {username, password};

  let a = login(username, password);
  a.then((result) => {
    switch (result){
      case "1":
        res.json({Status:"1",Token: token(user)}); //Success
        break;
      case "2":
        res.json({Status: "2"}); //Wrong password or username
        break;
      default:
        res.json({Status: "3"}); //Error
        break;
    }
    }).catch((err) => {
      console.log(err);
      res.json({Status: "3"}); //Error
  })
})


async function login(username, password){
  let storedUser = [];
  let storedEmail = [];
  let storedPassword = [];
  let max = 0;

  let checkSQL = "SELECT Name, Password FROM user;";
  let a = await new Promise((resolve, reject) => 
    db.query(checkSQL, (err, result) => {
      if(err)
        throw err;
      else {
        resolve(result);
        max = result.length;
        for(let i = 0; i < max; i++){
          storedUser.push(result[i].Name);
          storedEmail.push(result[i].Email);
          storedPassword.push(result[i].Password);
        }
      }
    })
  );

  if(storedUser.includes(username)){
    let index = storedUser.indexOf(username);
    if(storedPassword[index] == password){
      console.log("Login success");
      return "1";
    }else{
      console.log("Wrong password");
      return "2";
    }
  }else{
    console.log("User not found");
    return "2";
  }
}

function token(user){
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);

  return accessToken;
}

module.exports = router;