const mongoose = require("mongoose");

const courseSchema = mongoose.Schema({
    accountId: { type: mongoose.Schema.Types.ObjectId, ref: 'Account' },
    flowchartId: { type: mongoose.Schema.Types.ObjectId, ref: 'Flowchart' },
    ayId: { type: mongoose.Schema.Types.ObjectId, ref: 'AY' },
    code: String,
    professor: String,
    units: Number,
    status: String,
},{ versionKey: false });

module.exports = mongoose.model('Course', courseSchema);