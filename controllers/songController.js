const db = require("../models");
const ObjectId = require("mongodb").ObjectId;

// Defining methods for the booksController
module.exports = {
  // create the song
  create: function (req, res) {
    let composer = ObjectId(req.body.composer);
    let newSong = {
      title: req.body.title,
      notes: req.body.notes,
      composer: composer
    }
    db.Song
      .create(newSong)
      .then(song => {
        console.log(song)
        // attach it to user
        db.Profile.updateOne({ _id: composer }, { $push: { songs: song._id } }, { new: true })
          .then(profile => {
            console.log(profile)
            res.status(200).json(song)
          })
          .catch(err => {
            console.log(err)
            res.status(422).json(err)
          })
      })
      // error handling
      .catch(err => {
        console.log(err)
        res.status(500).json(err)
      })
  },
  // update a song
  update: function (req, res) {
    let id = ObjectId(req.params.id);
    let uid = ObjectId(req.body.uid);
    db.Song
      .update({ _id: id, composer: uid }, { $set: req.body })
      .then(song => {
        res.status(200).json(song);
      })
      // error handling
      .catch(err => {
        console.log(err);
        res.status(422).json(err);
      })
  },
  // delete a song
  delete: function (req, res) {
    let id = ObjectId(req.params.id);
    let uid = ObjectId(req.body.uid);
    db.Song
      .remove({ _id: id, composer: uid })
      .then(aww => {
        res.status(200).json(aww)
      })
      // error handling
      .catch(err => {
        console.log(err)
        res.status(500).json(err)
      })
  }
};
