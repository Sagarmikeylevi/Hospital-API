const express = require('express');
const router = express.Router();
const passport = require('passport');
const reportController = require('../controllers/reportController');

router.post('/:id/create_report' , passport.authenticate('jwt', { session: false }) , reportController.create);

module.exports = router;