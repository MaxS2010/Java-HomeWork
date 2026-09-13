import express from 'express'

const app = express()

const HOST = "localhost"
const PORT = 8000

app.get('/health', (req, res) => {
    res.status(200).json({
        status: "ok"
    })
})

app.get('/stats', (req, res) => {
    res.status(200).json({
        uptime: Math.floor(process.uptime()),
        nodeVersion: process.version,
        timestamp: new Date().toISOString()
    })
})

const server = app.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`)
})
