var mongoose = require("mongoose");

// schema structure
var Schema = mongoose.Schema

// create schema
var ProfileSchema = new Schema({
  fullname: {
    type: String,
    required: true
  },
  displayname: {
    type: String,
    required: true,
    unique: true,
  },
  inbox: [{
    type: Schema.Types.ObjectId,
    ref: "Message"
  }],
  songs: [{
    type: Schema.Types.ObjectId,
    ref: "Song"
  }],
  config: {
    type: Schema.Types.ObjectId,
    ref: "Config"
  }
})

// create model
var Profile = mongoose.model("Profile", ProfileSchema);

// export model
module.exports = Profile;