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
        res.render('login');
    },

    getRegister: function(req,res){
        res.render('register');
    },

    saveRegistration: function(req,res){
        const acc = new Account({
            fullName: {
                firstName: req.body.firstName,
                lastName: req.body.lastName
            },
            userName: req.body.userName,
            email: req.body.email,
            password: req.body.password
        });

        acc.save(function(err){
            if(err){
                console.log(err);
            }
            else{
                res.render('registration', {
                    account: acc
                });
                console.log("Account added.");
            }
        });
    },
    
    getHome: function(req,res){
        res.render('homepage');
    },

// Account Functions
    getMyProfile: function(req,res){
        const accountId = req.params.accountId;
        // add query filters in {} to remove own + to determine if friend
        // _id: {$ne : accountId} 
        Account.find({}, function(err,results){
        if(err){
            console.log(err);
        } else {
            Account.findOne({}).sort({_id:-1}).exec(function(err,query){
                if(err){
                    console.log(err);
                } else {
                        res.render('userProfile',{
                        accounts: results,
                        account: query
                    });
                }
            });
        }
    });
    },

    getSettings: function(req,res){
        Account.findOne({}).sort({_id:-1}).exec(function(err,results){
            if(err){
                console.log(err);
            } else {
                res.render('userSettings',{
                    accounts: results
                });
            }
        });
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
    getFriendProfile: function(req,res){
        const accountId = req.params.accountId;
        Account.find({_id: accountId},function(err,result)
        {
        if(err){
            console.log(err);
        } else {
            res.render('friendProfile',{
                account : result[0]
            });
        }
        });
    },

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

    inviteFriends: function(req,res){
        Account.find({}, function(err,results)
          {
            if(err){
                console.log(err);
            } else {
                res.render('inviteFriends',{
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
    }
}

module.exports = controller;
