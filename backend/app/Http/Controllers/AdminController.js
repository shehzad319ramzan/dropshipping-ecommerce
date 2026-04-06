const User = require('../../Models/User');
const Product = require('../../Models/Product');
const Category = require('../../Models/Category');

class AdminController {
    /**
     * Get all users
     */
    async getUsers(req, res) {
        try {
            const users = await User.find()
                .populate('role')
                .select('-password')
                .sort({ createdAt: -1 });
            
            res.json({
                code: 200,
                result: true,
                message: 'Success',
                data: users
            });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    /**
     * Get dashboard stats
     */
    async getDashboardStats(req, res) {
        try {
            const totalUsers = await User.countDocuments();
            const totalProducts = await Product.countDocuments();
            const totalCategories = await Category.countDocuments();
            
            // Mocking revenue and orders for now as we don't have Order model yet in the context
            // In a real scenario, you would count documents from an Orders collection
            const totalOrders = 0; 
            const totalRevenue = 0;

            res.json({
                code: 200,
                result: true,
                message: 'Success',
                data: {
                    stats: [
                        { label: 'Total Products', value: totalProducts, change: '+0%', up: true, color: 'bg-brand-primary' },
                        { label: 'Total Categories', value: totalCategories, change: '+0%', up: true, color: 'bg-brand-green' },
                        { label: 'Total Users', value: totalUsers, change: '+0%', up: true, color: 'bg-amber-400' },
                        { label: 'Total Orders', value: totalOrders, change: '+0%', up: true, color: 'bg-red-500' },
                    ],
                    recentProducts: await Product.find().limit(5).sort({ createdAt: -1 }),
                    recentUsers: await User.find().select('-password').limit(5).sort({ createdAt: -1 })
                }
            });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
}

module.exports = new AdminController();