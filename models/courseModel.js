const mongoose = require("mongoose");

const courseSchema = mongoose.Schema({
    accountId : String,
    flowchartId : String,
    code: String,
    professor: String,
    units: Number,
    status: String,
    style: String,
    leftPosition: Number,
    topPosition: Number,
    prereqId: String,
    prereqType: String
},{ versionKey: false });

module.exports = mongoose.model('Course', courseSchema);