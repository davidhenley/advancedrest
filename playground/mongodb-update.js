const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) return console.log('Unable to connect to MongoDB server');

  console.log('Connected to MongoDB server');

  const collection = db.collection('Users');

  // findOneAndUpdate
  // collection.findOneAndUpdate({
  //   _id: ObjectID('58c80d548d7b3c9e844b142c')
  // }, {
  //   $set: {
  //     completed: true
  //   }
  // }, {
  //   returnOriginal: false
  // }).then(result => {
  //   console.log(result);
  // });

  collection.findOneAndUpdate({
    _id: ObjectID('58c7638eaa0e410b0ce3ffb9')
  }, {
    $set: {
      name: 'Ryan Moses'
    },
    $inc: {
      age: 1
    }
  }, {
    returnOriginal: false
  }).then(result => {
    console.log(result);
  });

  // db.close();
});
