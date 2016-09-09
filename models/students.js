var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NewStudent = new Schema({
  name: String,
  gender: String
})

module.exports = mongoose.model('Student', NewStudent)
