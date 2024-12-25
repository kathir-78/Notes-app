const express = require('express');
const router = express.Router();
const { dashboard } = require('../controllers/dashboardcontroller');
const { isLoggedIn } = require('../middleware/checkAuth');
const note = require('../models/Note');

router.get('/', isLoggedIn, dashboard);
router.post('/', async (req, res) => {
    try {
        await note.create({
            user : req.body.user,
            title : req.body.title,
            body: req.body.body
        })
        res.status(201).send({ message: 'Note created successfully' });
    } catch (e) {
        console.log(e.message);
        res.status(500).send({ error: 'An error occurred while creating the note' });
    }
});

module.exports = router;