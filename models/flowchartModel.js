const mongoose = require("mongoose");
// include AY

const flowchartSchema = mongoose.Schema({
    title: String,
    department: String,
    acadYears: [{ type: mongoose.Schema.Types.ObjectId, ref: 'AY' }]
},{ versionKey: false });

module.exports = mongoose.model('Flowchart', flowchartSchema);