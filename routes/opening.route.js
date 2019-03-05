const router = require("express").Router();
var openings = require("../controllers/opening.controller");

// get a list of all available openings for patients to book
router.get("/", openings.getOpenings);

// post a new opening
router.post("/new", openings.postOpening);

// book an existing opening
router.post("/book", openings.bookOpening);

// delete an opening
router.delete("/", openings.deleteOpening);

module.exports = router;