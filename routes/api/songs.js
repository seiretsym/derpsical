const router = require("express").Router();
const songController = require("../../controllers/songController");

// Matches with "/"
router.route("/")
  .post(songController.create)

router.route("/:id")
  .put(songController.update)
  .delete(songController.delete)

module.exports = router;
