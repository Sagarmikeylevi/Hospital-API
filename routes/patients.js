const express = require('express');
const router = express.Router();
const passport = require('passport');

const patientController = require('../controllers/patientController');

router.post('/register' , passport.authenticate('jwt', { session: false }), patientController.register);
router.use('/' , require('./reports'));

module.exports = router;