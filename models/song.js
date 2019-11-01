var mongoose = require("mongoose");

// schema structure
var Schema = mongoose.Schema

// create schema
var SongSchema = new Schema({
  notes: {
    type: String
  },
  share: {
    type: Boolean,
    default: true,
  }
})

// create model
var Song = mongoose.model("Song", SongSchema);

// export model
module.exports = Song;