require('./config/config.js');

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const _ = require('lodash');
const { ObjectID } = require('mongodb');

const { mongoose } = require('./db/mongoose');
const { Todo } = require('./models/todo');
const { User } = require('./models/user');
const { authenticate } = require('./middleware/authenticate');

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// POST /todos
app.post('/todos', (req, res) => {
  const todo = new Todo({
    text: req.body.text
  });
  todo.save()
    .then(doc => res.send(doc))
    .catch(err => res.status(400).send(err));
});

// GET /todos
app.get('/todos', (req, res) => {
  Todo.find().then(todos => {
    res.send({ todos });
  }, (err) => {
    res.status(400).send(err);
  });
});

// GET /todos/:id
app.get('/todos/:id', (req, res) => {
  const id = req.params.id;
  if (!ObjectID.isValid(id)) return res.status(404).send();
  Todo.findById(id).then(todo => {
    if (!todo) return res.status(404).send();
    res.send({ todo });
  }).catch(err => res.status(400).send());
});

// DELETE /todos/:id
app.delete('/todos/:id', (req, res) => {
  const id = req.params.id;
  if (!ObjectID.isValid(id)) return res.status(404).send();
  Todo.findByIdAndRemove(id).then(todo => {
    if (!todo) return res.status(404).send();
    res.send({ todo });
  }).catch(err => res.status(400).send());
});

// PATCH /todos/:id
app.patch('/todos/:id', (req, res) => {
  const id = req.params.id;
  const body = _.pick(req.body, ['text', 'completed']);
  if (!ObjectID.isValid(id)) return res.status(404).send();
  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }
  Todo.findByIdAndUpdate(id, { $set: body }, { new: true })
    .then(todo => {
      if (!todo) return res.status(404).send();
      res.send({ todo });
    })
    .catch(err => res.status(400).send());
});

// POST /users
app.post('/users', (req, res) => {
  const body = _.pick(req.body, ['email', 'password']);
  const user = new User(body);
  user.save()
    .then(() => {
      return user.generateAuthToken();
    }).then(token => {
      res.header('x-auth', token).send(user);
    }).catch(err => res.status(400).send(err));
});

// POST /users/login
app.post('/users/login', (req, res) => {
  const body = _.pick(req.body, ['email', 'password']);

  User.findByCredentials(body.email, body.password)
    .then(user => {
      return user.generateAuthToken().then(token => {
        res.header('x-auth', token).send(user);
      });
    })
    .catch(err => {
      res.status(400).send();
    });
});

// GET /users/me
app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Magic happens on port ${port}.`);
});

module.exports = { app };
