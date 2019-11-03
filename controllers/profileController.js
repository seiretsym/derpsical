const db = require("../models");

// Defining methods for the booksController
module.exports = {
  // something here
  findAndUpdate: function (req, res) {
    console.log("profile update function ran")
    db.Profile
      .updateOne({ _id: req.params.id }, { $set: req.body })
      .then(update => {
        console.log(update)
        res.status(200).json(req.body)
      })
      .catch(err => {
        console.log(err)
        res.status(422).json(err)
      })
  }
};
