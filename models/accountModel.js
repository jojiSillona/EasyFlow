const mongoose = require("mongoose");

const nameSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    _id : {id:false}
})

const accountSchema = mongoose.Schema({
    fullName: nameSchema,
    userName: String,
    email: String,
    password: String,
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Account' }]  
},{ versionKey: false });

module.exports = mongoose.model('Account', accountSchema);