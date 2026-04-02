// usage: protect, checkPermission('products.create')
const checkPermission = (permission) => (req, res, next) => {
    const permissions = req.user?.role?.permissions?.map(p => p.name) || []
    if (!permissions.includes(permission)) {
        return res.status(403).json({ message: `Access denied — missing permission: ${permission}` })
    }
    next()
}

module.exports = checkPermission