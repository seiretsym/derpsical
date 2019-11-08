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
      composer: composer,
      tempo: parseInt(req.body.tempo)
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
    console.log(req.body)
    let id = ObjectId(req.params.id);
    db.Song
      .updateOne({ _id: id }, { $set: req.body })
      .then(song => {
        console.log(song)
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
    db.Song
      .remove({ _id: id })
      .then(aww => {
        res.status(200).json(aww)
      })
      // error handling
      .catch(err => {
        console.log(err)
        res.status(500).json(err)
      })
  },
  findRecent: function (req, res) {
    db.Song
      .find({})
      .populate("composer", "displayname")
      .sort({ created: -1 })
      .limit(5)
      .then(songs => {
        console.log(songs)
        res.status(200).json(songs)
      })
      .catch(err => {
        console.log(err)
        res.status(500).json(err)
      })
  },
  findOne: function (req, res) {
    db.Song
      .find({ _id: req.params.id })
      .populate("composer", "displayname")
      .then(song => {
        console.log(song)
        res.status(200).json(song)
      })
      .catch(err => {
        console.log(err)
        res.status(404).json(err)
      })
  },
  findAll: function (req, res) {
    db.Song
      .find({})
      .populate("composer", "displayname")
      .then(songs => {
        console.log(songs)
        res.status(200).json(songs)
      })
      .catch(err => {
        console.log(err)
        res.status(404).json(err)
      })
  },
  findAndSortBy: function (req, res) {
    let sortType = {
      [req.params.id]: -1,
    }
    db.Song
      .find({})
      .populate("composer", "displayname")
      .sort(sortType)
      .then(songs => {
        console.log(songs)
        res.status(200).json(songs)
      })
      .catch(err => {
        console.log(err)
        res.status(500).json(err)
      })
  }
};
