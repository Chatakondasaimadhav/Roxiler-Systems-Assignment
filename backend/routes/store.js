const express = require('express');
const router = express.Router();
const { getStores, rateStore } = require('../controllers/store');

router.get('/', getStores);
router.post('/rate', auth('user'), rateStore);

module.exports = router;
