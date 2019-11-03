const router = require("express").Router();
const userController = require("../../controllers/userController");

// Matches with "/users"
router.route("/")
  .post(userController.create)
  .get(userController.findOne)
  .put(userController.updatePassword)

module.exports = router;
