const router = require("express").Router();
const configController = require("../../controllers/configController");

// Matches with "api/configs"
router.route("/:id")
  .put(configController.update);

module.exports = router;
