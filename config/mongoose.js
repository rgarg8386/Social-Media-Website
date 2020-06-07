const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/codeial_development');
mongoose.set('useFindAndModify', false);
const db = mongoose.connection;
db.on('error', console.error.bind(console, "Error Connection To Mongodb"));
db.once('open', () => {
    console.log('Connected To Database :: MongoDB');
});
module.exports = db;