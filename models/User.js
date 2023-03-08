const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please Enter An Email'],
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, 'Please Enter a Password'],
        minlength: [6, 'Minium Length is 6 Characters']
    }
});

// userSchema.post('save', function (doc, next) {
//     console.log('new user was created and save', doc);
//     next();
// })

userSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

const User = mongoose.model('user', userSchema);

module.exports = User;