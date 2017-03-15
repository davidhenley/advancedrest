const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const { mongoose } = require('./db/mongoose');
const { Todo } = require('./models/todo');
const { User } = require('./models/user');

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  const todo = new Todo({
    text: req.body.text
  });
  todo.save()
    .then(doc => res.send(doc))
    .catch(err => res.status(400).send(err));
});

const port = 3000;
app.listen(port, () => {
  console.log(`Magic happens on port ${port}.`);
});

module.exports = { app };
