var mongoose = require("mongoose");

// schema structure
var Schema = mongoose.Schema

// create schema
var ConfigSchema = new Schema({
  keymap: {
    type: Array
  }
})

// create model
var Config = mongoose.model("Config", ConfigSchema);

// export model
module.exports = Config;