const mongoose = require("mongoose");
// include Courses

const aySchema = mongoose.Schema({
    academicYear: {start: Number, end: Number},
    termOne: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
    termTwo: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
    termThree: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],

},{ versionKey: false });

module.exports = mongoose.model('AY', aySchema);