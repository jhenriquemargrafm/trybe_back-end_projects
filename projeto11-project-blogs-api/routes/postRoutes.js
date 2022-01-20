const express = require('express');

const { postValidation } = require('../validations');
const { createPost, listPosts } = require('../controllers/postController');

const router = express.Router();

// Requisito 7 - Rota POST - POST
router.post('/', postValidation, createPost);

// Requisito 8 - Rota POST - GET
router.get('/', listPosts);

module.exports = router;