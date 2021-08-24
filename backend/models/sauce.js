const mongoose = require('mongoose');

const sauceSchema = mongoose.Schema({
  _id: Number, 
  userId: String, 
  name: String, 
  manufacturer: String, 
  description: String, 
  mainPepper: String, 
  imageUrl: String,
  heat: Number, 
  likes: Number, 
  dislikes: Number, 
  usersLiked: Array, 
  usersDisliked: Array 
});

module.exports = mongoose.model('sauce', sauceSchema);

