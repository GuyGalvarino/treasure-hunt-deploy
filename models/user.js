const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    game: {
        views: {
            mainMenu: { type: Boolean },
            bathroom: { type: Boolean },
            kitchen: { type: Boolean },
            bedroom: { type: Boolean },
            living: { type: Boolean },
            study: { type: Boolean },
        },
        discovered: {
            bathroom: { type: Boolean },
            kitchen: { type: Boolean },
            bedroom: { type: Boolean },
            living: { type: Boolean },
            study: { type: Boolean },
            key: { type: Boolean }
        },
        showClue: Boolean,
        renderKey: Boolean,
        clueText: String,
        success: Boolean,
        completed: Boolean,
        showInitial: Boolean,
        elapsedTime: Number,
        noOfInteractions: Number,
    },
    pastRecords: [
        {
            noOfInteractions: Number,
            timeTaken: Number
        }
    ]
})

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.password
    }
})

module.exports = new mongoose.model('User', userSchema)