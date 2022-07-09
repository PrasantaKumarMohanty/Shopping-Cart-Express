const userRoute = require('express').Router();
const User = require('../model/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


//register new user route
userRoute.post('/register', async (req, res) => {
    // console.log("first",req.body)
    const salt = await bcrypt.genSalt(10)
    const securedPassword = await bcrypt.hash(req.body.password, salt)
    const uniqueUser = await User.findOne({ email: req.body.email })

    if (uniqueUser) {
        res.status(400).send({ message: "User is already registered !!" })
    } else {
        const user = {
            userName: req.body.userName,
            phone: req.body.phone,
            email: req.body.email,
            password: securedPassword,
            role: req.body.role
        };
        try {

            let savedUser = await User.create(user);
            console.log(savedUser)
            return res.status(200).json(savedUser);

        } catch (err) {
            return res.status(400).send(err)
        }
    }

});

//login user route
userRoute.post('/login', async (req, res) => {
    const { email, password } = req.body
    console.log(process.env.TOKEN)
    User.findOne({ email: email }, async (err, user) => {
        if (user) {
            const passwordCompare = await bcrypt.compare(password, user.password)

            if (passwordCompare) {
                const token = jwt.sign({ user }, process.env.TOKEN );
                return await res.status(200).header('auth_token', token).json({ auth_token: token });

            } else {
                res.status(400).send({ message: "Wrong Password" })
            }
        } else {
            res.status(400).send({ message: `user not registered 'or' email id not exist! ${err}` })
        }
    })
})

module.exports = userRoute;