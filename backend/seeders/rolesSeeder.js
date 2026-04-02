require('dotenv').config({ path: './.env' })
const mongoose = require('mongoose')

require('../app/Models/Permission')
require('../app/Models/Role')
require('../app/Models/User')

const Permission = mongoose.model('Permission')
const Role = mongoose.model('Role')
const User = mongoose.model('User')

const defaultPermissions = [
    { name: 'products.view', description: 'View products' },
    { name: 'products.create', description: 'Create products' },
    { name: 'products.edit', description: 'Edit products' },
    { name: 'products.delete', description: 'Delete products' },
    { name: 'orders.view', description: 'View orders' },
    { name: 'orders.manage', description: 'Manage orders' },
    { name: 'users.view', description: 'View users' },
    { name: 'users.manage', description: 'Manage users' },
]

const seed = async () => {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('MongoDB connected')

    await Permission.deleteMany()
    await Role.deleteMany()
    await User.deleteMany()
    console.log('Old data cleared')

    const created = await Permission.insertMany(defaultPermissions)
    console.log(`${created.length} permissions created`)

    const allIds = created.map(p => p._id)
    const viewOnly = created.filter(p => p.name.endsWith('.view')).map(p => p._id)

    const [adminRole, userRole] = await Role.create([
        { name: 'admin', permissions: allIds },
        { name: 'user', permissions: viewOnly },
    ])
    console.log('Roles created: admin, user')

    // use User.create() — pre-save hook will hash passwords automatically
    await User.create({
        name: 'Admin',
        email: 'admin@gmail.com',
        password: 'admin123',
        role: adminRole._id,
    })

    await User.create({
        name: 'User',
        email: 'user@gmail.com',
        password: 'user123',
        role: userRole._id,
    })

    console.log('Users created:')
    console.log('  admin@gmail.com  /  admin123  (admin role)')
    console.log('  user@gmail.com   /  user123   (user role)')

    await mongoose.disconnect()
    console.log('Done!')
    process.exit(0)
}

seed().catch(err => {
    console.error(err)
    process.exit(1)
})