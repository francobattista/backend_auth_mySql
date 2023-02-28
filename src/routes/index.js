const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("holaaaaaa");
});

module.exports = router;

