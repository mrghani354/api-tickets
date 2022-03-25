const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.send({
    greeting: "Welcome in Rest API " + process.env.NODE_ENV.toUpperCase(),
  });
});

module.exports = router;