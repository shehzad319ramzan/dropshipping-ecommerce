const router = require('express').Router();
const CJSyncController = require('../app/Http/Controllers/CJSyncController');
const authMiddleware = require('../app/Http/Middleware/authMiddleware');
const roleMiddleware = require('../app/Http/Middleware/roleMiddleware');

// All sync routes require admin authentication
router.post('/sync/categories', authMiddleware, roleMiddleware('admin'), CJSyncController.syncCategories);
router.post('/sync/products', authMiddleware, roleMiddleware('admin'), CJSyncController.syncProducts);

module.exports = router;