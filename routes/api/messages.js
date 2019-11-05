const router = require("express").Router();
const messageController = require("../../controllers/messageController");

// Matches with "api/messages"
router.route("/")
  .post(messageController.create)
  .delete(messageController.delete);

module.exports = router;
