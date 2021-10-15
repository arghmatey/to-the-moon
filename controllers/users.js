const User = require('../models/user');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

async function getUser(req, res) {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
}

async function signup(req, res) {
    const user = new User(req.body);
    try {
        await user.save();
        const token = createJWT(user);
        res.json({token});
    } catch (err) {
        res.status(400).json(err);
    };
}

async function login(req, res) {
    try {
        const user = await User.findOne({username: req.body.username});
        if (!user) return res.status(401).json({err: 'Bad credentials'});
        user.comparePassword(req.body.password, (err, isMatch) => {
            if (isMatch) {
                const token = createJWT(user);
                res.json({token});
            } else {
                return res.status(401).json({err: 'bad bad bad'});
            }
        });
    } catch (err) {
        return res.status(401).json(err)
    }
}

function createJWT(user) {
    return jwt.sign(
        { user },
        SECRET,
        { expiresIn: '24h' }
    );
}

module.exports = {
    getUser,
    signup,
    login
}