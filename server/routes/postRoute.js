const express = require('express')
const { create, findAll, remove, findOne, update } = require('../controller/postController');
const router = express.Router();

router
.post('/create', create)
.get('/posts', findAll)
.get('/posts/:id', findOne)
.put('/posts/:id', update)
.delete('/posts/:id', remove )

module.exports = router
