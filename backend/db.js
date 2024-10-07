const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Rajeshmali:1234@cluster0.alfqfb4.mongodb.net/paytm');

const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    username: String,
    password: String,
});

const User = mongoose.model('user', userSchema);

module.export = {
    User
}