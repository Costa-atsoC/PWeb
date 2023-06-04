const express = require("express");
const router = express();
const axios = require("axios");

router.get("/", async  (req, res) => {
  try {
    const response = await axios.get("https://coffee.alexflipnote.dev/random.json");
    const data = response.data;
    res.json(data);
  } catch (error) {
    console.error("Error fetching coffee data:", error);
    res.status(500).json({ error: "Failed to fetch coffee data" });
  }
})

module.exports = router;