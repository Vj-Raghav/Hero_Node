const User = require('../Models/auth')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.login = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            let err = new Error("Authentication Failed.. Please check email and password entered")
            err.statusCode = 401
            throw err
        } else {
            const checkPass = await bcrypt.compare(req.body.password, user.password)
            if (checkPass) {
                const token = jwt.sign({ email: req.body.email, userId: user._id },
                    'this_is_my_code_secret',
                    { expiresIn: "1h" }
                )
                res.status(200).json({ message: token })
            } else {
                let err = new Error("Authentication Failed.. Please check email and password entered")
                err.statusCode = 401
                throw err
            }
        }
    } catch (err) {
        next(err)
    }
}

exports.signup = async (req, res, next) => {
    try {
        bcrypt.hash(req.body.password, 10).then(
            hash => {
                const user = new User({
                    email: req.body.email,
                    password: hash
                })
                user.save().then(result => {
                    res.status(201).json({ message: 'user Created successfully' })
                }).catch(error => {
                    res.status(400).json({ message: 'Email Already exists' })
                })
            }
        )
    } catch (err) {
        next(err)
    }
}