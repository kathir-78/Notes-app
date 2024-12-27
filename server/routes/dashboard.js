const express = require('express');
const router = express.Router();
const { dashboard, updateNote, viewNote, deleteNote, dashboardAddnote, dashboardAddnoteSubmit, dashboardsearch, dashboardsearchSubmit} = require('../controllers/dashboardcontroller');
const { isLoggedIn } = require('../middleware/checkAuth');
const note = require('../models/Note');

router.get('/', isLoggedIn, dashboard);
router.get('/item/:id', isLoggedIn, viewNote );
router.put('/item/:id',isLoggedIn, updateNote);
router.delete('/item-delete/:id', isLoggedIn, deleteNote);
router.get('/add', isLoggedIn, dashboardAddnote);
router.post('/add', isLoggedIn, dashboardAddnoteSubmit);
router.get('/search', isLoggedIn, dashboardsearch);
router.post('/search', isLoggedIn, dashboardsearchSubmit);

module.exports = router;