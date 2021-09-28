const express = require('express');

const router = express.Router();

const { protect } = require('../middlewares/auth');

const { fileUpload, getFile } = require('../controllers/files');

router
    .route('/')
    .get(protect, getFile)
    .post(protect, fileUpload);

module.exports = router;