'use strict';
var session = require('express-session')
var bcrypt = require('bcrypt');
var mongoose = require('mongoose'),
  Task = mongoose.model('Tasks'),
  User = mongoose.model('User'),
  Kweet = mongoose.model('Kweet');

exports.authenticate_user = function(req, res){
  console.log(req.body);
  var password = req.body.password;
  var username = req.body.username;
  console.log(username);
  User.findOne({username: username}, function(err, user){
        if(err){
          res.status(400);
          res.send('invalid username');
        }
        if(user === null){
          res.send('no user found').status(401);
        }
          bcrypt.hash(password, 10, function(err, hash) {
            if (err) { throw (err); }
            bcrypt.compare(password, hash, function(err, result) {
                if (err) { throw (err); }
                if(result === true){
                  res.send(user);
                } else {
                  res.status(400);
                  res.send('invalid password');
                }
            });
        });
      }
  );
}

exports.create_user = function(req, res){
  validateUserJSON(req);
  var new_user = new User(req.body);
  new_user.save(function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
}

exports.update_user = function(req, res){
  User.findById(req.params._id, function(err, user){
    if(err)
      res.send(err);
    
    user.biography = req.body.biography ? req.body.biography : user.biography;
    user.website = req.body.website ? req.body.website : user.website;
    user.location = req.body.location ? req.body.location : user.location;

    user.save(function(err){
      if(err)
        res.json(err);
      res.json(user);
    });
  });
}

exports.remove_user = function(req, res){
  User.remove({_id: req.params._id}, function(err, user){
    if(err)
      res.send(err);
    res.json({
      status: "succes",
      message: "User has been removed"
    });
  });
}

exports.get_all_user = function(req, res){
  User.find({}, function(err, users) {
    if(err)
      res.send(err);
    res.json(users)
  });
}

exports.get_user_by_id = function(req, res){
  User.findById({_id: req.params._id}, function(err, user){
    if(err)
      res.send(err);
    res.json(user);
  })
}

exports.get_user_by_username = function(req, res){
  User.find({username: req.params.username}, function(err, user){
    if(err)
      res.send(err);
    res.json(user);
  })
}

exports.get_users_by_username = function(req, res){
  User.findById({username: req.params.username}, function(err, user){
    if(err)
      res.send(err);
    res.json(user);
  })
}

exports.add_follower = function(req, res){
  User.findById({_id: req.params._id}, function(err, user){
    if(err)
      res.send(err);
      User.findById({_id: req.params._followId}, function(err1, follow){
        if(err)
          res.send(err);
        user.followers.push(follow);
        follow.followings.push(user);

        user.save(function(err){
          if(err)
            res.send('error saving')
        });

        follow.save(function(err){
          if(err)
          res.send('error saving')
        });

        res.json('Following added.');
      });
  })
}

exports.add_following = function(req, res){
  User.findById({_id: req.params._id}, function(err, user){
    if(err)
      res.send(err);
      User.findById({_id: req.params._followId}, function(err1, follow){
        if(err)
          res.send(err);
        user.followings.push(follow);
        follow.followers.push(user);

        user.save(function(err){
          if(err)
            res.send('error saving')
        });

        follow.save(function(err){
          if(err)
          res.send('error saving')
        });

        res.json('Following added.');
      });
  })
}

exports.get_followers = function(req, res){
  User.findById({_id: req.params._id})
    .populate('followers')
    .exec(function(err, user){
      if(err)
        res.send(err);
      res.send(user.followers);
  })
}

exports.get_followings = function(req, res){
  User.findById({_id: req.params._id})
    .populate('followings')
    .exec(function(err, user){
      if(err)
        res.send(err);
      res.send(user.followings);
  })
}

exports.create_kweet = function(req, res){
  var new_kweet = new Kweet(req.body);
  //console.log(req.body.user_id);
  User.findById({_id: req.body.user_id}, function(err, user){
    if(err)
      res.send(err);

    new_kweet.save(function(err, kweet){
      if(err)
        res.send(kweet);
    });

    user.kweets.push(new_kweet);

    user.save(function(err){
      if(err)
        res.send('error saving')
    });  

     res.json('done');
  })
}

exports.delete_kweet = function(req, res){
  console.log(req);
  Kweet.deleteOne(req.body, function(err, obj){
    if(err)
      res.send(err);  
    res.json(req.body);
  })
}

exports.get_all_kweet = function(req, res){
  User.findById({_id: req.params._id})
    .populate('kweets')
    .exec(function(err, user){
      if(err)
        res.send(err);
      res.send(user.kweets);
  })
}

exports.get_last_kweet = function(req, res){
  User.findById({_id: req.params._id})
    .populate('kweets')
    .sort({created_date: -1})
    .exec(function(err, user){
      if(err)
        res.send(err);
      res.send(user.kweets);
  })
}

exports.echo = function(req, res) {
  res.json("echo this is a test");
}

exports.list_all_tasks = function(req, res) {
  Task.find({}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

function validateUserJSON(req){
  if(!req.body.username){
    return res.status(400).send({
      succes: 'false',
      message: 'username is required'
    });
  }else if(!req.body.email){
    return res.status(400).send({
      succes: 'false',
      message: 'email is required'
    });
  }else if(!req.body.name){
    return res.status(400).send({
      succes: 'false',
      message: 'name is required'
    });
  }else if(!req.body.password){
    return res.status(400).send({
      succes: 'false',
      message: 'password is required'
    });
  }
}

function validateKweetJSON(req){
  if(!req.body.message){
    return res.status(400).send({
      succes: 'false',
      message: 'message is required'
    });
  }else if(!req.body.username){
    return res.status(400).send({
      succes: 'false',
      message: 'user is required'
    });
  }else if(!req.body.user){
    return res.status(400).send({
      succes: 'false',
      message: 'user is required'
    });
  };
}