const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/register', [
    body('username')
        .isLength({ min: 3 })
        .withMessage('Username must be at least 3 characters long'),

    body('email')
        .isEmail()
        .withMessage('Invalid email format'),

    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),

    body('phoneNumber')
        .isNumeric()
        .isLength({ min: 10, max: 10 })
        .withMessage('Phone number must be exactly 10 digits'),

    body('weight')
        .isNumeric()
        .withMessage('Weight must be a number'),

    body('height')
        .isNumeric()
        .withMessage('Height must be a number'),

    body('gender')
        .isIn(['Male', 'Female', 'Other'])
        .withMessage('Gender must be Male, Female, or Other'),

    body('age')
        .isNumeric()
        .withMessage('Age must be a number'),

    body('g1name')
        .isLength({ min: 3 })
        .withMessage('Guardian 1 name must be at least 3 characters long'),

    body('g1phone')
        .isNumeric()
        .isLength({ min: 10, max: 10 })
        .withMessage('Guardian 1 phone number must be exactly 10 digits'),

    body('g1email')
        .isEmail()
        .withMessage('Invalid email for Guardian 1'),

    body('g2name')
        .isLength({ min: 3 })
        .withMessage('Guardian 2 name must be at least 3 characters long'),

    body('g2phone')
        .isNumeric()
        .isLength({ min: 10, max: 10 })
        .withMessage('Guardian 2 phone number must be exactly 10 digits'),

    body('g2email')
        .isEmail()
        .withMessage('Invalid email for Guardian 2'),

    body('doc')
        .isLength({ min: 3 })
        .withMessage('Doctor name must be at least 3 characters long'),

    body('docphone')
        .isNumeric()
        .isLength({ min: 10, max: 10 })
        .withMessage('Doctor phone number must be exactly 10 digits'),

    body('docemail')
        .isEmail()
        .withMessage('Invalid email for Doctor')
], userController.registerUser);

router.post('/login',[
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({min:6}).withMessage('Password must be at least 6 characters long')
]
,userController.loginUser);

router.get('/profile',authMiddleware.authUser,userController.getUserProfile);
router.get('/logout',authMiddleware.authUser,userController.logoutUser);
module.exports = router;