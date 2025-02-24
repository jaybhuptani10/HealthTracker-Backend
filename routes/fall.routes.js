const express = require('express');
const { fallRisk } = require('../controllers/pred.controller');
const router = express.Router();


router.post('/fall', fallRisk);
module.exports = router;