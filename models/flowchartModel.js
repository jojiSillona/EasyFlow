const mongoose = require("mongoose");
// include AY

const flowchartSchema = mongoose.Schema({
    flowChartOwnerUsername: String,
    flowChartId: String,
    title: String,
    department: String,
    ayId: String
},{ versionKey: false });

module.exports = mongoose.model('Flowchart', flowchartSchema);