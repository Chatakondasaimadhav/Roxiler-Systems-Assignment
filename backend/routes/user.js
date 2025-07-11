const express = require('express');
const router = express.Router();
const { registerUser, loginUser, updatePassword } = require('../controllers/userController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/update-password', updatePassword);

module.exports = router;
