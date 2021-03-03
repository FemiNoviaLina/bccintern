require('dotenv').config()
const express = require('express')
const app = express()
const db = require('./models')
const errorHandler = require('./utils/errorHandler')
const cors = require('cors')

db.sequelize.sync({ })

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended: false}))

const routes = require('./routes/user.routes')

app.use('/user', routes)

app.use('/', (req, res) => {
    res.send({message: 'It\'s running!'})
})

app.use(errorHandler)

const PORT = process.env.APP_PORT? process.env.APP_PORT : 4000
app.listen(PORT, () => {
    console.log(`Now running at port ${PORT}`)
})