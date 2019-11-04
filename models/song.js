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
  tempo: {
    type: Number,
  },
  composer: {
    type: Schema.Types.ObjectId,
    ref: "Profile"
  },
  created: {
    type: Date,
    default: Date.now()
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