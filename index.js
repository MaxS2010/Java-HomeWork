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

    if (take === undefined && category === undefined) {
        return res.status(200).json(products)
    }

    let filteredProducts = [...products]

    if (category !== undefined) {
        if (typeof category !== "string" || category.trim() === "") {
            return res.status(400).json({
                message: "Invalid 'category' parameter. It must be a non-empty string."
            })
        }

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

    return res.status(200).json(filteredProducts)
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
