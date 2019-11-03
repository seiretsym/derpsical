const db = require("../models");
const bcrypt = require("bcrypt");

// Defining methods for the booksController
module.exports = {
  // create
  create: function (req, res) {
    bcrypt.hash(req.body.password, 10, function (err, hash) {
      if (err) {
        // send back 422 and error message if error
        res.status(422).json(err)
      } else {
        // otherwise create a user
        let user = {
          username: req.body.username,
          password: hash
        }
        db.User
          .create(user)
          .then(userModel => {
            console.log(userModel);
            // create a profile for user
            // append part of the UID to displayname
            let id = String(userModel._id);
            let suffix = id.slice(5, 10);
            db.Profile
              .create({ fullname: userModel.username, displayname: userModel.username + "_derp_" + suffix })
              // then attach profile to user
              .then(profile => {
                db.User.update(userModel, { $set: { profile: profile._id } })
                  .then(() => {
                    res.json(userModel)
                  })
                  // error handling
                  .catch(err => {
                    console.log("user update error");
                    console.log(err);
                    res.status(422).json(err);
                  })
              })
              // error handling
              .catch(err => {
                console.log("profile create error");
                console.log(err);
                res.status(422).json(err);
              })
          })
          // more error handling
          .catch(err => {
            console.log("create user error");
            res.status(422).json(err);
          })
      }
    })
  },
  // search for user for auth
  findOne: function (req, res) {
    if (req.query.auto) {
      db.User
        .find({ username: req.query.username, password: req.query.password })
        .populate("profile")
        .then(user => {
          res.json(user[0])
        })
        .catch(err => {
          res.status(422).json(err)
        })
    } else {
      db.User
        .find({ username: req.query.username })
        .populate("profile")
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
  },
  updatePassword: function (req, res) {
    console.log(req.body.query)
    bcrypt.hash(req.body.pw, 10, function (err, hash) {
      console.log(hash);
      if (err) {
        console.log(err);
        return err;
      }

      db.User
        .update(req.body.query, { $set: { password: hash } })
        .then(update => {
          console.log(update);
          res.status(200).json(hash);
        })
        .catch(err => {
          console.log(err);
          res.status(422).json(err);
        })
    })

  }
};
