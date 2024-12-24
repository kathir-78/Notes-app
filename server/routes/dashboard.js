const express = require('express');
const router = express.Router();
const { dashboard } = require('../controllers/dashboardcontroller');
const { isLoggedIn } = require('../middleware/checkAuth');

router.get('/', isLoggedIn, dashboard);

module.exports = router;