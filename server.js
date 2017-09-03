var express = require('express');
var app = express();
var server = app.listen(3003, "0.0.0.0", function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
});
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var mongoose = require('mongoose');
var connectString = "mongodb://foobar:foobar@ds121494.mlab.com:21494/cards";
console.log(mongoose.connection.readyState);
console.log(connectString)
mongoose.connect(connectString);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("Connection succeeded.");

    console.log("connected");
    //require("./users/users.js");
    //require("./users/attendanceUpdate.js");
    require("./models/user.js");
    require("./models/userData.js");
    require("./routes/routes.js")(app);
});

const path = require('path');
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
// app.use(express.static('public'));
// app.use(express.static('uploads'));
app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(bodyParser.urlencoded({extended : true})); //application/x-www-form-urlencoded
app.use(bodyParser.json());
var rootPath = __dirname;

