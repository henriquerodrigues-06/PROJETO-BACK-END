const express = require('express');
const { generateRoutine } = require('../controllers/routineController');

const router = express.Router();

router.get('/routine', generateRoutine);

module.exports = router;