const router = require('express').Router();
const AdminController = require('../app/Http/Controllers/AdminController');
const authMiddleware = require('../app/Http/Middleware/authMiddleware');
const roleMiddleware = require('../app/Http/Middleware/roleMiddleware');

// Admin routes require authentication and admin role
router.get('/users', authMiddleware, roleMiddleware('admin'), AdminController.getUsers);
router.get('/dashboard-stats', authMiddleware, roleMiddleware('admin'), AdminController.getDashboardStats);

module.exports = router;