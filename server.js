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

// ------------- User ---------------

app.get("/users", (req, res) => {
    // destructure the 'take' query parameter from the request object
    const {take} = req.query

    // create a reverse check for the 'take' query parameter
    if (take === undefined) {
        return res.status(200).json(users)
    }

    // create a int from the 'take' query parameter
    const takeInt = Number(take)

    // check if the 'take' query parameter is a valid integer and greater than or equal to 0
    if (!Number.isInteger(takeInt) || takeInt < 0) {
        return res.status(400).json({
            message: "Invalid 'take' parameter. It must be a non-negative integer."
        })
    }

    // take a part of the users array based on the 'take' query parameter and send it as a JSON response
    const slicedUsers = users.slice(0, takeInt)

    return res.status(200).json(slicedUsers)
})

// crete an endpount with a route parameter 'id' to get a user by id. 
app.get("/users/:id", (req, res) => {
    const {id} = req.params

    const userId = Number(id)

    if (!Number.isInteger(userId) || userId < 0) {
        return res.status(400).json({
            message: "Invalid 'id' parameter. It must be a non-negative integer."
        })
    }

    // find the user with the given id in the users array
    const userFound = users.find(user => user.id === userId)

    if (!userFound) {
        return res.status(404).json({
            message: `User with id ${id} not found.`
        })
    }

    res.status(200).json(userFound)
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
