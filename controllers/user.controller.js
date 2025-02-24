const usermodel = require('../models/user.model');
const userService = require('../services/user.service');
const {validationResult} = require('express-validator');
const blacklisttokenModel = require('../models/blacklisttoken.model');
const { sendEmail } = require('../services/email.services');
const { sendWhatsAppMessage } = require('../services/whatsapp.service');

module.exports.registerUser = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            username, email, password, phoneNumber, weight, height, gender, age,
            g1name, g1phone, g1email, g2name, g2phone, g2email,
            doc, docphone, docemail
        } = req.body;

        // Check if user already exists
        const isUserAlreadyExists = await usermodel.findOne({ email });
        if (isUserAlreadyExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await usermodel.hashPassword(password);

        // Create user
        const user = await userService.createUser({
            username, email, password: hashedPassword, phoneNumber, weight, height,
            gender, age, g1name, g1phone, g1email, g2name, g2phone, g2email,
            doc, docphone, docemail
        });

        // Generate JWT token
        const token = user.generateAuthToken();

        // Send response
        res.status(201).json({ token, user });

    } catch (error) {
        next(error);
    }
};

module.exports.loginUser = async(req,res,next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {email,password} = req.body;
    const user = await usermodel.findOne({email}).select('+password');
    if(!user){
        return res.status(401).json({message:'Invalid email or password'});
    }
    const isMatch = await user.comparePassword(password);
    if(!isMatch){
        return res.status(401).json({message:'Invalid email or password'});
    }

    const token = user.generateAuthToken();
    

    res.cookie('token',token,{httpOnly:true});

    res.status(200).json({token,user});
    await sendEmail(email, "Welcome!", "Thank you for Logging!");
    await sendWhatsAppMessage("+918141242093", "Welcome to Health Tracker!");

};
module.exports.getUserProfile = async(req,res,next)=>{
    res.status(200).json(req.user);
};

module.exports.logoutUser = async(req,res,next)=>{
    res.clearCookie('token');
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];
    await blacklisttokenModel.create({token});
    res.status(200).json({message:'Logged out successfully'});
};
module.exports.validateToken = async (req, res) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1]; // Get token from 'Authorization' header
    if (!token) {
      return res.status(401).json({ success: false, message: "Not authorized" });
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, userDoc) => {
      if (err) {
        return res.status(401).json({ success: false, message: "Token invalid" });
      }

      const user = await userModel.findById(userDoc.id).select("-password");
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }

      res.json({ success: true, user });
    });
};