const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please provide a username'],
        unique: true
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please provide a password']
    },
    phoneNumber:{
        type: Number,
        required: [true, 'Please provide a phone number'],
        unique: true,
        minLength: [10, 'Phone number must be 10 digits'],
        maxLength: [10, 'Phone number must be 10 digits']
    },
    weight: {
        type: Number,
        required: [true, 'Please provide your weight'],
    },
    height: {
        type: Number,
        required: [true, 'Please provide your height in cm']
    },
    gender: {
        type: String,
        required: [true, 'Please provide your Gender']
    },
    age: {
        type: Number,
        required: [true, 'Please provide your age']
    },
    g1name:{
        type: String,
        required: [true, 'Please provide a name']
    },
    g1phone:{
        type: Number,
        required: [true, 'Please provide a phone number'],
        minLength: [10, 'Phone number must be 10 digits'],
        maxLength: [10, 'Phone number must be 10 digits']
    },
    g1email:{
        type: String,
        required: [true, 'Please provide an email']
    },g2name:{
        type: String,
        required: [true, 'Please provide a name']
    },
    g2phone:{
        type: Number,
        required: [true, 'Please provide a phone number'],
        minLength: [10, 'Phone number must be 10 digits'],
        maxLength: [10, 'Phone number must be 10 digits']
    },
    g2email:{
        type: String,
        required: [true, 'Please provide an email']
    },
    doc:{
        type: String,
        required: [true, 'Please provide a doctor name']
    },
    docphone:{
        type: Number,
        required: [true, 'Please provide a phone number'],
        minLength: [10, 'Phone number must be 10 digits'],
        maxLength: [10, 'Phone number must be 10 digits']
    },
    docemail:{
        type: String,
        required: [true, 'Please provide an email']
    },
    

});
userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET, { expiresIn: '24h' });
    return token;
};
userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password);
}
userSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password,10);
}

const userModel = mongoose.model('User',userSchema);

module.exports = userModel;