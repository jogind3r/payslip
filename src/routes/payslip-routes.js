const express = require("express");
const router = express.Router();
const CalcTax = require("../controller/tax");

router.post("/", (req, res) => {
  const tax = new CalcTax(req, res);
});

module.exports = router;
