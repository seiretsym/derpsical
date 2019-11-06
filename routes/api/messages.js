const router = require("express").Router();
const messageController = require("../../controllers/messageController");

// Matches with "api/messages"
router.route("/")
  .post(messageController.create);

router.route("/:id")
  .delete(messageController.delete);

module.exports = router;
