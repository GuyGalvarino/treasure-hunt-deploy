const adminRouter = require('express').Router()
const mongoose = require('mongoose')
const User = require('../models/user')
require('express-async-errors')

adminRouter.get('/', async (req, res) => {
    const userData = await User.find({})
    req.get('authorization') === 'admin123' ? res.json(userData) : res.status(401).end()
})

module.exports = adminRouter