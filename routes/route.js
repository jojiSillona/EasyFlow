const express = require("express");
const { models } = require("mongoose");
const path = require("path");

const controller = require(path.join(__dirname, "..", "controller", "controller.js"));
const app = express();

const multer = require("multer");

const storage = multer.diskStorage({
    destination:function(req,file,cb){
       cb(null,path.join(__dirname, '../public/images'));
    },
    filename:function(req,file,cb){
       const name = Date.now()+'-'+file.originalname;
       cb(null,name);
    }
});
const upload = multer({storage:storage});

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
app.post("/save",upload.single('image'), controller.saveProfile);

// Flowchart Features
app.get("/viewflowchart/:flowchartId", controller.viewFlowchart);
app.get("/viewflowcharts", controller.viewFlowcharts);
app.post("/editflowchart", controller.editFlowchart);
app.get("/editFlowchart/:flowchartId", controller.editFlowchart);
// app.post("/renderLine", controller.renderLine);
// app.get("/renderLine", controller.renderLine);
app.post("/saveflowchart",controller.saveFlowchart);
app.post("/addAY/:id", controller.addAY);
app.get('/deleteFlowchart/:flowchartId', controller.deleteFlowchart);

// Course Features
app.post("/addCourse", controller.addCourse);
app.post("/editCourse/:courseId", controller.editCourse);
app.get("/editCourse/:courseId", controller.editCourse);
app.post("/updateChosen", controller.updateChosen);
app.get("/deleteCourse/:courseId", controller.deleteCourse);
app.post("/savePosition", controller.savePosition);

// Other Profile Features
app.get("/otherprofile/:accountId", controller.getOtherProfile);
app.get("/viewUsers", controller.viewUsers);
app.get("/viewOtherFlowchart/:flowchartId", controller.viewOtherFlowchart);
app.post("/searchresults", controller.searchResults);
app.get("/logout", controller.logout);

app.get("/about", controller.getAbout);

module.exports = app;
