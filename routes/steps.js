const express = require('express');
const router = express.Router();
const stepsCtrl = require('../controllers/steps');

router.use(require('../config/auth'));
router.post('/', stepsCtrl.add);

module.exports = router;