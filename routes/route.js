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
app.post("/saveSettings",upload.single('image'), controller.saveSettings);

// Flowchart Features
app.get("/viewflowcharts", controller.viewFlowcharts);
app.post("/saveflowchart",controller.saveFlowchart);
app.get("/editflowchart", controller.editFlowchart);
app.post("/savePosition", controller.savePosition);
app.get("/createflowchart", controller.createFlowchart);
app.get('/delete/:id', controller.deleteFlowchart);

// AcadYear Features
app.post("/addAY", controller.addAY);

// Course Features
app.post("/addCourse", controller.addCourse);
app.get("/editCourse/:courseId", controller.editCourse);
app.post("/updateChosen", controller.updateChosen);
app.get("/deleteCourse/:courseId", controller.deleteCourse);

// Other Profile Features
app.get("/otherprofile/:accountId", controller.getOtherProfile);
app.get("/viewUsers", controller.viewUsers);
app.post("/searchresults", controller.searchResults);
app.get("/logout", controller.logout);
module.exports = app;
