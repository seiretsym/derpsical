const db = require("../models");
const bcrypt = require("bcrypt");

// Defining methods for the booksController
module.exports = {
  // create
  create: function (req, res) {
    console.log("db.User.create ran")
    bcrypt.hash(req.body.password, 10, function (err, hash) {
      if (err) {
        console.log(err);
        res.status(422).json(err)
      } else {
        let user = {
          username: req.body.username,
          password: hash
        }
        console.log(user)
        db.User.create(user)
          .then(userModel => {
            console.log(userModel)
            res.json(userModel)
          })
          .catch(err => {
            console.log(err);
            res.status(422).json(err)
          })
      }
    })
  },
  findAll: function (req, res) {
    db.User.find({ username: req.query.username })
      .then(user => {
        bcrypt.compare(req.query.password, user[0].password, function (err, conf) {
          if (conf) {
            res.json(user[0])
          } else {
            res.send(conf)
          }
        })
      })
  }
};
