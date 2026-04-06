const CategoryService = require('../../Services/CategoryService')

exports.getCategories = async (req, res) => {
    try {
        const categories = await CategoryService.getAllCategories()
        res.json({
            code: 200,
            result: true,
            message: 'Success',
            data: categories
        })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

exports.getCategory = async (req, res) => {
    try {
        const category = await CategoryService.getCategoryById(req.params.id)
        if (!category) {
            return res.status(404).json({ message: 'Category not found' })
        }
        res.json(category)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

exports.createCategory = async (req, res) => {
    try {
        console.log('Request body:', req.body)
        const category = await CategoryService.createCategory(req.body)
        res.status(201).json(category)
    } catch (err) {
        console.error('Create Category Error:', {
            message: err.message,
            stack: err.stack,
            name: err.name
        })
        res.status(400).json({ message: err.message, error: err.name })
    }
}

exports.updateCategory = async (req, res) => {
    try {
        const category = await CategoryService.updateCategory(req.params.id, req.body)
        if (!category) {
            return res.status(404).json({ message: 'Category not found' })
        }
        res.json(category)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

exports.deleteCategory = async (req, res) => {
    try {
        await CategoryService.deleteCategory(req.params.id)
        res.json({ message: 'Category deleted' })
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}