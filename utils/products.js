export const products = []

let nextProductId = 0

export function addProduct(newProduct) {
    return new Promise((resolve, reject) => {
        if (newProduct.fail) {
            reject(new Error("Product could not be saved."))
            return
        }

        const product = {
            id: nextProductId,
            name: newProduct.name,
            price: newProduct.price,
            category: newProduct.category,
            image: newProduct.image ?? ""
        }

        products.push(product)
        nextProductId++
        resolve(product)
    })
}

export function createTestProducts() {
    addProduct({name: "Laptop", price: 1200, category: "electronics"})
    addProduct({name: "Headphones", price: 150, category: "electronics"})
    addProduct({name: "Desk", price: 300, category: "furniture"})
    addProduct({name: "Chair", price: 180, category: "furniture"})
    addProduct({name: "Notebook", price: 8, category: "stationery"})
}
