var mongoose = require("mongoose");

// schema structure
var Schema = mongoose.Schema

// create schema
var MessageSchema = new Schema({
  from: {
    type: Schema.Types.ObjectId,
    ref: "Profile",
    required: true,
  },
  to: {
    type: Schema.Types.ObjectId,
    ref: "Profile",
    required: true,
  },
  message: {
    type: String,
    required: true
  },
  read: {
    type: Boolean,
    default: false,
  }
})

// create model
var Message = mongoose.model("Message", MessageSchema);

// export model
module.exports = Message;