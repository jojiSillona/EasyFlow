const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/test",{useNewUrlParser:true});

app.set("view engine","ejs");
app.use(express.static(path.join(__dirname, ".", "public")));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const route = require("./routes/route.js");
app.use('/', route);

app.listen(3000, function(){
    console.log("Server started on port 3000");
})