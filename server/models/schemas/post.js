const {Schema} = require('mongoose');
const shortId = require('./types/short-id')

module.exports = new Schema({
  shortId,
  img: String,
  title: String,
  content: String,
  author: {
    type:Schema.Types.ObjectId,
    ref:"User",
    required:true
  }
}, {
  timestamps: true,
});