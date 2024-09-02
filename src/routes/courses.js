const express = require('express');
const router = express.Router();

const courseController = require('../app/controllers/CourseController');

// Đảm bảo rằng các phương thức của controller được định nghĩa chính xác
router.get('/:slug', courseController.show);

module.exports = router;
