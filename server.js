require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
const session = require('express-session');
const mongoDBSession = require('connect-mongodb-session')(session); 

mongoose.connect("mongodb://127.0.0.1:27017/easyFlow",{useNewUrlParser:true});

app.set("view engine","ejs");
app.use(express.static(path.join(__dirname, ".", "public")));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const store = new mongoDBSession({
    uri: "mongodb://"+process.env.URI+"/"+process.env.DB_NAME,
    collection: process.env.DB_COLLECTION
})

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: store,
})
);

app.use(function(req,res,next){ 
res.locals.session = req.session;
next();
});

const route = require("./routes/route.js");
app.use('/', route);

app.listen(3000, function(){
    console.log("Server started on port 3000");
})