const express = require('express');
const router = express.Router();
const { dashboard } = require('../controllers/dashboardcontroller');

router.get('/', dashboard);

module.exports = router;