const userRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
require('express-async-errors')

userRouter.post('/', async (req, res) => {
    const newUser = new User(req.body)
    const saltRounds = 10
    newUser.password = await bcrypt.hash(newUser.password, saltRounds)
    newUser.pastRecords = []
    await newUser.save()
    res.send().end()
})

module.exports = userRouter