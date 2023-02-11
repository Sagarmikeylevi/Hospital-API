const express = require('express');
const router = express.Router();

const homeController = require('../controllers/homeController');

router.get('/' , homeController.home);
router.use('/doctors' , require('./doctors'));
router.use('/patients' , require('./patients'));

console.log("Routes are running fine");
module.exports = router;