// API adress
export const url = 'http://localhost:3000/';

// GET ITEM(S)
export const getToDoItems = async (url = '') => {
    try {
        const toDoItemsList = await fetch(url, {
            headers: {
                'content-type': 'application/json'
            }
        });
        return await toDoItemsList.json();
    } catch (err) {
        alert("Error when getting data from todo list database: " + err);
    }
}

// TESTCODE FOR getToDoItems()
// getToDoItems(url)
//     .then(data => {
//         data.forEach(element => {
//             addTaskItem(element);
//             //setTaskId(element);
//         })
//     });

// POST ITEM(S)
export const postToDoItems = async (url = '', data = {}) => {
    try {
        const addItemsToList = await fetch(url, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "content-type": "application/json",
            },
        });
    } catch (err) {
        alert("Error when posting data to todo list database: " + err);
    }
}

// TESTCODE FOR postToDoItems()
// postToDoItems(url, { "description": "buy milk", "done": false })
//     .then(response => console.log(response))
//     .catch(err => console.log(err));

// PUT (update) ITEMS
export const updateToDoItem = async (url = '', data = {}) => {
    try {
        const updateItemInList = await fetch(url, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                "content-type": "application/json",
            },
        });
    } catch (err) {
        alert("Error when updating a todo item in database: " + err);
    }
}

// DELETE ITEMS
export const deleteToDoItem = async (url = '') => {
    try {
        const deleteItemInList = await fetch(url, {
            method: "DELETE",
        });
    } catch (err) {
        alert("Error when deleting a todo item in database: " + err);
    }
}