import express from 'express'

const app = express()

const HOST = "localhost"
const PORT = 8000

let users = []
let n_user = 0

function addUser(name, password) {
    users.push({
        id: n_user,
        name: name,
        password: password
    })
    n_user++
}

function createTestUsers(count) {
    for (let index = 0; index < count; index++) {
        addUser(`User${index}`, `password${index}`)
    }
}

createTestUsers(10)

app.get("/users", (req, res) => {
    const {take} = req.query

    if (!take) {
        return res.status(200).json(users)
    }

    const takeInt = Number(take)

    if (!Number.isInteger(take) || take < 0) {
        return res.status(400).json({
            message: "Invalid 'take' parameter. It must be a non-negative integer."
        })
    }

    slicedUsers = users.slice(0, take)

    res.status(200).json(slicedUsers)
})

app.get("/users/:id", (req, res) => {
    const {id} = req.params

    const userId = Number(id)

    if (!Number.isInteger(userId) || userId < 0) {
        return res.status(400).json({
            message: "Invalid 'id' parameter. It must be a non-negative integer."
        })
    }

    const userFound = users.find(user => user.id === userId)

    if (!userFound) {
        return res.status(404).json({
            message: `User with id ${id} not found.`
        })
    }

    res.status(200).json(userFound)
})


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
