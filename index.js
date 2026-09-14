import express from 'express'
import {products, createTestProducts} from './utils/products.js'
import {users, createTestUsers} from './utils/users.js'

const app = express()

const HOST = "localhost"
const PORT = 8000

createTestProducts()
createTestUsers(10)

// ------------- Products ---------------

app.get("/products", (req, res) => {
    const {take, category} = req.query
    let filteredProducts = products

    if (category) {
        filteredProducts = filteredProducts.filter(product => product.category === category)
    }

    if (take !== undefined) {
        const takeInt = Number(take)

        if (!Number.isInteger(takeInt) || takeInt < 0) {
            return res.status(400).json({
                message: "Invalid 'take' parameter. It must be a non-negative integer."
            })
        }

        filteredProducts = filteredProducts.slice(0, takeInt)
    }

    res.status(200).json(filteredProducts)
})

app.get("/products/:id", (req, res) => {
    const productId = Number(req.params.id)

    if (!Number.isInteger(productId) || productId < 0) {
        return res.status(400).json({
            message: "Invalid 'id' parameter. It must be a non-negative integer."
        })
    }

    const productFound = products.find(product => product.id === productId)

    if (!productFound) {
        return res.status(404).json({
            message: `Product with id ${req.params.id} not found.`
        })
    }

    res.status(200).json(productFound)
})

// ------------- User ---------------

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

// ------------- Info ---------------

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
