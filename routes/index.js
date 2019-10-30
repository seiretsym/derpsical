const path = require("path");
const router = require("express").Router();
const api = require("./api")

// api routes
router.use("/api", api)

// send react app
router.use(function(req, res) {
    res.sendFile(path.join(__dirname, "../client/public/index.html"))
})

module.exports = router;