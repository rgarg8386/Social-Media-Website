const mongoose = require('mongoose');
const env = require('./enviornment');
mongoose.connect(`mongodb://localhost/${env.db}`);
mongoose.set('useFindAndModify', false);
const db = mongoose.connection;
db.on('error', console.error.bind(console, "Error Connection To Mongodb"));
db.once('open', () => {
    console.log('Connected To Database :: MongoDB');
});
module.exports = db;