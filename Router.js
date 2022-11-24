const express = require('express'),
     controller = require('./controllers'),
     Router = express.Router();


// Create New User
Router.route('/create').post(controller.createNewUser);

// Get User
Router.route('/alluser').get(controller.getUser);


module.exports = Router;