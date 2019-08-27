const express       = require('express');
const path          = require('path');
const cors          = require('cors');
const cookieParser  = require('cookie-parser');
//const session       = require('express-session');
const passport      = require('passport');


var app           = express();
var port          = 7700;


const filePath    = "/../blockly/tests";

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use(express.static("../"));
app.use(express.static("../blockly"));
app.use(express.static("../blockly/core"));
app.use(express.static("../blockly/tests"));
app.use(express.static("../blockly/src/"));
app.use(express.static("../blockly/src/css"));
app.use(express.static("../blockly/src/js"));


app.use(passport.initialize());
app.use(passport.session());

app.set('port', port);
app.set('view engine', 'ejs');
app.set('views', __dirname + filePath);
app.engine('html' ,require('ejs').renderFile);

module.exports = app;

app.get('/', (req,res) => {
    res.render('playground.html');
});

app.listen(app.get('port'), ()=>{
    console.log(__dirname);
    console.log('server connected');
});

