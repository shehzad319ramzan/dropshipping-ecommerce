const ProductRepository = require('../Repositories/ProductRepository')

class ProductService {
    async getAllProducts(page = 1, limit = 20) {
        return await ProductRepository.findAll(page, limit)
    }

    async getProductById(id) {
        return await ProductRepository.findById(id)
    }

    async createProduct(data) {
        return await ProductRepository.create(data)
    }

    async updateProduct(id, data) {
        return await ProductRepository.update(id, data)
    }

    async deleteProduct(id) {
        return await ProductRepository.delete(id)
    }

    async getProductsByCategory(categoryId, page = 1, limit = 20) {
        return await ProductRepository.findByCategory(categoryId, page, limit)
    }
}

module.exports = new ProductService()