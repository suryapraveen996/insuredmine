const express = require('express');
const router = express.Router(); 

module.exports = router;

const agent = require('./agent.route');
const message = require('./message.route');

router.use('/agent', agent);
router.use('/message', message)