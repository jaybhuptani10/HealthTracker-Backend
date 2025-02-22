const mongoose = require('mongoose');

function connect() {
  return mongoose.connect(process.env.DB_CONNECTION_STRING,).then(console.log('Connected to database'));
}

module.exports =  connect ;