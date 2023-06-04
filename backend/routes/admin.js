const express = require("express");
const router = express();

router.post("/", (req, res) => {
  const id = req.body.id;
  
  if(id == 1){
    res.send("1");
  }else{
    res.send("0");
  }
})

module.exports = router;