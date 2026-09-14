export const products = []

let nextProductId = 0

export function addProduct(name, price, category) {
    products.push({
        id: nextProductId,
        name: name,
        price: price,
        category: category
    })
    nextProductId++
}

export function createTestProducts() {
    addProduct("Laptop", 1200, "electronics")
    addProduct("Headphones", 150, "electronics")
    addProduct("Desk", 300, "furniture")
    addProduct("Chair", 180, "furniture")
    addProduct("Notebook", 8, "stationery")
}
