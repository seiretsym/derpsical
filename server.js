// dependencies
const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");

// server config
const app = express();
const PORT = process.env.PORT || 3001;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// for heroku
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

// routes
app.use(routes);

// Define any API routes before this runs
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// connect to mongo~
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/derpsical");

// start server
app.listen(PORT, () => console.log("Server listening on port: " + PORT))