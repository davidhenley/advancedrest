const { ObjectID } = require('mongodb');
const { mongoose } = require('../server/db/mongoose');
const { Todo } = require('../server/models/todo');
const { User } = require('../server/models/user');

// const id = '58cc11f6b640d94302cc6a5211';
//
// if (!ObjectID.isValid(id)) {
//   console.log('ID not valid');
// }

// Todo.find({
//   _id: id
// }).then(todos => {
//   console.log('Todos', todos);
// });
//
// Todo.findOne({
//   _id: id
// }).then(todo => {
//   console.log('Todo', todo);
// });

// Todo.findById(id).then(todo => {
//   if (!todo) return console.log('Id not found');
//   console.log('Todo by id', todo);
// }).catch(err => console.log(err));

const id = '58cc36724ef4504888999f79';

User.findById(id).then(user => {
  if (!user) return console.log('No user found');
  console.log(JSON.stringify(user, null, 2));
}).catch(err => console.log(err));
