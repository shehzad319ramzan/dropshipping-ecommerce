const axios = require('axios');
const Category = require('../../Models/Category');
const Product = require('../../Models/Product');

class CJSyncController {
    /**
     * Sync categories from CJ Dropshipping API
     */
    async syncCategories(req, res) {
        try {
            const accessToken = process.env.CJ_ACCESS_TOKEN;
            const baseUrl = process.env.CJ_BASE_URL;

            const response = await axios.get(`${baseUrl}/api2.0/v1/product/getCategory`, {
                headers: { 'CJ-Access-Token': accessToken }
            });

            if (response.data && response.data.result) {
                const categories = response.data.data;
                let syncCount = 0;

                for (const cat1 of categories) {
                    // Level 1
                    const level1 = await Category.findOneAndUpdate(
                        { cjCategoryId: cat1.categoryFirstId },
                        {
                            name: cat1.categoryFirstName,
                            level: 1,
                            parent: null,
                            cjCategoryId: cat1.categoryFirstId
                        },
                        { upsert: true, new: true }
                    );
                    syncCount++;

                    if (cat1.categoryFirstList && cat1.categoryFirstList.length > 0) {
                        for (const cat2 of cat1.categoryFirstList) {
                            // Level 2
                            const level2 = await Category.findOneAndUpdate(
                                { cjCategoryId: cat2.categorySecondId },
                                {
                                    name: cat2.categorySecondName,
                                    level: 2,
                                    parent: level1._id,
                                    cjCategoryId: cat2.categorySecondId
                                },
                                { upsert: true, new: true }
                            );
                            syncCount++;

                            if (cat2.categorySecondList && cat2.categorySecondList.length > 0) {
                                for (const cat3 of cat2.categorySecondList) {
                                    // Level 3
                                    await Category.findOneAndUpdate(
                                        { cjCategoryId: cat3.categoryId },
                                        {
                                            name: cat3.categoryName,
                                            level: 3,
                                            parent: level2._id,
                                            cjCategoryId: cat3.categoryId
                                        },
                                        { upsert: true, new: true }
                                    );
                                    syncCount++;
                                }
                            }
                        }
                    }
                }

                return res.status(200).json({
                    success: true,
                    message: `Successfully synced ${syncCount} categories.`,
                });
            } else {
                return res.status(400).json({
                    success: false,
                    message: response.data ? response.data.message : 'Failed to fetch categories from CJ API',
                });
            }
        } catch (error) {
            console.error('Error syncing categories:', error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error during category sync',
                error: error.message
            });
        }
    }

    /**
     * Sync products from CJ Dropshipping API
     */
    async syncProducts(req, res) {
        try {
            const accessToken = process.env.CJ_ACCESS_TOKEN;
            const baseUrl = process.env.CJ_BASE_URL;
            const { keyWord = 'hoodie', pageNum = 1, pageSize = 20 } = req.query;

            const response = await axios.get(`${baseUrl}/api2.0/v1/product/listV2`, {
                params: { page: pageNum, size: pageSize, keyWord },
                headers: { 'CJ-Access-Token': accessToken }
            });

            if (response.data && response.data.result) {
                const productData = response.data.data;
                const products = productData.content[0].productList;
                let syncCount = 0;

                for (const p of products) {
                    // Find internal category if exists
                    const internalCategory = await Category.findOne({ cjCategoryId: p.categoryId });

                    const productFields = {
                        cjProductId: p.id,
                        nameEn: p.nameEn,
                        sku: p.sku,
                        isCollect: p.isCollect,
                        listedNum: p.listedNum,
                        bigImage: p.bigImage,
                        sellPrice: p.sellPrice,
                        nowPrice: p.nowPrice,
                        authorityStatus: p.authorityStatus,
                        addMarkStatus: p.addMarkStatus,
                        isVedio: p.isVedio,
                        productType: p.productType,
                        isAut: p.isAut,
                        cjCategoryId: p.categoryId,
                        categoryId: internalCategory ? internalCategory._id : null,
                        threeCategoryName: p.threeCategoryName,
                        twoCategoryId: p.twoCategoryId,
                        twoCategoryName: p.twoCategoryName,
                        oneCategoryId: p.oneCategoryId,
                        oneCategoryName: p.oneCategoryName,
                        directMinOrderNum: p.directMinOrderNum,
                        supplierName: p.supplierName,
                        zoneRecommendJson: p.zoneRecommendJson,
                        createAt: p.createAt,
                        setRecommendedTime: p.setRecommendedTime,
                        autStatus: p.autStatus,
                        isList: p.isList,
                        isAd: p.isAd,
                        activityId: p.activityId,
                        isPersonalized: p.isPersonalized,
                        saleStatus: p.saleStatus,
                        syncListedProductStatus: p.syncListedProductStatus,
                        videoList: p.videoList,
                        deliveryCycle: p.deliveryCycle,
                        warehouseInventoryNum: p.warehouseInventoryNum,
                        discountPrice: p.discountPrice,
                        discountPriceRate: p.discountPriceRate,
                        myProduct: p.myProduct,
                        currency: p.currency,
                        totalVerifiedInventory: p.totalVerifiedInventory,
                        totalUnVerifiedInventory: p.totalUnVerifiedInventory,
                        verifiedWarehouse: p.verifiedWarehouse,
                        customization: p.customization,
                        hasCECertification: p.hasCECertification,
                        description: p.description,
                        spu: p.spu,
                        inventoryInfo: p.inventoryInfo,
                        variantKeyEn: p.variantKeyEn,
                        variantInventories: p.variantInventories,
                        propertyKey: p.propertyKey,
                        isVideo: p.isVideo
                    };

                    await Product.findOneAndUpdate(
                        { cjProductId: p.id },
                        productFields,
                        { upsert: true, new: true }
                    );
                    syncCount++;
                }

                return res.status(200).json({
                    success: true,
                    message: `Successfully synced ${syncCount} products for keyword: ${keyWord}.`,
                    pagination: {
                        pageNumber: productData.pageNumber,
                        pageSize: productData.pageSize,
                        totalRecords: productData.totalRecords,
                        totalPages: productData.totalPages
                    }
                });
            } else {
                return res.status(400).json({
                    success: false,
                    message: response.data ? response.data.message : 'Failed to fetch products from CJ API',
                });
            }
        } catch (error) {
            console.error('Error syncing products:', error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error during product sync',
                error: error.message
            });
        }
    }
}

module.exports = new CJSyncController();