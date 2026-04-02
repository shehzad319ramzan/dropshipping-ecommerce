// usage: protect, checkRole('admin')
const checkRole = (...roles) => (req, res, next) => {
    const userRole = req.user?.role?.name
    if (!userRole || !roles.includes(userRole)) {
        return res.status(403).json({ message: 'Access denied — insufficient role' })
    }
    next()
}

module.exports = checkRole