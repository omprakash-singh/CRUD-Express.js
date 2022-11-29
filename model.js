const mongoose = require('mongoose');

const Schema = mongoose.Schema({
     name: {
          type: String
     },
     email: {
          type: String
     },
     about: {
          type: String
     }
}, { timestamps: true });

const User = mongoose.model('User', Schema);

module.exports = User;