const express = require('express'),
     controller = require('./controllers'),
     Router = express.Router();


// Create New User
Router.route('/create').post(controller.createNewUser);

// Get User
Router.route('/alluser').get(controller.getUser);

// Get user by email
Router.route('/user').get(controller.getUserByEmail);

// update user
Router.route('/user/patch').patch(controller.userUpdata);
Router.route('/user/put').put(controller.putUser);

// Delete user
Router.route('/user/delete').delete(controller.deleteUser);

// Filter
Router.route('/user/filter').get(controller.filter)

module.exports = Router;