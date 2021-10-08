const User = require('../models/user');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

module.exports = {
    signup
}

async function signup(req, res) {
    const user = new User(req.body);
    try {
        await user.save();
        const token = createJWT(user);
        console.log('PASSED: users controller signup' + user)
        res.json({token});
    } catch (err) {
        res.status(400).json(err);
        console.log('ERROR: users controller' + err)
    };
}

function createJWT(user) {
    return jwt.sign(
        { user },
        SECRET,
        { expiresIn: '24h' }
    );
}