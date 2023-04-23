const jwt = require('jsonwebtoken')

const tokenExtractor = (req, res, nxt) => {
    const auth = req.get('authorization')
    if (auth && auth.startsWith('Bearer ')) {
        req.token = auth.replace('Bearer ', '')
    }
    nxt()
}

const userExtractor = (req, res, nxt) => {
    if (req.token) {
        req.user = jwt.verify(req.token, process.env.SECRET)
    }
    nxt()
}

const errorHandler = (err, req, res, nxt) => {
    console.error(err.message)
    if (err.name === 'ValidationError') {
        res.status(403).json({ error: err.message })
    }
    else if (err.name === 'JsonWebTokenError') {
        return res.status(400).json({ error: err.message })
    }
    nxt(err)
}

module.exports = { tokenExtractor, userExtractor, errorHandler }
