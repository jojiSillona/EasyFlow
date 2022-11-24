const mongoose = require("mongoose");

const courseSchema = mongoose.Schema({
    code: String,
    professor: String,
    units: Number,
    status: String,
    style: String,
    leftPosition: Number,
    topPosition: Number,
},{ versionKey: false });

module.exports = mongoose.model('Course', courseSchema);