import express from 'express'
import {users, createTestUsers} from './utils/users.js'

createTestUsers(2)

const app = express()
app.use(express.json())

const HOST = "localhost"
const PORT = 8000

async function createUser(user) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (typeof user.name !== "string" || typeof user.password !== "string") {
                reject(new Error("User must have a name and password"))
                
            } else {
                
                let list_users = [...users, user]
                list_users.push(user)
                resolve(user)
            }
        }, 500)
    })
}

app.post('/register', async (req, res) => {
    const {name, password} = req.body

    if (typeof user.name !== "string" || typeof user.password !== "string") {
        reject(new Error("User must have a name and password"))

        await createUser({id: users.length + 1, name, password})
        password =  "*".repeat(password.length);
        res.status(201).json({message: "User created successfully", user: {id: users.length + 1, name, password}})
    }
})

app.get("/users", (req, res) => {
    const {take} = req.query

    if (take === undefined) {
        return res.status(200).json(users)
    }

    const takeInt = Number(take)

    if (!Number.isInteger(takeInt) || takeInt < 0) {
        return res.status(400).json({
            message: "Invalid 'take' parameter. It must be a non-negative integer."
        })
    }
    const slicedUsers = users.slice(0, takeInt)

    return res.status(200).json(slicedUsers)
})

app.listen(HOST, PORT, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`)
})
