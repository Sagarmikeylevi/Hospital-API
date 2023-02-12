const express = require('express');
const router = express.Router();
const passport = require('passport');
const reportController = require('../controllers/reportController');

router.post('/:id/create_report/:docId' , passport.authenticate('jwt', { session: false }) , reportController.create);
router.get('/:id/all_reports', passport.authenticate('jwt', { session: false }) ,  reportController.showReports);
router.get('/reports/:diagnose' , passport.authenticate('jwt', { session: false }) , reportController.filterReports);
module.exports = router;