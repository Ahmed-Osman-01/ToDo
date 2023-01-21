let input = document.querySelector(".input")
let add = document.querySelector(".add")
let tasksArea = document.querySelector(".tasks")

let tasksList = [];

window.onload = function(){
    if(localStorage.getItem("tasks")){
       
        tasksList = JSON.parse(localStorage.getItem("tasks"))
        createTasks(tasksList)
    }
}


// we have to create the task first before adding it then
// add the new task to the task list when clicking the add button
add.onclick = function () {
    if(validation(input.value)){
        let task = {
            id: Date.now(),
            content: input.value,
            completed: false
        }
        tasksList.unshift(task)
        // tasksList.push(task)
        createTasks(tasksList)
        saveToStorage(tasksList)   
    }
    input.value = ""
}
// checks if the input text is valid or not
function validation (text){
    if(text !=="" && text.trim()){
        return true
    } else {
        return false
    }
}

// add click events to delete and toggle the complete value
tasksArea.addEventListener('click', function(e){
    if(e.target.classList.contains("delBtn")){
        e.target.parentElement.remove()
        removeFromList(e.target.parentElement.getAttribute("data-id"))
    }
    if(e.target.classList.contains("task")){
        e.target.classList.toggle("done") 
        toggleCompleted(e.target.getAttribute("data-id"))
    }
})

// this function loops through all the task list and add them to the tasks area
function createTasks(tasksList) {
    tasksArea.innerHTML = ""
    for (const task of tasksList) {
        // creating the main task
        let mainDiv = document.createElement("div")
        mainDiv.className = "task"
        mainDiv.setAttribute("data-id", task.id)
        if(task.completed){
            mainDiv.classList.add("done")
        }
        mainDiv.appendChild(document.createTextNode(task.content))

        // adding the time of adding the task
        let time = document.createElement("span")
        time.className = "time"
        let date = new Date(task.id)
        time.appendChild(document.createTextNode(date.toLocaleString()))
        mainDiv.appendChild(time)
        task.date = date;

        // creating the delete button
        let delBtn = document.createElement("button")
        delBtn.className = "delBtn"
        delBtn.appendChild(document.createTextNode("Delete"))
        mainDiv.appendChild(delBtn)
        tasksArea.append(mainDiv)   
    }
    
}

// update the local storage
function saveToStorage(tasksList){
    localStorage.setItem("tasks" ,JSON.stringify(tasksList))
}

// remove the task of the clicked button only by filtering the list and returning
// all the elements except the element we removed using filter then updating the storage
function removeFromList(taskId){
    
    tasksList = tasksList.filter(task => task.id != taskId)
    
    saveToStorage(tasksList)
}

// toggle the completed value in the clicked task only and update the storage
function toggleCompleted(taskId){
    for (const task of tasksList) {
        if(task.id == taskId){
            task.completed ? task.completed = false : task.completed = true;
        }
    }
    saveToStorage(tasksList)
}

let delAll = document.querySelector(".delete-all")
delAll.onclick = function() {
    tasksArea.innerHTML = ""
    tasksList = []
    localStorage.clear()
}
