const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

mongoose.connect('mongodb+srv://Rajeshmali:1234@cluster0.alfqfb4.mongodb.net/paytm');

const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    username: String,
    password_hash: String,
});

userSchema.methods.createHash = async (plainTextPassword) => {
    const saltRounds = 10;

    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(plainTextPassword, salt);
}

userSchema.methods.validateHash = async (candidatePassword, password_hash) => {
    return await bcrypt.compare(candidatePassword, password_hash);
}

const accountShema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
});

const User = mongoose.model('users', userSchema);
const Account = mongoose.model('accounts', accountShema);

module.exports = {
    User,
    Account
}