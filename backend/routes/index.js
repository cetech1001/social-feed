const express = require('express');
const router = express.Router();

const users = [
  {
    username: 'alex',
    firstName: 'Chiemerie',
    lastName: 'Ezeoke',
    password: 'Alex230012',
    status: 'offline'
  }
];

const posts = [
  {
    id: 1,
    user: 'alex',
    body: 'Hello World',
    likes: 0,
    usersLiked: []
  }
];

router.post('/create/user', function(req, res) {
  let flag = false;

  users.forEach(user => {
    if (user.username === req.body.username) {
      flag = true;
    }
  });

  if (flag) {
    res.status(200).json({error: 'Username already exists'});
  } else {
    users.push({...req.body});
    res.status(200).json({ message: 'User Created Successfully!', user: req.body });
  }
});

router.post('/login', function(req, res) {
  let flag = false;
  let foundUser = {};

  users.forEach(user => {
    if (user.username === req.body.username && user.password === req.body.password) {
      flag = true;
      user.status = 'online';
      foundUser = user;
    }
  });

  if (flag) {
    res.status(200).json({ message: 'Login Successful!', user: foundUser });
  } else {
    res.status(200).json({error: 'Invalid Login Details!'});
  }
});

router.post('/logout', function (req, res) {
  users.forEach(user => {
    if (user.username === req.body.username) {
      user.status = 'offline';
    }
  });
  res.status(200).json({ message: 'You\'re Logged out!' });
});

router.get('/users', function (req, res) {
  res.status(200).json(users);
});

router.post('/create/post', function (req, res) {
  const id = Math.max(...posts.map(post => post.id)) + 1;
  posts.push({id, ...req.body, usersLiked: []});
  res.status(200).json({ message: 'New Post Added!', post: req.body });
});

router.get('/like/post/:id/:user', function (req, res) {
  posts.forEach(post => {
    if (post.id === parseInt(req.params.id)) {
      let flag = false;
      post.usersLiked.forEach(user => {
        if (user === req.params.user) {
          post.likes--;
          flag = true;
          post.usersLiked.splice(post.usersLiked.indexOf(user), 1);
        }
      });
      if (!flag) {
        post.likes++;
        post.usersLiked.push(req.params.user);
      }
    }
  });
  res.status(200).json({message: 'You liked a post!'});
});

router.get('/posts', function (req, res) {
  res.status(200).json(posts);
});

module.exports = router;
