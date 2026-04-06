const ProductService = require('../../Services/ProductService')

exports.getProducts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 20
        const products = await ProductService.getAllProducts(page, limit)
        res.json({
            code: 200,
            result: true,
            message: 'Success',
            data: products
        })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

exports.getProduct = async (req, res) => {
    try {
        const product = await ProductService.getProductById(req.params.id)
        if (!product) {
            return res.status(404).json({ message: 'Product not found' })
        }
        res.json(product)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

exports.createProduct = async (req, res) => {
    try {
        const product = await ProductService.createProduct(req.body)
        res.status(201).json(product)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

exports.updateProduct = async (req, res) => {
    try {
        const product = await ProductService.updateProduct(req.params.id, req.body)
        if (!product) {
            return res.status(404).json({ message: 'Product not found' })
        }
        res.json(product)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        await ProductService.deleteProduct(req.params.id)
        res.json({ message: 'Product deleted' })
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

exports.getProductsByCategory = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 20
        const products = await ProductService.getProductsByCategory(req.params.categoryId, page, limit)
        res.json({
            code: 200,
            result: true,
            message: 'Success',
            data: products
        })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}