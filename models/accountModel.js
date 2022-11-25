const mongoose = require("mongoose");

const nameSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    _id : {id:false}
})

const accountSchema = mongoose.Schema({
    fullName: nameSchema,
    image:String,
    userName: String,
    email: String,
    password: String,
    flowcharts: [{flowchartId: String}],
    biography: {
        type: String,
        default: "This user hasn't set a biography yet."
    }
},{ versionKey: false });

module.exports = mongoose.model('Account', accountSchema);
