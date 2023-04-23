const backend_base = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

export async function getTodoItems(authToken, userId, done) {
    const response = await fetch(backend_base + "/todoitems" + "?userId=" + userId + "&done=" + done, {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + authToken
        }
    });
    return await response.json();
}

export async function getAllTodoItems(authToken) {
    const response = await fetch(backend_base + "/todoitems", {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + authToken
        }
    });
    return await response.json();
}

export async function getTodoItem(authToken, todoId) {
    const response = await fetch(backend_base + "/todoitems/" + todoId, {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + authToken,
        }
    });
    return await response.text();
}

// add todo item
export async function addTodoItem(authToken, todo) {
    const response = await fetch(backend_base + "/todoitems/", {
        method: "POST",
        headers: {
            "Authorization": "Bearer " + authToken,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(todo)
    });
    return response.text();
}

// update todo item
export async function updateTodoItem(authToken, todoId, todo) {
    let response = await fetch(backend_base + "/todoitems/" + todoId, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + authToken
        },
        body: JSON.stringify(todo)
    });
    return response.text();
}

// add task category
export async function addCategory(authToken, category) {
    const response = await fetch(backend_base + "/categories/", {
        method: "POST",
        headers: {
            "Authorization": "Bearer " + authToken,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(category)
    });
    return await response.json();
}

// get task categories
export async function getCategories(authToken, userId) {
    const response = await fetch(backend_base + "/categories" + "?userId=" + userId, {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + authToken
        }
    });
    return await response.json();
}