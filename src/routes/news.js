const express = require('express');
const router = express.Router();

const newsController = require('../app/controllers/NewsController');

// Đảm bảo rằng các phương thức của controller được định nghĩa chính xác
router.get('/slug', newsController.show);
router.get('/', newsController.index);

module.exports = router;
