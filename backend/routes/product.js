const router = require('express').Router()
const { getProducts, getProduct, createProduct, updateProduct, deleteProduct, getProductsByCategory } = require('../app/Http/Controllers/ProductController')
const protect = require('../app/Http/Middleware/authMiddleware')
const checkPermission = require('../app/Http/Middleware/permissionMiddleware')

router.get('/', protect, checkPermission('products.view'), getProducts)
router.get('/:id', protect, checkPermission('products.view'), getProduct)
router.post('/', protect, checkPermission('products.create'), createProduct)
router.put('/:id', protect, checkPermission('products.edit'), updateProduct)
router.delete('/:id', protect, checkPermission('products.delete'), deleteProduct)
router.get('/category/:categoryId', protect, checkPermission('products.view'), getProductsByCategory)

module.exports = router