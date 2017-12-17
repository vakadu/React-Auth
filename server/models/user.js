const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

//Define model
const userSchema = new Schema({
    email: { type: String, unique: true, lowercase: true },
    password: String
});

//On save hook, encrypt password
//Before saving a model, run this function by using pre
userSchema.pre('save', function (next) {
    //get access to user model
    const user = this; //user.email, user.password

    //generate a salt then run callback
    bcrypt.genSalt(10, function (err, salt) {
        if (err) { return next(err); }

        //hash (encrypt) our password using salt
        bcrypt.hash(user.password, salt, null, function (err, hash) {
            if (err) { return next(err); }

            //override plain text password with encrypted password
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function (candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) { return callback(err); }

        callback(null, isMatch);
    });
}

//Create model class
const ModelClass = mongoose.model('user', userSchema);

//export model
module.exports = ModelClass;
