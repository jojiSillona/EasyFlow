const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

// mongoose.connect("mongodb://localhost:27017/crud",{useNewUrlParser:true});

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, "..", "public")));

app.get("/", function(req,res){
    res.render(path.join(__dirname, "..", "views", "index.ejs"));
});

app.get("/login", function(req,res){
    res.render(path.join(__dirname, "..", "views", "login.ejs"));
});

app.get("/register", function(req,res){
    res.render(path.join(__dirname, "..", "views", "register.ejs"));
});

app.get("/viewflowcharts", function(req,res){
    res.render(path.join(__dirname, "..", "views", "viewFlowcharts.ejs"));
});

app.get("/editflowchart", function(req,res){
    res.render(path.join(__dirname, "..", "views", "editFlowchart.ejs"));
});

app.get("/createflowchart", function(req,res){
    res.render(path.join(__dirname, "..", "views", "createFlowchart.ejs"));
});

app.get("/myprofile", function(req,res){
    res.render(path.join(__dirname, "..", "views", "userProfile.ejs"));
});

app.get("/mysettings", function(req,res){
    res.render(path.join(__dirname, "..", "views", "userSettings.ejs"));
});

app.get("/home", function(req,res){
    res.render(path.join(__dirname, "..", "views", "homepage.ejs"));
});

app.get("/invitefriends", function(req,res){
    res.render(path.join(__dirname, "..", "views", "searchResults.ejs"));
});

app.post("/searchresults", function(req,res){
    res.render(path.join(__dirname, "..", "views", "searchResults.ejs"));
});

app.listen(3000, function(){
    console.log("Server started on port 3000");
})