const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    code: { type: String, trim: true },
    parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', default: null },
    level: { type: Number, default: 1 },
    cjCategoryId: { type: String, unique: true, sparse: true }, // CJ Dropshipping category ID (UUID)
}, { timestamps: true })

module.exports = mongoose.model('Category', categorySchema)