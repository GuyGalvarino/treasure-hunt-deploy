const gameRouter = require('express').Router()
const User = require('../models/user')

const initialState = {
    views: {
        bathroom: false,
        kitchen: false,
        bedroom: false,
        living: false,
        study: false
    },
    discovered: {
        bathroom: false,
        kitchen: false,
        bedroom: false,
        living: false,
        study: false,
        key: false
    },
    showClue: false,
    renderKey: false,
    clueText: 'Look at you! Water water everywhere and not a drop to drink!',
    showInitial: true,
    success: false,
    completed: false,
    elapsedTime: 0,
    noOfInteractions: 0
}

gameRouter.post('/', async (req, res) => {
    const decodedToken = req.user
    if (!decodedToken || !decodedToken.id) {
        return res.status(401).json({ error: 'invalid token' })
    }

    const user = await User.findById(decodedToken.id)
    user.game = req.body
    console.log('Completed: ', req.body.completed)
    if (req.body.completed == true) {
        user.game = initialState
        if (req.body.success) {
            user.pastRecords.push({ noOfInteractions: req.body.noOfInteractions, timeTaken: req.body.elapsedTime })
        }
    }
    const fetchedUser = await user.save()
    res.status(200).json(fetchedUser.game)
})

gameRouter.get('/', async (req, res) => {
    const decodedToken = req.user

    if (!decodedToken || !decodedToken.id) {
        return res.status(401).json({ error: 'invalid token' })
    }

    const fetchedUser = await User.findById(decodedToken.id)
    res.status(200).json(fetchedUser.game)
})

gameRouter.get('/stats', async (req, res) => {
    const decodedToken = req.user

    if (!decodedToken || !decodedToken.id) {
        return res.status(401).json({ error: 'invalid token' })
    }

    const fetchedUser = await User.findById(decodedToken.id)
    console.log('sending stats', fetchedUser.pastRecords)
    res.status(200).json(fetchedUser.pastRecords)
})
module.exports = gameRouter