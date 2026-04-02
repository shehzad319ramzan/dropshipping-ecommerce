const jwt = require('jsonwebtoken')
const User = require('../../Models/User')
require('../../Models/Permission') // must be loaded so populate works

module.exports = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) return res.status(401).json({ message: 'No token provided' })

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = await User.findById(decoded.id)
            .select('-password')
            .populate({
                path: 'role',
                populate: { path: 'permissions' },
            })
        next()
    } catch {
        res.status(401).json({ message: 'Invalid token' })
    }
}