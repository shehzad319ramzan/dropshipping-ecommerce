const BaseRepository = require('./BaseRepository');
const User = require('../Models/User');

class UserRepository extends BaseRepository {
    constructor() {
        super(User);
    }

    async findByEmail(email) {
        return await User.findOne({ email }).select('+password');
    }

    async findAllUsers(options = {}) {
        return await this.findAll({ role: 'user' }, options);
    }
}

module.exports = new UserRepository();