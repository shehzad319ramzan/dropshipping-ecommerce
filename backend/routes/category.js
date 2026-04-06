const router = require('express').Router()
const { getCategories, getCategory, createCategory, updateCategory, deleteCategory } = require('../app/Http/Controllers/CategoryController')
const protect = require('../app/Http/Middleware/authMiddleware')
const checkPermission = require('../app/Http/Middleware/permissionMiddleware')

router.get('/', protect, checkPermission('categories.view'), getCategories)
router.get('/:id', protect, checkPermission('categories.view'), getCategory)
router.post('/', protect, checkPermission('categories.create'), createCategory)
router.put('/:id', protect, checkPermission('categories.edit'), updateCategory)
router.delete('/:id', protect, checkPermission('categories.delete'), deleteCategory)

module.exports = router