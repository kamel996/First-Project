const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
// "bcryptjs" is a library for Node.js that allows you to hash and compare passwords.

const adminSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

// Hash the password before saving
adminSchema.pre('save', async function(next) {
    const admin = this;
    if (admin.isModified('password')) {
        admin.password = await bcrypt.hash(admin.password, 8);
    }
    next();
});
// The first block of code is a Mongoose middleware function that runs before the save() method is called on the admin object. It checks if the password property of the admin object has been modified, and if it has, it hashes the password using bcrypt's hash() method. The first argument to this method is the plaintext password, and the second argument is the number of rounds of hashing to apply (the higher the number, the more secure the hash but also the more computational resources required).


// Compare hashed password
adminSchema.methods.isValidPassword = async function(password) {
    const admin = this;
    return await bcrypt.compare(password, admin.password);
};
// The second block of code is a custom method added to the adminSchema, which is a method that compares an input password to the hashed password stored in the database. The method uses the bcrypt.compare() method, which takes in the plaintext password and the hashed password and returns a boolean indicating if they match.

module.exports = mongoose.model('Admin', adminSchema);
