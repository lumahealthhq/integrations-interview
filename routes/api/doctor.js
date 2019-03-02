const express = require("express");
const router = express.Router();

// @route   GET api/doctor/test
// @desc    Tests doctor route
router.get("/test", (req, res) => res.json({ msg: "Doctor works" }));

module.exports = router;
