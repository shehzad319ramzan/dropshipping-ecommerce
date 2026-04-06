const CategoryRepository = require('../Repositories/CategoryRepository')

class CategoryService {
    async getAllCategories() {
        return await CategoryRepository.getNestedCategories()
    }

    async getCategoryById(id) {
        return await CategoryRepository.findById(id)
    }

    async createCategory(data) {
        try {
            // Convert empty string to null
            if (!data.parent || data.parent === '') {
                data.parent = null
            }
            
            // Determine level
            if (data.parent) {
                const parent = await CategoryRepository.findById(data.parent)
                if (!parent) {
                    throw new Error(`Parent category not found: ${data.parent}`)
                }
                data.level = parent.level + 1
            } else {
                data.level = 1
            }
            return await CategoryRepository.create(data)
        } catch (err) {
            console.error('CategoryService createCategory error:', err.message)
            throw err
        }
    }

    async updateCategory(id, data) {
        // Convert empty string to null
        if (!data.parent || data.parent === '') {
            data.parent = null
        }
        return await CategoryRepository.update(id, data)
    }

    async deleteCategory(id) {
        // Check if has children
        const children = await CategoryRepository.findByParent(id)
        if (children.length > 0) {
            throw new Error('Cannot delete category with subcategories')
        }
        return await CategoryRepository.delete(id)
    }
}

module.exports = new CategoryService()