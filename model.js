const mongoose = require('mongoose');

const Schema = mongoose.Schema({
     name: String,
     email: String,
     about: String
}, { timestamps: true });

const User = mongoose.model('User', Schema);

module.exports = User;