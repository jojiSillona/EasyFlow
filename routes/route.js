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
app.get("/viewflowcharts", controller.viewFlowcharts);
// view one specific flowchart 
app.post("/editflowchart", controller.editFlowchart);


// MODIFY EXISTING FLOWCHART
app.get("/editFlowchart/:flowchartId", controller.editFlowchart);
// app.get("/createflowchart", controller.editFlowchart); // shows actual

// CREATING NEW FLOWCHART
// app.get("/getflowchart", controller.editFlowchart);
app.post("/createflowchart", controller.createFlowchart); // modal
app.post("/saveflowchart",controller.viewFlowcharts); // associates courses with flowchart id
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
app.post("/searchresults", controller.searchResults);
app.get("/logout", controller.logout);
module.exports = app;
