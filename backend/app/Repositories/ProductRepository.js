const Product = require('../Models/Product')

class ProductRepository {
    async findAll(page = 1, limit = 20) {
        const skip = (page - 1) * limit
        const products = await Product.find().populate('categoryId').sort({ createdAt: -1 }).skip(skip).limit(limit)
        const total = await Product.countDocuments()
        return {
            content: products,
            pageSize: limit,
            pageNumber: page,
            totalRecords: total,
            totalPages: Math.ceil(total / limit)
        }
    }

    async findById(id) {
        return await Product.findById(id).populate('categoryId')
    }

    async create(data) {
        const product = new Product(data)
        return await product.save()
    }

    async update(id, data) {
        return await Product.findByIdAndUpdate(id, data, { new: true })
    }

    async delete(id) {
        return await Product.findByIdAndDelete(id)
    }

    async findByCategory(categoryId, page = 1, limit = 20) {
        const skip = (page - 1) * limit
        const products = await Product.find({ categoryId }).populate('categoryId').sort({ createdAt: -1 }).skip(skip).limit(limit)
        const total = await Product.countDocuments({ categoryId })
        return {
            content: products,
            pageSize: limit,
            pageNumber: page,
            totalRecords: total,
            totalPages: Math.ceil(total / limit)
        }
    }
}

module.exports = new ProductRepository()