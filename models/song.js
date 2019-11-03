var mongoose = require("mongoose");

// schema structure
var Schema = mongoose.Schema

// create schema
var SongSchema = new Schema({
  title: {
    type: String
  },
  notes: {
    type: String
  },
  composer: {
    type: Schema.Types.ObjectId,
    ref: "User"
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