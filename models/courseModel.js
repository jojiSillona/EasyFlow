const mongoose = require("mongoose");

const courseSchema = mongoose.Schema({
    code: String,
    status: String,
    acadYear: { type: mongoose.Schema.Types.ObjectId, ref: 'AY' },
    term: Number,
    position: String
},{ versionKey: false });

module.exports = mongoose.model('Course', courseSchema);