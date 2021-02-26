require('dotenv').config()
const express = require('express')
const app = express()

app.use('/', (req, res) => {
    res.send({
        message: "Welcome"
    })
})

const PORT = process.env.APP_PORT? process.env.APP_PORT : 4000
app.listen(PORT, () => {
    console.log(`Now running at port ${PORT}`)
})