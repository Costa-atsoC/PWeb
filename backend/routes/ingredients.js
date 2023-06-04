const express = require("express");
const router = express();

const { db } = require("./../database"); 

router.post("/", async (req, res) => {

  const sql = "SELECT * FROM ingredients;";
  let a = await new Promise((resolve, reject) => 
    db.query(sql, (err, result) => {
      if(err)
        throw err;
      else{
        resolve(result);
        res.json(result);
      }
    })
  );
});

router.post("/remove", async (req, res) => {
  const {id} = req.body;

  sql = `DELETE FROM ingredients WHERE id = '${id}';`;
  let a = await new Promise((resolve, reject) => 
    db.query(sql, (err, result) => {
      if(err){
        reject(err);
        res.status(500).json("Error");
      }
      else{
        resolve(result);
        res.status(200).json("Nice");
      }
    })
  );
});

router.post("/addCheck", async (req, res) => {
  const {name, type, calories} = req.body;
  let { photo } = req.body;
  if(photo == undefined)
    photo = "logo.png"; 

  const sql =`INSERT INTO admincheck(Name, Type, Photo, Calories)VALUES('${name}', '${type}', '${photo}', '${calories}');`
  let a = await new Promise((resolve, reject) => 
    db.query(sql, (err, result) => {
      if(err){
        reject(err);
        res.status(500).json("Error");
      }
      else{
        resolve(result);
        res.status(200).json("Nice");
      }
    })
  );
});

router.post("/check", async (req, res) => {
  const sql = "SELECT * FROM admincheck;";
  let a = await new Promise((resolve, reject) => 
    db.query(sql, (err, result) => {
      if(err){
        throw(err);
      }
      else{
        resolve(result);
        res.status(200).json(result);
      }
    })
  );

});

router.post("/removeCheck", async (req, res) => {
  const {id} = req.body;

  sql = `DELETE FROM admincheck WHERE id = '${id}';`;
  let a = await new Promise((resolve, reject) => 
    db.query(sql, (err, result) => {
      if(err){
        reject(err);
        res.status(500).json("Error");
      }
      else{
        resolve(result);
        res.status(200).json("Nice");
      }
    })
  );
});

router.post("/add", async (req, res) => {
  const {id} = req.body;

  const sql =`INSERT INTO ingredients(Name, Type, Photo, Calories) SELECT Name, Type, Photo, Calories FROM admincheck WHERE id = '${id}';`
  console.log(sql);
  let a = await new Promise((resolve, reject) => 
    db.query(sql, (err, result) => {
      if(err){
        reject(err);
        res.status(500).json("Error");
      }
      else{
        resolve(result);
        const sql2 = `DELETE FROM admincheck WHERE id = '${id}';`;
        db.query(sql2, (err, result) => {
          if(err){
            reject(err);
            res.status(500).json("Error");
          }
          else{
            resolve(result);
            res.status(200).json("Nice");
          }
        })
      }
    })
  );
});


module.exports = router;