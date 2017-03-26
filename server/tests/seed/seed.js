const { ObjectID } = require('mongodb');
const { Todo } = require('../../models/todo');
const { User } = require('../../models/user');
const jwt = require('jsonwebtoken');

const todos = [
  { _id: ObjectID(), text: 'First test todo' },
  { _id: ObjectID(), text: 'Second test todo', completed: true, completedAt: 333 }
];

const populateTodos = (done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => done());
};

const userOneId = new ObjectID();
const userTwoId = new ObjectID();
const users = [{
  _id: userOneId,
  email: 'david@example.com',
  password: 'userOnePass',
  tokens: [{
    access: 'auth',
    token: jwt.sign({ _id: userOneId, access:'auth' }, 'secretcode').toString()
  }]
}, {
  _id: userTwoId,
  email: 'hattie@example.com',
  password: 'userTwoPass'
}];

const populateUsers = (done) => {
  User.remove({}).then(() => {
    const userOne = new User(users[0]).save();
    const userTwo = new User(users[1]).save();
    return Promise.all([userOne, userTwo]);
  }).then(() => done());
};

module.exports = {
  todos, users,
  populateTodos, populateUsers
};
