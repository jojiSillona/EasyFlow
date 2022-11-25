const Account = require("../models/accountModel.js");
const Flowchart = require("../models/flowchartModel.js");
const Course = require("../models/courseModel.js");

//-------------- SAMPLE DATA ------------
//-------------- SAMPLE DATA FOR ACCOUNT ------------------

//<<< SAMPLE DATA 1 >>>
const sampleData= (req,res)=>{
    Account.insertMany([{ fullName:{
    firstName:"Ruby",
    lastName:"Richards"
},
userName:"RichardsR9",
email:"rubyrichards@gmail.com",
password:"12345678",
flowcharts:[],
biography: "Welcome to my page"
},


//<<< SAMPLE DATA 2 >>>
{ fullName:{
    firstName:"Tia",
    lastName:"Burmen"
},
userName:"Tia55",
email:"tiaburmen@gmail.com",
password:"burmen098",
flowcharts:[],
biography: "“Happiness depends upon ourselves.” – Madelyn Teppner"
},


//<<< SAMPLE DATA 3 >>>
{ fullName:{
    firstName:"George",
    lastName:"Dwell"
},
userName:"GD246",
email:"georgedwell@gmail.com",
password:"george2468",
flowcharts:[],
biography: "“Be who you are and say what you feel, because those who mind don’t matter, and those who matter don’t mind.” ― Bernard M. Baruch"

},


//<<< SAMPLE DATA 4 >>>
{ fullName:{
    firstName:"Dave",
    lastName:"Duken"
},
userName:"Daveduken100",
email:"daveduken@gmail.com",
password:"daveduken77",
flowcharts:[],
biography: "“In the end, it’s not the years in your life that count. It’s the life in your years.” – Abraham Lincoln"
},


//<<< SAMPLE DATA 5 >>>
{ fullName:{
    firstName:"Camilla",
    lastName:"Smith"
},
userName:"camillaS45",
email:"camillasmith@gmail.com",
password:"camilla99",
flowcharts:[],
biography: "“Just because you fail once, does not mean that you’re gonna fail at everything. Keep trying, hold on, and always, always, always believe in yourself because if you don’t, then who will?” – Marilyn Monroe"
}]);


//-------------- SAMPLE DATA FOR COURSE ------------------
//<<< SAMPLE DATA 1 >>>
Course.insertMany([{ 
    code: "CCAPDEV",
     professor: "Mar Christian Herrera",
     units: "3",
    status: "Currently Taking",
},

//<<< SAMPLE DATA 2 >>>
   { code: "GERIZAL",
    professor: "Angelo Arriola",
     units: "3",
    status: "Currently Taking",
},

//<<< SAMPLE DATA 3 >>>
 { 
     code: "GEDANCE",
    professor: "Jun Alave",
     units: "3",
    status: "Passed",
 },

//<<< SAMPLE DATA 4 >>>
{ 
    code: "GEDANCE",
     professor: "Alain Encarnacion",
     units: "3",
     status: "Not Yet Taken",
 },

//<<< SAMPLE DATA 5 >>>
{ 
    code: "CCPROG2",
    professor: "Shirley Chu",
     units: "3",
    status: "Failed",
 }]);

//-------------- SAMPLE DATA FOR FLOWCHART ------------------
//<<< SAMPLE DATA 1 >>>
Flowchart.insertMany([{ 
    title: "Term 1 Flowchart",
    department: "Department of Engineering",
    acadYears: []
},

//<<< SAMPLE DATA 2 >>>
{ 
    title: "BSFin Flowchart",
    department: "Department of Financial Management",
    acadYears: []
},


//<<< SAMPLE DATA 3 >>>
{ 
    title: "BSINSYS Flowchart",
    department: "Information Technology Department",
    acadYears: []
},

//<<< SAMPLE DATA 4 >>>
{ 
    title: "BSCS Flowchart",
    department: "Software Technology Department",
    acadYears:"2019-2020"
},

//<<< SAMPLE DATA 5 >>>
{ 
    title: "BSIT Flowchart",
    department: "Information Technology Department",
    acadYears: []
}]);
}
module.exports =  {sampleData};