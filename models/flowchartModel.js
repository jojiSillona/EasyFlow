const mongoose = require("mongoose");
// include AY

const flowchartSchema = mongoose.Schema({
    accountId: String,
    title: String,
    department: String,
    ayId: String,
    startingYear: Number,
    numberOfAY: Number
},{ versionKey: false });

module.exports = mongoose.model('Flowchart', flowchartSchema);