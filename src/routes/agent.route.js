const express = require('express');
const router = express.Router();

module.exports = router;


router.post('/upload', uploadFile)
router.get('/search', findInfo)
router.get('/', fetchAgg)

async function uploadFile(req, res) {

}

async function findInfo(req, res) {

}

async function fetchAgg(req, res) {

}