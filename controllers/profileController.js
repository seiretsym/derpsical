const db = require("../models");
const ObjectId = require("mongodb").ObjectId;

// Defining methods for the booksController
module.exports = {
  // something here
  findAndUpdate: function (req, res) {
    console.log("--db.Profile.findAndUpdate")
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
  },
  findOne: function (req, res) {
    console.log("--db.Profile.findOne--")
    db.Profile
      .find({ _id: ObjectId(req.params.id) })
      .populate("songs")
      .populate({
        path: "inbox",
        model: "Message",
        populate: {
          path: "from",
          model: "Profile"
        }
      })
      .then(profile => {
        console.log(profile)
        res.status(200).json(profile)
      })
      .catch(err => {
        console.log(err)
        res.status(404).json(err)
      })
  }
};
