const express = require("express");
const { models } = require("mongoose");
const path = require("path");

const controller = require(path.join(__dirname, "..", "controller", "controller.js"));
const app = express();

app.get("/", controller.getIndex);
app.get("/login", controller.getLogin);
app.get("/register", controller.getRegister);
app.post("/registration", controller.saveRegistration);
app.get("/viewflowcharts", controller.viewFlowcharts);
app.get("/editflowchart", controller.editFlowchart);
app.get("/createflowchart", controller.createFlowchart);
app.post("/addCourse", controller.addCourse);
app.get("/myprofile", controller.getProfile);
app.get("/mysettings", controller.getSettings);
app.get("/home", controller.getHome);
app.get("/invitefriends", controller.inviteFriends);
app.post("/searchresults", controller.searchResults);

module.exports = app;