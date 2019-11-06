const db = require("../models");
const ObjectId = require("mongodb").ObjectID;

// Defining methods for the booksController
module.exports = {
  // update configs
  update: function (req, res) {
    db.Config
      .updateOne({ _id: ObjectId(req.params.id) }, { $set: req.body })
      .then(config => {
        console.log(config);
        res.status(200).json(config);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      })
  }
};
