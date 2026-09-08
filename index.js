import express from 'express'
import moment from 'moment'

function getCurrentDate() {
    return moment().format('YYYY-MM-DD HH:mm:ss')
}

const app = express()

const HOST = "localhost"
const PORT = 8000

app.get('/timestamp', (req, res) => {
    res.json({
        time: getCurrentDate()
    })
})

app.get('/coffee', (req, res) => {
    res.status(418).json({
    message: "No coffee!"
    })
})

const server = app.listen(PORT, HOST, () => {
    console.log(`Server is running on http://localhost:${server.address().port}`)
})
