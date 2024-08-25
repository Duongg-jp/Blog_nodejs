const express = require('express');
const router = express.Router();

const siteController = require('../app/controllers/SiteController');

// Đảm bảo rằng các phương thức của controller được định nghĩa chính xác
router.get('/search', siteController.search);
router.get('/', siteController.index);

module.exports = router;
