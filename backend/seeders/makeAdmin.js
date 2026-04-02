require('dotenv').config({ path: './.env' })
const mongoose = require('mongoose')
const User = require('../app/Models/User')
const Role = require('../app/Models/Role')

const makeAdmin = async () => {
    await mongoose.connect(process.env.MONGO_URI)

    const adminRole = await Role.findOne({ name: 'admin' })
    const user = await User.findOneAndUpdate(
        { email: 'your@email.com' },  // ← change to your email
        { role: adminRole._id },
        { new: true }
    )

    console.log(`${user.name} is now admin`)
    await mongoose.disconnect()
    process.exit(0)
}

makeAdmin().catch(err => { console.error(err); process.exit(1) })