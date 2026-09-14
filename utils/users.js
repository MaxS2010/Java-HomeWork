export const users = []

let nextUserId = 0

export function addUser(name, password) {
    users.push({
        id: nextUserId,
        name: name,
        password: password
    })
    nextUserId++
}

export function createTestUsers(count) {
    for (let index = 0; index < count; index++) {
        addUser(`User${index}`, `password${index}`)
    }
}
