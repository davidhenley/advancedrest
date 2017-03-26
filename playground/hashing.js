// const { SHA256 } = require('crypto-js');
//
// const message =  'I am user number 3';
// const hash = SHA256(message).toString();
//
// console.log('Message:', message);
// console.log('SHA256:', hash);
//
// const data = {
//   id: 4
// };
//
// const token = {
//   data,
//   hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// };
//
// token.data.id = 5;
// token.hash = SHA256(JSON.stringify(token.data)).toString();
//
// const resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();
//
// if (resultHash === token.hash) {
//   console.log('Data was not changed');
// } else {
//   console.log('Data was changed. Do not trust!')
// }
//
// const jwt = require('jsonwebtoken');
//
// const data = {
//   id: 10
// };
//
// const token = jwt.sign(data, '123abc');
// console.log(token);
//
// const decoded = jwt.verify(token, '123abc');
// console.log('Decoded:', decoded);

const bcrypt = require('bcryptjs');

const password = '123abc!';

// bcrypt.genSalt(10, (err, salt) => {
//   bcrypt.hash(password, salt, (err, hash) => {
//     console.log(hash);
//   });
// });

const hashed = '$2a$10$lW0xmk/dJX5Ue2PNwhEtc.KWPkmKbXxZev1yNMQ8aAsKF223EK.kG';

bcrypt.compare(password, hashed, (err, res) => {
  console.log(res);
});
