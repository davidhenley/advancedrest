const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const { ObjectID } = require('mongodb');

const { mongoose } = require('./db/mongoose');
const { Todo } = require('./models/todo');
const { User } = require('./models/user');

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());

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
  if (!ObjectID.isValid) return res.status(404).send();
  Todo.findByIdAndRemove(id).then(todo => {
    if (!todo) return res.status(400).send();
    res.send({ todo });
  }).catch(err => res.status(400).send());
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Magic happens on port ${port}.`);
});

module.exports = { app };
