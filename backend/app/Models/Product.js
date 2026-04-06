const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    cjProductId: { type: String, unique: true }, // CJ Dropshipping product ID ("id" field)
    nameEn: { type: String, required: true },
    sku: { type: String, required: true, unique: true },
    isCollect: { type: Number, default: 0 },
    listedNum: { type: Number, default: 0 },
    bigImage: String,
    sellPrice: String,
    nowPrice: String,
    authorityStatus: String,
    addMarkStatus: { type: Number, default: 0 },
    isVedio: { type: Number, default: 0 }, // Note: CJ API has typo "isVedio"
    productType: String,
    isAut: String,
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }, // Our internal category
    cjCategoryId: String, // CJ's category ID (UUID format)
    threeCategoryName: String,
    twoCategoryId: String,
    twoCategoryName: String,
    oneCategoryId: String,
    oneCategoryName: String,
    directMinOrderNum: Number,
    supplierName: String,
    zoneRecommendJson: String,
    createAt: Date,
    setRecommendedTime: Date,
    autStatus: String,
    isList: { type: Number, default: 0 },
    isAd: { type: Number, default: 0 },
    activityId: String,
    isPersonalized: { type: Number, default: 0 },
    saleStatus: String,
    syncListedProductStatus: String,
    videoList: [String],
    deliveryCycle: String,
    warehouseInventoryNum: { type: Number, default: 0 },
    discountPrice: String,
    discountPriceRate: String,
    myProduct: { type: Boolean, default: false },
    currency: String,
    totalVerifiedInventory: { type: Number, default: 0 },
    totalUnVerifiedInventory: Number,
    verifiedWarehouse: { type: Number, default: 1 },
    customization: String,
    hasCECertification: String,
    description: String,
    spu: String,
    inventoryInfo: String,
    variantKeyEn: String,
    variantInventories: String,
    propertyKey: String,
    isVideo: { type: Number, default: 0 }
}, { timestamps: true })

module.exports = mongoose.model('Product', productSchema)
