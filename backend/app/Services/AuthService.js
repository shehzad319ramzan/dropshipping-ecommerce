const jwt = require('jsonwebtoken')
const User = require('../Models/User')
const Role = require('../Models/Role')
require('../Models/Permission') // must be loaded so populate works

const generateToken = (id, role) =>
    jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '7d' })

exports.register = async ({ name, email, password }) => {
    const existing = await User.findOne({ email })
    if (existing) throw new Error('Email already in use')

    const userRole = await Role.findOne({ name: 'user' })

    const user = await User.create({
        name,
        email,
        password,
        role: userRole?._id || null,
    })

    const populated = await User.findById(user._id).populate({
        path: 'role',
        populate: { path: 'permissions' },
    })

    const roleName = populated.role?.name || 'user'
    const permissions = populated.role?.permissions?.map(p => p.name) || []

    return {
        token: generateToken(user._id, roleName),
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: roleName,
            permissions,
        },
    }
}

exports.login = async ({ email, password }) => {
    const user = await User.findOne({ email }).populate({
        path: 'role',
        populate: { path: 'permissions' },
    })

    if (!user || !(await user.matchPassword(password)))
        throw new Error('Invalid email or password')

    const roleName = user.role?.name || 'user'
    const permissions = user.role?.permissions?.map(p => p.name) || []

    return {
        token: generateToken(user._id, roleName),
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: roleName,
            permissions,
        },
    }
}