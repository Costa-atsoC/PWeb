const express = require("express");
const router = express();
const jwt = require("jsonwebtoken");
require('dotenv').config()

const { db } = require("./../database"); 
let id;

router.post("/", (req,res) => {
  let username = req.body.username;
  let password = req.body.password;

  let a = login(username, password);
  a.then((result) => {
    switch (result){
      case "1":
        let tok = token();
        tok.then((result) => {
          res.json({Status:"1",Token: result}); //Success
        })
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
  let storedId = [];
  let max = 0;

  let checkSQL = "SELECT Id, Name, Email, Password FROM user;";
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
          storedId.push(result[i].Id);
          storedPassword.push(result[i].Password);
        }
      }
    })
  );

  if(storedUser.includes(username) || storedEmail.includes(username)){
    let index;
    if(storedUser.includes(username))
      index = storedUser.indexOf(username);  
    else
      index = storedEmail.indexOf(username);
    if(storedPassword[index] == password){
      id = storedId[index];
      console.log("Login success ");
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

async function token(){
  let user = {};
  let accessToken;

  const sql = 'SELECT * FROM user WHERE Id = ' + id + ';';
  let a = await new Promise((resolve, reject) => 
    db.query(sql, (err, result) => {
      if(err)
        throw err;
      else{
        resolve(result);
        user = {
          id: result[0].Id,
          username: result[0].Name,
          email: result[0].Email,
          password: result[0].Password,
          coffe: result[0].Coffe,
          inicio: result[0].Inicio,
          photo: result[0].Photo,
          perfil: result[0].Perfil
        }
      }
    })
  );

  accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
  return accessToken;
}

module.exports = router;