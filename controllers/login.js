const loginRouter = require('express').Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

loginRouter.post('/', async (req, res) => {
    const fetchedUser = await User.findOne({ email: req.body.email })
    const password = req.body.password
    if (!fetchedUser || !(await bcrypt.compare(password, fetchedUser.password))) {
        return res.status(401).json({ error: 'incorrect username or password' })
    }
    const userForToken = {
        email: fetchedUser.email,
        id: fetchedUser._id
    }
    const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: '1d' })
    res.status(200).json({ token, email: fetchedUser.email, name: fetchedUser.name })
})

module.exports = loginRouter
