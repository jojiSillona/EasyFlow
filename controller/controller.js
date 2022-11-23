const express = require("express");
const bodyParser = require("body-parser");
const Account = require("../models/accountModel.js");
const Flowchart = require("../models/flowchartModel.js");
const AY = require("../models/ayModel.js");
const Course = require("../models/courseModel.js");
const { db } = require("../models/accountModel.js");

const controller = {
// Registration and Login
    getIndex: function(req,res){
        res.render('index');
    },

    getLogin: function(req,res){
        console.log("getLogin");
        res.render('login', {
            loginError: ""
        });
    },

    verifyLogin: function(req,res){
        console.log("verifyLogin");
        Account.findOne({userName: req.body.username, password: req.body.password }, function (err, search) {
            if (err){
                console.log(err)
            }
            else if (search == null){// no result = wrong login 
                res.render('login', {loginError: "Wrong username/password"})
                console.log("No Result");
            } 
            else{
                req.session.isAuth = true;
                console.log("homepage");
                // set account deets here oki ?
                // req.session.anyVarName = whatever u want
                //ex. 
                req.session.userObjectId = search.id;
                req.session.userName = search.userName;
                req.session.email = search.email;
                res.redirect("/home");
            }
        });
    },

    getRegister: function(req,res){
        res.render('register',{
            registerError: ""
        });
    },

    saveRegistration: function(req,res){
        var firstName = req.body.firstName;
        var lastName = req.body.lastName;
        var userName = req.body.userName;
        var email= req.body.email;
        var password = req.body.password;
        var password2 = req.body.password2;

        //Validation for password add later
        if(password != password2){
            res.render('register', {
                registerError: "Passwords do not match."
            });
        } else{
            //Check if username and email is already taken
            Account.findOne({ userName: {"$regex": "^" + userName + "\\b", "$options": "i"}}, function (err, user) {
                Account.findOne({ email: {"$regex": "^" + email + "\\b", "$options": "i"}}, function (err, mail) {
                    if (user || mail) {
                        res.render('register', {
                            registerError: "Username/email already exists in database."
                        });
                        console.log("Same user/email.");
                    }else {
                        const acc = new Account({
                            fullName: {
                                firstName: firstName,
                                lastName: lastName
                            },
                            userName: userName,
                            email: email,
                            password: password
                        });
                        acc.save(function(err){
                            if(err){
                                console.log(err);
                            }
                            else{
                                res.redirect('/home');
                                console.log("Account added.");
                            }
                        });
                    }
                });
            });
        }
    },

    getHome: function(req,res){
        if (req.session.isAuth) {
            Account.findOne({_id: req.session.userObjectId, userName : req.session.userName }, function (err, search) {
                if (err){
                    console.log(err)
                }
                else{
                    console.log("homepage");
                    res.render('homepage', {profile:search});
                }
            });
            
        }
        else {
            res.render('login', {loginError: "Please Login First"});
        }
    },

// Account Functions
    getMyProfile: function(req,res){
        Account.findById({_id: req.session.userObjectId}, function(err,result)
        {
          if(err){
              console.log(err);
          } else {
              res.render('userProfile',{
                  account: result
              });
          }
        });
    },

    getSettings: function(req,res){
        Account.findById({_id: req.session.userObjectId}, function(err,results)
        {
          if(err){
              console.log(err);
          } else {
              res.render('userSettings',{
                  accounts: results
              });
          }
        });
    },

    saveSettings: function(req,res){
        const lastName = req.body.lastName;
        const firstName = req.body.firstName;
        const bio = req.body.bio;
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;

        Account.findByIdAndUpdate(req.session.userObjectId, 
            { 
                fullName:{
                    lastName: lastName,
                    firstName: firstName,
                }, 
                biography: bio,
                userName: username,
                email: email,
                password: password 
            },                
            function (err, docs) {
                if (err){
                    console.log(err)
                }
                else{
                    console.log("Updated User : ", docs);
                }
        });
        res.redirect('/myprofile');
    },

// Flowchart Functions
    viewFlowcharts: function(req,res){
        Flowchart.find({
            $or: [{'title' : {$regex: new RegExp(req.body.query, 'i')}}]
          }, function(err,query)
          {
            if(err){
                console.log(err);
            } else {
                res.render('viewFlowcharts',{
                    flow: query
                });
            }
          });
        
    },

    saveFlowchart:function(req,res){
        const flow = new Flowchart({
            // accountId: req.body.accId, wala pa session mamaya na iimplement
            title: req.body.title,
            department: req.body.department,
            acadYears: []
            //  accountId: { type: mongoose.Schema.Types.ObjectId, ref: 'Account' },
    // title: String,
    // department: String,
    // acadYears: [{ type: mongoose.Schema.Types.ObjectId, ref: 'AY' }]
        });

        flow.save(function(err){
            if(err){
                console.log(err);
            }
            else{
                //save ay, save course?
                //populate
                res.redirect("/viewflowcharts");
        
                console.log("Flowchart added.");
            }
        });
    },

    editFlowchart: function(req,res){
        res.render('editFlowchart');
    },

    createFlowchart: function(req,res){
        // dito magmmake ng new Flowchart dapat?
        Course.find({}, function(err,rows){
            if(err){
                console.log(err);
            }
            else{
                res.render(('createFlowchart'), {
                    courses: rows
                });
            }
        });
    },

    deleteFlowchart: function(req,res){
        flowchartData= Flowchart.findByIdAndDelete(req.params.id);
        flowchartData.exec(function(err){
          if (err){
            console.log(err);
          }
          else{
               res.redirect('/viewflowcharts')
               console.log ("record was deleted");
            }
        });
           
    },

// AcadYear Functions
    addAY: function(req,res){

            console.log("Adding SY");
            
            const ay = new AY({
                academicYear:{
                    start: req.body.start,
                    end: req.body.end
                }
                // accountId: { type: mongoose.Schema.Types.ObjectId, ref: 'Account' },
                // flowchartId: { type: mongoose.Schema.Types.ObjectId, ref: 'Flowchart' },
                // academicYear: {start: Number, end: Number},
                // termOne: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
                // termTwo: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
                // termThree: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
            });
        
            ay.save(function(err){
                if(err){
                    console.log(err);
                }
                else{
                    res.redirect("/createflowchart");
                    console.log("AY added.");
                }
            });
    },

// Course Functions
    addCourse: function(req,res){
        var statusString;
        let statusId = Number(req.body.status);
        switch(statusId){
            case 1:  statusString = "Not Yet Taken";
            break;
            case 2:  statusString = "Currently Taking";
            break;
            case 3:  statusString = "Passed";
            break;
            case 4:  statusString = "Failed";
            break;
            case 5:  statusString = "Dropped";
            break;
            default: statusString = "Not Yet Taken";
        }
        const course = new Course({
            code: req.body.code,
            professor: req.body.prof,
            units: req.body.units,
            status: statusString,
            style: req.body.style
        });
    
        course.save(function(err){
            if(err){
                console.log(err);
            }
            else{

                // Course.populate(course, {path:""})
                res.redirect("/createflowchart");
                console.log("Course added.");
            }
        });
    },

    editCourse: function(req,res){
        const courseId = req.params.courseId;
        Course.find({_id: courseId},function(err,result)
        {
        if(err){
            console.log(err);
        } else {
            res.render('editCourse',{
                course : result[0]
            });
            
            // res.redirect({
            //     course : query[0]
            // }, "/createflowchart");
        }
        });

        Course.find({}, function(err,rows){
            if(err){
                console.log(err);
            }
            else{
                res.render(('createFlowchart'), {
                    courses: rows
                });
            }
        });
    },

    updateChosen: function(req,res){
        const courseId = req.body.codeId;
        const query = {_id : courseId};
        const code = req.body.code;
        const prof = req.body.prof;
        const units = req.body.units;
        const style = req.body.style;
        var statusString;
        let statusId = Number(req.body.status);
        switch(statusId){
            case 1:  statusString = "Not Yet Taken";
            break;
            case 2:  statusString = "Currently Taking";
            break;
            case 3:  statusString = "Passed";
            break;
            case 4:  statusString = "Failed";
            break;
            case 5:  statusString = "Dropped";
            break;
            default: statusString = "Not Yet Taken";
        }

        
        Course.updateOne(query, { code:code, professor:prof, units:units, status:statusString, style:style},
            function(err,result){
            if(err){
                console.log(err);
            }
            else{
                res.redirect("/createflowchart"); //will change later into current view flowchart id
                console.log("Course modified.");
            }
            });
    },

    deleteCourse: function(req,res){
        const courseId = req.params.courseId;
        Course.findByIdAndRemove(courseId, function(err){
            if(err){
                console.log(err);
            }else{
                res.redirect('/createflowchart'); 
                console.log("Course deleted.");
            }
        })
    },

// Other Profile Functions
    getOtherProfile: function(req,res){
        const accountId = req.params.accountId;
        Account.find({_id: accountId},function(err,result)
        {
        if(err){
            console.log(err);
        } else {
            res.render('otherProfile',{
                account : result[0]
            });
        }
        });
    },

    viewUsers: function(req,res){
        Account.find({"_id": {$ne: req.session.userObjectId}}, function(err,results)
          {
            if(err){
                console.log(err);
            } else {
                res.render('viewUsers',{
                    accounts: results
                });
            }
          });
    },

    searchResults: function(req,res){
        Account.find({
            $or: [{'fullName.firstName' : {$regex: new RegExp(req.body.query, 'i')}},
                  {'fullName.lastName' : {$regex: new RegExp(req.body.query, 'i')}}]
          }, function(err,query)
          {
            if(err){
                console.log(err);
            } else {
                res.render('searchResults',{
                    accounts: query
                });
            }
          });
    }, 

    logout: function(req,res){
        req.session.destroy();
        res.redirect("/");
    }, 
}

module.exports = controller;
