// Import functions from api-client.
import { url, getToDoItems, postToDoItems, updateToDoItem, deleteToDoItem } from './api-client.js'
const log = console.log;

// Set eventlistener to "Add Task" button
const addTaskButton = document.getElementById("add_task");
addTaskButton.addEventListener("click", element => {
    // Get task description
    const descriptionText = document.getElementById("task_description");
    // Build data to sent
    let data = {};
    data.description = descriptionText.value;
    data.done = false;
    // Update screen
    addTaskItem(data);
    // Sent data
    postToDoItems(url, data)
        .then(() => {
            // Update screen again now with id settings
            clearTaskList();
            getToDoItems(url)
                .then(data => {
                    data.forEach(element => {
                        addTaskItem(element);
                        descriptionText.value = "";
                    })
                });
        });
}, false);

// Clear task list
const clearTaskList = () => {
    const taskList = document.getElementById("task_list");
    // Remove all items.
    taskList.innerHTML = "";
}

// Delete Task from list
const deleteTaskItem = (target) => {
    target.removeEventListener("click", (element) => { // Remove event listener..
        log(element);
        deleteTaskItem(element.target);
    }, false);

    if (target.hasAttribute("id")) { // check and get id from target
        const id = target.getAttribute("id");
        // Get list with li elements and remove the right one..
        const taskItem = Array.from(document.getElementsByTagName("li")).forEach(element => {
            if (element.getAttribute("id") === id) {
                element.remove();
                deleteToDoItem(url + id);
            }
        });
    }
}

// Check checkboxstatus
const checkCheckboxStatus = (checkboxValue, TaskDescription) => {
    if (checkboxValue) {
        TaskDescription.classList.add("text_striped");
    } else {
        TaskDescription.classList.remove("text_striped");
    }
}

// Change Task Description
const changeTask = (element, checkboxValue, status) => {

    switch (status) {
        case "focus":
            element.focus()
            element.select()
            element.classList.remove("text_striped");
            break;
        case "change":
            let data = {};
            data.description = element.value;
            data.done = checkboxValue;
            element.blur();
            updateToDoItem(url + element.id, data);
        case "blur":
            checkCheckboxStatus(checkboxValue, element);
    }
}

// Add Task to list
const addTaskItem = (data = {}) => {

    const taskList = document.getElementById("task_list"); // get list (ul)
    const newLi = document.createElement("li"); // create list item
    const newDiv = document.createElement("div"); //create new task container
    const newInput = document.createElement("input"); // Create checkbox
    const newTaskDescription = document.createElement("input"); // Create label
    const newButton = document.createElement("button");

    newLi.setAttribute("id", data._id); // Set li attribute

    newDiv.setAttribute("class", "task"); //set new task container class

    newInput.setAttribute("type", "checkbox"); //set input type, id and status
    newInput.setAttribute("id", data._id);
    newInput.checked = data.done;
    newInput.addEventListener("click", (element) => {  // Set event listener to checkbox
        changeTask(newTaskDescription, element.target.checked, "change");
    }, false);

    newTaskDescription.setAttribute("type", "text"); // Set label attributes
    newTaskDescription.setAttribute("id", data._id);
    newTaskDescription.value = data.description; // Set value
    checkCheckboxStatus(newInput.checked, newTaskDescription); // check status of task

    newTaskDescription.addEventListener("click", (element) => { // 4 event listeners on task description field
        changeTask(element.target, newInput.checked, "focus");
    }, false);
    newTaskDescription.addEventListener("change", (element) => {
        changeTask(element.target, newInput.checked, "change");
    }, false);
    newTaskDescription.addEventListener("blur", (element) => {
        changeTask(element.target, newInput.checked, "blur");
    }, false);
    newTaskDescription.addEventListener("keypress", (element) => {
        if (element.key === "Enter") {
            changeTask(element.target, newInput.checked, "change");
        }
    }, false);



    newButton.setAttribute("id", data._id); // Set button attributes
    newButton.setAttribute("class", "fa fa-trash-o");
    newButton.addEventListener("click", (element) => {  // Set eventlistener to button...
        deleteTaskItem(element.target);
    }, false);

    newLi.appendChild(newDiv); // Build task item
    newDiv.appendChild(newInput);
    newDiv.appendChild(newTaskDescription);
    newDiv.appendChild(newButton);

    taskList.appendChild(newLi); // Set task item in list

}

// Initiate site 
clearTaskList();
getToDoItems(url)
    .then(data => {
        data.forEach(element => {
            addTaskItem(element);
        })
    });