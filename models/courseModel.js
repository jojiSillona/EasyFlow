const mongoose = require("mongoose");

const courseSchema = mongoose.Schema({
    code: String,
    professor: String,
    units: Number,
    status: String,
},{ versionKey: false });

module.exports = mongoose.model('Course', courseSchema);