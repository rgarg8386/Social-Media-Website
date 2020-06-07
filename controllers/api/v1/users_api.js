const User = require('../../../models/user');
const jwt = require('jsonwebtoken');
module.exports.createSession = async(req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email });
        if (!user || user.password != req.body.password) {
            return res.json(422, {
                message: "Invalid Username or Password"
            });
        }
        return res.json(200, {
            message: "sign in successfull",
            data: {
                token: jwt.sign(user.toJSON(), 'codeial', { expiresIn: '1000000' })
            }
        });
    } catch (err) {
        console.log("*****", err);
        return res.json(500, {
            message: "Internal Server Error"
        });
    }
}