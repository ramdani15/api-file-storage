const express = require('express');

const router = express.Router();

const { protect } = require('../middlewares/auth');

const { fileUpload, getFile } = require('../controllers/files');

/**
 * @swagger
 * tags:
 *   name: Files
 *   description: The files managing API
 * /api/v1/files:
 *   get:
 *     summary: Get detail File
 *     tags: [Files]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: path
 *         type: string
 *         description: Path of file.
 *         required: true
 *     responses:
 *       200:
 *         description: The detail of file.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Response200'
 *       404:
 *         description: Not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Response404'
 *       500:
 *         description: Some server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Response500'
 */
router
    .route('/')
    .get(protect, getFile);


/**
 * @swagger
 * tags:
 *   name: Files
 *   description: The files managing API
 * /api/v1/files:
 *   post:
 *     summary: Save File
 *     tags: [Files]
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: file
 *         type: file
 *         description: The file to upload.
 *         required: true
 *       - in: formData
 *         name: filename
 *         type: string
 *         description: File name.
 *         required: true
 *       - in: formData
 *         name: env
 *         type: string
 *         description: The environment.
 *         required: true
 *       - in: formData
 *         name: bucket
 *         type: string
 *         description: Bucket name.
 *         required: true
 *     responses:
 *       201:
 *         description: The saved file.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Response201'
 *       500:
 *         description: Some server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Response500'
 */
router
    .route('/')
    .post(protect, fileUpload);

module.exports = router;