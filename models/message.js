var mongoose = require("mongoose");

// schema structure
var Schema = mongoose.Schema

// create schema
var MessageSchema = new Schema({
  from: {
    type: String,
    required: true
  },
  to: {
    type: String,
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