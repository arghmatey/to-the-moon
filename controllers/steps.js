const User = require('../models/user');

module.exports = {
    add
}

async function add(req, res) {
    let user = await User.findById(req.user._id);
    user.totalSteps += req.body.steps;
    user.stepsLog.push(req.body);
    await user.save();
    res.status(200).json(user);
}