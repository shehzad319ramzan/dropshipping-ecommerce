const AuthService = require('../../Services/AuthService')

exports.register = async (req, res) => {
    try {
        const data = await AuthService.register(req.body)
        res.status(201).json(data)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

exports.login = async (req, res) => {
    try {
        const data = await AuthService.login(req.body)
        res.json(data)
    } catch (err) {
        res.status(401).json({ message: err.message })
    }
}

exports.getMe = async (req, res) => {
    const permissions = req.user?.role?.permissions?.map(p => p.name) || []
    res.json({
        user: {
            id: req.user._id,
            name: req.user.name,
            email: req.user.email,
            role: req.user.role?.name || 'user',
            permissions,
        },
    })
}