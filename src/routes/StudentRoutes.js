const express = require('express');
const router = express.Router();
const { getStudents, addStudent } = require('../controllers/StudentController');

router.get('/students', getStudents);
router.post('/students', addStudent); 

module.exports = router;
