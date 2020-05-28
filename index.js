const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
app.use(express.static('./assets'));
app.use(expressLayouts);
const signUp = require('./models/user');
app.use(express.urlencoded());
app.use(cookieParser());
//eh link tag te script tag nu head te body ch paadu 
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
//use express routers
app.use('/', require('./routes'));
app.set('view engine', 'ejs');
app.set('views', './views');
app.listen(port, function(err) {
    if (err) {
        console.log('Error in running the server :', err);
    }
    console.log('Server is running on port :', port);
});