const express = require("express");
const router = express();

const {db} = require("./../database");

const {authenticateToken} = require("./../function/autentication");

router.post("/", authenticateToken, (req,res) => {
  res.json(req.user);
})

router.post("/all", (req,res) =>{
  const sql = "SELECT * FROM user"
  db.query(sql, (err, result) => {
    if(err)
      throw err;
    else{
      res.json(result);
    }
  })
})

router.post("/delete", (req,res) => {
  const id = req.body.id;
  const sql = `DELETE FROM user WHERE Id = ${id};`
  db.query(sql, (err, result) => {
    if(err)
      throw err;
    else{
      res.json("Nice");
    }
  })
})

module.exports = router;