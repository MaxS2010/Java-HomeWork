// import express module
import express from 'express'

// create an express application (like an instance of a class)
const app = express()

const HOST = "localhost"
const PORT = 8000

// create a route for the application URL with a GET request. In responce seand a JSON object with a message
app.get('/', (req, res) => {
    res.json({
    message: "Helo World!"
    })
})

// how to add status responce code 
app.get('/coffee', (req, res) => {
    res.status(418).json({
    message: "Helo World!"
    })
})

// start the server and listen on port 3000
app.listen(HOST, PORT, () => {
    console.log('Server is running on http://localhost:3000')
})
