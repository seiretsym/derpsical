const router = require("express").Router();
const songController = require("../../controllers/songController");

// Matches with "api/songs"
router.route("/sort/:id")
  .get(songController.findAndSortBy);
router.route("/recent")
  .get(songController.findRecent);
router.route("/:id")
  .get(songController.findOne)
  .put(songController.update)
  .delete(songController.delete);
router.route("/")
  .get(songController.findAll)
  .post(songController.create);

module.exports = router;
