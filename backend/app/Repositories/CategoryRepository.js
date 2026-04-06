const Category = require('../Models/Category')

class CategoryRepository {
    async findAll() {
        return await Category.find().populate('parent').sort({ createdAt: -1 })
    }

    async findById(id) {
        return await Category.findById(id).populate('parent')
    }

    async create(data) {
        const category = new Category(data)
        return await category.save()
    }

    async update(id, data) {
        return await Category.findByIdAndUpdate(id, data, { new: true })
    }

    async delete(id) {
        return await Category.findByIdAndDelete(id)
    }

    async findByParent(parentId) {
        return await Category.find({ parent: parentId }).sort({ name: 1 })
    }

    async getNestedCategories() {
        const categories = await Category.find().sort({ level: 1, name: 1 })
        const categoryMap = {}
        const roots = []

        categories.forEach(cat => {
            categoryMap[cat._id] = { ...cat.toObject(), categoryFirstList: [], categorySecondList: [] }
        })

        categories.forEach(cat => {
            if (cat.parent) {
                const parent = categoryMap[cat.parent]
                if (parent) {
                    if (cat.level === 2) {
                        parent.categoryFirstList.push(categoryMap[cat._id])
                    } else if (cat.level === 3) {
                        // Find the second level parent
                        const secondParent = categories.find(c => c._id.toString() === cat.parent.toString())
                        if (secondParent && secondParent.parent) {
                            const firstParent = categoryMap[secondParent.parent]
                            if (firstParent) {
                                const secondCat = firstParent.categoryFirstList.find(s => s._id === cat.parent.toString())
                                if (secondCat) {
                                    secondCat.categorySecondList.push(categoryMap[cat._id])
                                }
                            }
                        }
                    }
                }
            } else {
                roots.push(categoryMap[cat._id])
            }
        })

        return roots.map(root => ({
            categoryFirstId: root._id,
            categoryFirstName: root.name,
            categoryFirstList: root.categoryFirstList.map(second => ({
                categorySecondId: second._id,
                categorySecondName: second.name,
                categorySecondList: second.categorySecondList.map(third => ({
                    categoryId: third._id,
                    categoryName: third.name
                }))
            }))
        }))
    }
}

module.exports = new CategoryRepository()