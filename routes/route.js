const express = require("express");
const { models } = require("mongoose");
const path = require("path");

const controller = require(path.join(__dirname, "..", "controller", "controller.js"));
const app = express();

// Registration and Login
app.get("/", controller.getIndex);
app.get("/login", controller.getLogin);
app.post("/login", controller.verifyLogin);
app.get("/register", controller.getRegister);
app.post("/register", controller.saveRegistration);
app.get("/home", controller.getHome);

// Account Features
app.get("/myprofile", controller.getMyProfile);
app.get("/mysettings", controller.getSettings);
app.post("/saveSettings", controller.saveSettings);

// Flowchart Features
app.get("/viewflowcharts", controller.viewFlowcharts);
// view one specific flowchart 
app.get("/createflowchart", controller.editFlowchart); // shows actual
app.post("/createflowchart", controller.createFlowchart); // modal
app.post("/saveflowchart",controller.saveFlowchart); // associates courses with flowchart id
app.get('/delete/:id', controller.deleteFlowchart);

// Course Features
app.post("/addCourse", controller.addCourse);
app.get("/editCourse/:courseId", controller.editCourse);
app.post("/updateChosen", controller.updateChosen);
app.get("/deleteCourse/:courseId", controller.deleteCourse);
app.post("/savePosition", controller.savePosition);

// Other Profile Features
app.get("/otherprofile/:accountId", controller.getOtherProfile);
app.get("/viewUsers", controller.viewUsers);
app.post("/searchresults", controller.searchResults);
app.get("/logout", controller.logout);
module.exports = app;
