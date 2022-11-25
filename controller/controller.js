const express = require("express");
const bodyParser = require("body-parser");
const Account = require("../models/accountModel.js");
const Flowchart = require("../models/flowchartModel.js");
const Course = require("../models/courseModel.js");
const { db } = require("../models/accountModel.js");
const { render } = require("ejs");
const { reset } = require("nodemon");

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
            else if (search == null){
                res.render('login', {loginError: "Wrong username/password"})
                console.log("No Result");
            } 
            else{
                req.session.isAuth = true;
                console.log("homepage");
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

        // Validation for password will be added in MCO3.
        if(password != password2){
            res.render('register', {
                registerError: "Passwords do not match."
            });
        } else{
            // Validation if username and email is already taken
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
        // req.session.isAuth verifies if user is authorized to access the homepage.
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

    saveProfile:function(req,res){
        const image= req.file.filename
        Account.findByIdAndUpdate(req.session.userObjectId, 
            { 
            
                image:image,
            
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
                    res.redirect('/myprofile');
                }
        });
    },
    
// Flowchart Functions
    viewFlowcharts: function(req,res){
        Flowchart.find({accountId: req.session.userObjectId}, function(err,query){
            if(err){
                console.log(err);
            } else {
                res.render('viewFlowcharts',{
                    flow: query
                });
            }
          });
    },

    editFlowchart: function(req,res){
       // If user selects an already existing flowchart to edit
        if(req.params.flowchartId != undefined){
            Flowchart.findOne({_id:  req.params.flowchartId, accountId: req.session.userObjectId}, function(err,flow){
                if(err){
                    console.log(err);
                }
                else{
                    Course.find({flowchartId: flow.id}, function(err,rows){
                        if(err){
                            console.log(err);
                        }
                        else{
                            res.render(('editFlowchart'), {
                                courses: rows,
                                flowchart: flow
                            });
                        }
                    });
                }
            })
        }
        // If user selects to create a new flowchart
        else{ 
            const flow = new Flowchart({
                accountId: req.session.userObjectId,
                title: req.body.flowchartName,
                department: req.body.deptName,
                startingYear: req.body.startAY,
                numberOfAY: 1
            });
    
            flow.save(function(err){
                if(err){
                    console.log(err);
                }
                else{ 
                    Flowchart.findOne({_id: flow.id, accountId: flow.accountId}, function(err,flow){
                        if(err){
                            console.log(err);
                        }
                        else{
                            Course.find({flowchartId: flow.id}, function(err,rows){
                                if(err){
                                    console.log(err);
                                }
                                else{
                                    res.render(('editFlowchart'), {
                                        courses: rows,
                                        flowchart: flow
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    },
    
    saveFlowchart:function(req,res){
        res.redirect("/viewflowcharts");
    },

    deleteFlowchart: function(req,res){
        var id = req.params.flowchartId;
        Flowchart.findByIdAndDelete(id, function (err, docs) {
            if (err){
                console.log(err)
            }
            else{
                res.redirect("/viewflowcharts");
            }
        });
    },

    addAY: function(req, res){
        Flowchart.findByIdAndUpdate(req.params.id,
            {$inc: {numberOfAY: 1}},
            function(err){
                if(err){
                    console.log(err);
                }
            }
        );
    },

// Course Functions
    addCourse: function(req,res){
        var statusString;
        var statusStyle;
        let statusId = Number(req.body.status);
        switch(statusId){
            case 1:  
                statusString = "Not Yet Taken";
                statusStyle = "#FFFFFF"
            break;
            case 2:  
                statusString = "Currently Taking";
                statusStyle = "#83BBE5"
            break;
            case 3:  
                statusString = "Passed";
                statusStyle = "#A3D977"
            break;
            case 4:  
                statusString = "Failed";
                statusStyle = "#FF6565"
            break;
            case 5:  
                statusString = "Dropped";
                statusStyle = "#FF6565"
            break;
            default: 
                statusString = "Not Yet Taken";
                statusStyle = "#fff"
        }

        // Create new course
        const course = new Course({
            accountId: req.session.userObjectId,
            flowchartId: req.body.flowchartId,
            code: req.body.code,
            professor: req.body.prof,
            units: req.body.units,
            status: statusString,
            style: statusStyle,
            leftPosition: 0,
            topPosition: 0
        });
    
        course.save(function(err){
            if(err){
                console.log(err);
            }
            else{
                Flowchart.findOne({_id: req.body.flowchartId, accountId: req.session.userObjectId}, function(err,flow){
                    if(err){
                        console.log(err);
                    }
                    else{
                        Course.find({flowchartId: flow.id}, function(err,rows){
                            if(err){
                                console.log(err);
                            }
                            else{
                                res.render(('editFlowchart'), {
                                    courses: rows,
                                    flowchart: flow
                                });
                            }
                        });
                    }
                })
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
            }
        });
    },

    savePosition: function(req, res){
        const params = req.body.params
        const left = params.left;
        const top = params.top;
        const code = params.code;

        Course.findOneAndUpdate(
            {"code": code},
            {$set: {"leftPosition": left, "topPosition": top}},
            function(err){
                if(err){
                    console.log(err);
                } 
            }
        )
    },

    updateChosen: function(req,res){
        const flowchartId = req.body.flowchartId;
        const courseId = req.body.codeId;
        const query = {_id : courseId};
        const code = req.body.code;
        const prof = req.body.prof;
        const units = req.body.units;

        var statusString;
        var statusStyle;
        let statusId = Number(req.body.status);
        switch(statusId){
            case 1:  
                statusString = "Not Yet Taken";
                statusStyle = "#FFFFFF"
            break;
            case 2:  
                statusString = "Currently Taking";
                statusStyle = "#83BBE5"
            break;
            case 3:  
                statusString = "Passed";
                statusStyle = "#A3D977"
            break;
            case 4:  
                statusString = "Failed";
                statusStyle = "#FF6565"
            break;
            case 5:  
                statusString = "Dropped";
                statusStyle = "#FF6565"
            break;
            default: 
                statusString = "Not Yet Taken";
                statusStyle = "#fff"
        }

        Course.updateOne(query, { code:code, professor:prof, units:units, status:statusString, style:statusStyle},
            function(err,result){
            if(err){
                console.log(err);
            }
            else{
                Flowchart.findOne({_id: flowchartId, accountId: req.session.userObjectId}, function(err,flow){
                    if(err){
                            console.log(err);
                    }
                    else{
                        Course.find({flowchartId: flow.id}, function(err,rows){
                            if(err){
                                console.log(err);
                            }
                            else{
                                res.render(('editFlowchart'), {
                                    courses: rows,
                                    flowchart: flow
                                });
                            }
                        });
                    }
                });
            }
        });
    },

    deleteCourse: function(req,res){
        const courseId = req.params.courseId;
        Course.findByIdAndRemove(courseId, function(err,course){
            if(err){
                console.log(err);
            }else{
                Flowchart.findOne({_id: course.flowchartId, accountId: req.session.userObjectId}, function(err,flow){
                    if(err){
                        console.log(err);
                    }
                    else{
                        Course.find({flowchartId: flow.id}, function(err,rows){
                            if(err){
                                console.log(err);
                            }
                            else{
                                res.render(('editFlowchart'), {
                                    courses: rows,
                                    flowchart: flow
                                });
                            }
                        });
                    }
                });
            }
        });
    },

// Other Profile Functions
    getOtherProfile: function(req,res){
        const accountId = req.params.accountId;
        Account.find({_id: accountId},function(err,result)
        {
            if(err){
                console.log(err);
            } else {
                Flowchart.find({accountId: req.session.userObjectId}, function(err,query){
                    if(err){
                        console.log(err);
                    } else {
                        res.render('otherProfile',{
                            account : result[0],
                            flow: query
                        });
                    }
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
    

    viewOtherFlowchart: function(req,res){
        Flowchart.findOne({_id: req.params.flowchartId}, function(err,query){
            if(err){
                console.log(err);
            } else {
                Course.find({flowchartId: query.id}, function(err,rows){
                    if(err){
                        console.log(err);
                    }
                    else{
                        res.render(('viewOtherFlowchart'), {
                            courses: rows,
                            flowchart: query
                        });
                    }
                });
            }
        });
    },

    searchResults: function(req,res){
        Account.find({
            $or: [{'fullName.firstName' : {$regex: new RegExp(req.body.query, 'i')}},
                  {'fullName.lastName' : {$regex: new RegExp(req.body.query, 'i')}}]
          }, function(err,query){
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

//-------------- SAMPLE DATA ------------
//-------------- SAMPLE DATA FOR ACCOUNT ------------------

// //<<< SAMPLE DATA 1 >>>
//  Account.create({ fullName:{
//     firstName:"Ruby",
//     lastName:"Richards"
// },
// userName:"RichardsR9",
// email:"rubyrichards@gmail.com",
// password:"12345678",
// flowcharts:[],
// biography: "Welcome to my page"
// });


// //<<< SAMPLE DATA 2 >>>
// Account.create({ fullName:{
//     firstName:"Tia",
//     lastName:"Burmen"
// },
// userName:"Tia55",
// email:"tiaburmen@gmail.com",
// password:"burmen098",
// flowcharts:[],
// biography: "“Happiness depends upon ourselves.” – Madelyn Teppner"
// });


// //<<< SAMPLE DATA 3 >>>
// Account.create({ fullName:{
//     firstName:"George",
//     lastName:"Dwell"
// },
// userName:"GD246",
// email:"georgedwell@gmail.com",
// password:"george2468",
// flowcharts:[],
// biography: "“Be who you are and say what you feel, because those who mind don’t matter, and those who matter don’t mind.” ― Bernard M. Baruch"

// });


// //<<< SAMPLE DATA 4 >>>
// Account.create({ fullName:{
//     firstName:"Dave",
//     lastName:"Duken"
// },
// userName:"Daveduken100",
// email:"daveduken@gmail.com",
// password:"daveduken77",
// flowcharts:[],
// biography: "“In the end, it’s not the years in your life that count. It’s the life in your years.” – Abraham Lincoln"
// });


// //<<< SAMPLE DATA 5 >>>
// Account.create({ fullName:{
//     firstName:"Camilla",
//     lastName:"Smith"
// },
// userName:"camillaS45",
// email:"camillasmith@gmail.com",
// password:"camilla99",
// flowcharts:[],
// biography: "“Just because you fail once, does not mean that you’re gonna fail at everything. Keep trying, hold on, and always, always, always believe in yourself because if you don’t, then who will?” – Marilyn Monroe"
// });


// //-------------- SAMPLE DATA FOR COURSE ------------------
// //<<< SAMPLE DATA 1 >>>
// Course.create({ 
//     code: "CCAPDEV",
//     professor: "Mar Christian Herrera",
//     units: "3",
//     status: "Currently Taking",
// });

// //<<< SAMPLE DATA 2 >>>
// Course.create({ 
//     code: "GERIZAL",
//     professor: "Angelo Arriola",
//     units: "3",
//     status: "Currently Taking",
// });

// //<<< SAMPLE DATA 3 >>>
// Course.create({ 
//     code: "GEDANCE",
//     professor: "Jun Alave",
//     units: "3",
//     status: "Passed",
// });

// //<<< SAMPLE DATA 4 >>>
// Course.create({ 
//     code: "GEDANCE",
//     professor: "Alain Encarnacion",
//     units: "3",
//     status: "Not Yet Taken",
// });

// //<<< SAMPLE DATA 5 >>>
// Course.create({ 
//     code: "CCPROG2",
//     professor: "Shirley Chu",
//     units: "3",
//     status: "Failed",
// });

// //-------------- SAMPLE DATA FOR FLOWCHART ------------------
// //<<< SAMPLE DATA 1 >>>
// Flowchart.create({ 
//     title: "Term 1 Flowchart",
//     department: "Department of Engineering",
//     acadYears: []
// });

// //<<< SAMPLE DATA 2 >>>
// Flowchart.create({ 
//     title: "BSFin Flowchart",
//     department: "Department of Financial Management",
//     acadYears: []
// });


// //<<< SAMPLE DATA 3 >>>
// Flowchart.create({ 
//     title: "BSINSYS Flowchart",
//     department: "Information Technology Department",
//     acadYears: []
// });

// //<<< SAMPLE DATA 4 >>>
// Flowchart.create({ 
//     title: "BSCS Flowchart",
//     department: "Software Technology Department",
//     acadYears:"2019-2020"
// });

// //<<< SAMPLE DATA 5 >>>
// Flowchart.create({ 
//     title: "BSIT Flowchart",
//     department: "Information Technology Department",
//     acadYears: []
// });

// //-------------- SAMPLE DATA FOR AY ------------------
// //<<< SAMPLE DATA 1 >>>
// AY.create({ 
//     academicYear:{
//         start: 2022,
//         end: 2023
//     }
// });

// //<<< SAMPLE DATA 2 >>>
// AY.create({ 
//     academicYear:{
//         start: 2022,
//         end: 2023
//     }
// });

// //<<< SAMPLE DATA 3 >>>
// AY.create({ 
//     academicYear:{
//         start: 2020,
//         end: 2021
//     }
// });

// //<<< SAMPLE DATA 4 >>>
// AY.create({ 
//     academicYear:{
//         start: 2019,
//         end: 2020
//     }
// });

// //<<< SAMPLE DATA 5 >>>
// AY.create({ 
//     academicYear:{
//         start: 2021,
//         end: 2022
//     }
// });

