const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const SALT_ROUNDS = 9;

const stepsLogSchema = new Schema({
    steps: Number
});

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    password: String,
    totalSteps: {
        type: Number,
        default: 0
    },
    stepsLog: [stepsLogSchema],
    currentMilestone: Number
}, {
    timestamps: true
});

userSchema.pre('save', function(next) {
    const user = this; // this will be set to the current document being saved
    if (!user.isModified('password')) return next();
    bcrypt.hash(user.password, SALT_ROUNDS, function(err, hash) {
        //replace the user provided password with the hash
        user.password = hash;
        next();
    });
});

userSchema.methods.comparePassword = function(tryPassword, cb) {
    bcrypt.compare(tryPassword, this.password, cb);
};

module.exports = mongoose.model('User', userSchema);