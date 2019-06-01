'use strict';
module.exports = function(app) {
  var UserController = require('../controllers/UserController');
  // todoList Routes
  app.route('/echo')
    .get(UserController.echo);

  app.route('/users/authenticate')
    .post(UserController.authenticate_user);

  app.route('/users')
    .get(UserController.get_all_user)
    .post(UserController.create_user)
    .delete(UserController.remove_user)
    .put(UserController.update_user);

  app.route('/users/:_id')
    .get(UserController.get_user_by_id);

  app.route('/users/single/:username')
    .get(UserController.get_user_by_username);

  app.route('/users/all/:username')
    .get(UserController.get_users_by_username);
  
  app.route('/users/:_id/following/:_followId')
    .post(UserController.add_following);

  app.route('/users/:_id/following')
    .get(UserController.get_followings);

  app.route('/users/:_id/follower/:_followId')
    .post(UserController.add_follower);

  app.route('/users/:_id/follower')
    .get(UserController.get_followers);

  app.route('/echo')
    .get(UserController.echo);

  app.route('/kweeter')
    .post(UserController.create_kweet)
    .delete(UserController.delete_kweet);

  app.route('/kweeter/all/:_id')
    .get(UserController.get_all_kweet);

  app.route('/kweeter/latest/:_id')
    .get(UserController.get_last_kweet);

};