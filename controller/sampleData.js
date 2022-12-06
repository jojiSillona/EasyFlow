const Account = require("../models/accountModel.js");
const Flowchart = require("../models/flowchartModel.js");
const Course = require("../models/courseModel.js");
const { isObjectIdOrHexString } = require("mongoose");
const bcrypt=require('bcrypt');

//-------------- SAMPLE DATA ------------
//-------------- SAMPLE DATA FOR ACCOUNT ------------------

//<<< SAMPLE DATA 1 >>>
const sampleData= (req,res)=>{
    var salt = bcrypt.genSaltSync(10)

    Account.insertMany([{
    _id:"6380fcb161723801ff3b9170",
    fullName:{
    firstName:"Ruby",
    lastName:"Richards"
},
userName:"RichardsR9",
email:"rubyrichards@gmail.com",
password: bcrypt.hashSync("12345678", salt),
flowcharts:[],
biography: "Welcome to my page"
},


//<<< SAMPLE DATA 2 >>>
{ 
    _id:"6380fcb161723801ff3b9171",
    fullName:{
    firstName:"Tia",
    lastName:"Burmen"
},
userName:"Tia55",
email:"tiaburmen@gmail.com",
password:bcrypt.hashSync("burmen098", salt),
flowcharts:[],
biography: "“Happiness depends upon ourselves.” – Madelyn Teppner"
},


//<<< SAMPLE DATA 3 >>>

{ _id:"6380fcb161723801ff3b9172",
    fullName:{
    firstName:"George",
    lastName:"Dwell"
},
userName:"GD246",
email:"georgedwell@gmail.com",
password:bcrypt.hashSync("george2468", salt),
flowcharts:[],
biography: "“Be who you are and say what you feel, because those who mind don’t matter, and those who matter don’t mind.” ― Bernard M. Baruch"

},


//<<< SAMPLE DATA 4 >>>
{ _id:"6380fcb161723801ff3b9173",
    fullName:{
    firstName:"Dave",
    lastName:"Duken"
},
userName:"Daveduken100",
email:"daveduken@gmail.com",
password:bcrypt.hashSync("daveduken77", salt),
flowcharts:[],
biography: "“In the end, it’s not the years in your life that count. It’s the life in your years.” – Abraham Lincoln"
},


//<<< SAMPLE DATA 5 >>>
{ _id:"6380fcb161723801ff3b9174",
    fullName:{
    firstName:"Camilla",
    lastName:"Smith"
},
userName:"camillaS45",
email:"camillasmith@gmail.com",
password:bcrypt.hashSync("camilla99", salt),
flowcharts:[],
biography: "“Just because you fail once, does not mean that you’re gonna fail at everything. Keep trying, hold on, and always, always, always believe in yourself because if you don’t, then who will?” – Marilyn Monroe"
}]);


//-------------- SAMPLE DATA FOR COURSE ------------------
//<<< SAMPLE DATA 1 >>>
Course.insertMany([
    {
        accountId: "6380fcb161723801ff3b9170",
        flowchartId: "6380f69ee38cdd8d5a233a7a",
        code: "CCAPDEV",
        professor: "Mar Christian Herrera",
        units: 3,
        status: "Currently Taking",
        style: "#83BBE5",
        leftPosition: 120,
        topPosition: 0
      },

//<<< SAMPLE DATA 2 >>>
   { 
    accountId: "6380fcb161723801ff3b9170",
    flowchartId: '6380f69ee38cdd8d5a233a7a',
    code:"GERIZAL",
    professor:"Angelo Arriola",
    units:3,
    status:"Currently Taking",
    style:  "#83BBE5",
    leftPosition:120,
    topPosition:120,
},

//<<< SAMPLE DATA 3 >>>
 { 
    accountId: "6380fcb161723801ff3b9170",
    flowchartId: '6380f69ee38cdd8d5a233a7a',
    code: "GEDANCE",
    professor: "Jun Alave",
    units: 3,
    status: "Passed",
    style: "#A3D977",
    leftPosition: 0,
    topPosition: 0
 },

//<<< SAMPLE DATA 4 >>>
{
    accountId: "6380fcb161723801ff3b9170",
    flowchartId: '6380f69ee38cdd8d5a233a7a',
    code: "ITISDEV",
    professor: "Alain Encarnacion",
    units: 3,
    status: "Not Yet Taken",
    style: "#FFFFFF",
    leftPosition: 240,
    topPosition: 0
 },

//<<< SAMPLE DATA 5 >>>
{ 
    accountId: "6380fcb161723801ff3b9170",
    flowchartId: '6380f69ee38cdd8d5a233a7a',
    code: "CCPROG2",
    professor: "Shirley Chu",
    units: 3,
    status: "Failed",
    style: "#FF6565",
    leftPosition: 0,
    topPosition: 120
 }]);

//-------------- SAMPLE DATA FOR FLOWCHART ------------------
//<<< SAMPLE DATA 1 >>>
Flowchart.insertMany([{
    _id: "6380f69ee38cdd8d5a233a7a",
    accountId: "6380fcb161723801ff3b9170",
    title: "Term 1 Flowchart",
    department: "Department of Engineering",
    startingYear: 2019,
    numberOfAY: 2
  },

//<<< SAMPLE DATA 2 >>>
{ 
    _id: "6380f69ee38cdd8d5a233a7b",
    accountId: "6380fcb161723801ff3b9170",
    title: "BSFin Flowchart",
    department: "Department of Financial Management",
    startingYear: 2020,
    numberOfAY: 1
},


//<<< SAMPLE DATA 3 >>>
{ 
    _id: "6380f69ee38cdd8d5a233a7c",
    accountId: "6380fcb161723801ff3b9170",
    title: "BSINSYS Flowchart",
    department: "Information Technology Department",
    startingYear: 2021,
    numberOfAY: 1
},

//<<< SAMPLE DATA 4 >>>
{ 
    _id: "6380f69ee38cdd8d5a233a7d",
    accountId: "6380fcb161723801ff3b9170",
    title: "BSCS Flowchart",
    department: "Software Technology Department",
    startingYear: 2020,
    numberOfAY: 1
},

//<<< SAMPLE DATA 5 >>>
{ 
    _id: "6380f69ee38cdd8d5a233a7e",
    accountId: "6380fcb161723801ff3b9170",
    title: "BSIT Flowchart",
    department: "Information Technology Department",
    startingYear: 2020,
    numberOfAY: 1

},
//<<< SAMPLE DATA 6 >>>
{ 
    _id: "6380f69ee38cdd8d5a233a7f",
    accountId: "6380fcb161723801ff3b9171",
    title: "My Flowchart",
    department: "Information Technology Department",
    startingYear: 2022,
    numberOfAY: 1

}]);
}
module.exports =  {sampleData};
