const mongoose = require("mongoose");
// include Courses

const aySchema = mongoose.Schema({
    flowchartId: String,
    ayId: String, 
    startingYear: Number,
    termOne: [{courseId: String}],
    termTwo: [{courseId: String}],
    termThree: [{courseId: String}]

},{ versionKey: false });

module.exports = mongoose.model('AY', aySchema);