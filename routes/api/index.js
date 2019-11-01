const router = require("express").Router();
const users = require("./users");
const songs = require("./songs");
const profiles = require("./profiles");
const messages = require("./messages");
const configs = require("./configs");


// User routes
router.use("/users", users);

// Song Routes
router.use("/songs", songs);

// Profile Routes
router.use("/profiles", profiles)

// Message Routes
router.use("/messages", messages)

// Config Routes
router.use("/configs", configs)

module.exports = router;
