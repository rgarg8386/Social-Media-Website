const express = require('express');
const router = express.Router();
// eh homeCOntroller path le rha jiss apa export kita ehnu
const homeController = require('../controllers/home_controller');
router.get('/', homeController.home); // eh object use kr reha export.home aala
router.use('/users', require('./users'));
router.use('/posts', require('./posts'));
router.use('/comments', require('./comments'));
router.use('/api', require('./api'));
router.use('/likes', require('./likes'));
module.exports = router;