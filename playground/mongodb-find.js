const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) return console.log('Unable to connect to MongoDB server');

  console.log('Connected to MongoDB server');

  // db.collection('Todos').find({
  //   _id: ObjectID('58c80d548d7b3c9e844b142c')
  // }).toArray().then((docs) => {
  //   console.log('Todos');
  //   console.log(JSON.stringify(docs, null, 2));
  // }, (err) => {
  //   console.log('Unable to fetch todos', err);
  // });

  db.collection('Todos').find().count().then((count) => {
    console.log(`Todos count: ${count }`);
  }, (err) => {
    console.log('Unable to fetch todos', err);
  });

  // db.close();
});
