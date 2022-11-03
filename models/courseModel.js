const mongoose = require("mongoose");

const courseSchema = mongoose.Schema({
    code: String,
    status: String
},{ versionKey: false });

module.exports = mongoose.model('Course', courseSchema);