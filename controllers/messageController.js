const db = require("../models");
const ObjectId = require("mongodb").ObjectID;

// Defining methods for the booksController
module.exports = {
  // create message
  create: function (req, res) {
    let from = ObjectId(req.body.from)
    let to = ObjectId(req.body.to)
    let message = {
      from: from,
      to: to,
      message: req.body.message,
    }
    // make that message
    db.Message
      .create(message)
      .then(msg => {
        console.log(msg);
        // push it to receiver's profile
        db.Profile
          .updateOne({ _id: to }, { $push: { inbox: msg._id } }, { new: true })
          .then(profile => {
            console.log(profile);
            res.status(200).json(msg);
          })
          // error handling
          .catch(err => {
            console.log(err);
            res.status(500).json(err);
          })
      })
      // error handling
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      })
  },
  // delete message
  delete: function (req, res) {
    db.Message
      .remove({ _id: req.params.id })
      .then(message => {
        console.log(message)
        res.status(200).json(message);
      })
      // error handling
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      })
  }
};
