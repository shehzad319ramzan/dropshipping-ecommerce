const router = require('express').Router()
const { register, login, getMe } = require('../app/Http/Controllers/AuthController')
const protect = require('../app/Http/Middleware/authMiddleware')
const checkRole = require('../app/Http/Middleware/roleMiddleware')
const checkPermission = require('../app/Http/Middleware/permissionMiddleware')

router.post('/register', register)
router.post('/login', login)
router.get('/me', protect, getMe)

// example protected routes
router.get('/admin-only', protect, checkRole('admin'), (req, res) => res.json({ message: 'Welcome admin' }))
router.get('/create-product', protect, checkPermission('products.create'), (req, res) => res.json({ message: 'You can create products' }))

module.exports = router