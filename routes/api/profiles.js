const router = require("express").Router();
const profileController = require("../../controllers/profileController");

// Matches with "api/profiles"
router.route("/:id")
  .get(profileController.findOne)
  .put(profileController.findAndUpdate)


module.exports = router;
