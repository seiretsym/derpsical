const router = require("express").Router();
const userController = require("../../controllers/userController");

// Matches with "api/users"
router.route("/")
  .post(userController.create)
  .get(userController.findOne)
  .put(userController.updatePassword)

module.exports = router;
