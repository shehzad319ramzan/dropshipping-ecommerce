const router = require('express').Router();
const authRoutes = require('./auth');
const categoryRoutes = require('./category');
const productRoutes = require('./product');
const cjRoutes = require('./cj');

router.use('/auth', authRoutes);
router.use('/categories', categoryRoutes);
router.use('/products', productRoutes);
router.use('/cj', cjRoutes);

module.exports = router;
