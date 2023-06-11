const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const { db } = require("./../database");


router.post("/", (req,res) => {
  let username = req.body.username;
  let email = req.body.email;
  let password = req.body.password;
  let confirmPassword = req.body.confirmPassword;
  let coffe  = req.body.coffe;
  coffe === true ? coffe = 1 : coffe = 0;
  let image = "default.png"
  console.log("cafe", coffe);
  if(password != confirmPassword){
    console.log("Passwords don't match")
    res.json("1")
  }else{
    //This is a way to resolve the promise aka (Promise <pending>)
    let a = register(username, email, password, coffe, image);
    a.then((result) => {
      switch (result){
        case "1":
          res.json("2"); //Username or email already exists
          break;
        case "2":
          res.json("3"); //Invalid email format
          break;
        case "4":
          res.json("5"); //error inserting in the BD
          break;
        default:
          res.json("4"); //Success
          break; 
      }
    }).catch((err) => {
      console.log(err);
      res.json("6");
    })
  }
})

async function register(username, email, password, coffe, image){
  storedUser = [];
  storedEmail = [];
  let max = 0;

  //In this block we are going to check if the username or email already exists in the database
  let checkSQL = "SELECT Name, Email FROM user;";
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
        }
      }
    })
  );

  if(storedUser.includes(username) || storedEmail.includes(email)){
    return "1";
  }


  //Checking if the email is valid or if the email is already in our db
  let EmailVerification = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if(!email.match(EmailVerification)){
    return "2";
  }

  let sql = `INSERT INTO user (Name, Email, Password, Coffee, Photo, Perfil) VALUES ('${username}', '${email}', '${password}', '${coffe}', '${image}', 'user')`;
  let b = await new Promise((resolve, reject) =>  
    db.query(sql, (err, result) => {
      if(err)
        return "4";
      else
        resolve(result);
        return "3";
    })
  );
}

module.exports = router;