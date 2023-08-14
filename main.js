let input = document.querySelector(".input");
let addButton = document.querySelector(".add");
let submit2Button = document.querySelector(".submit2");
let tasksDiv = document.querySelector(".tasks");


//Empty array to store Tasks
let arrayOfTasks = [];

//check if there is tasks in local storage
if(localStorage.getItem("tasks")){
    arrayOfTasks=JSON.parse(localStorage.getItem("tasks"));
}
//Trigger get data from local storage function
getDataFromLocalStorage();


// Add Task
addButton.onclick = function () {
    if (input.value !== "") {
      addTaskToArray(input.value);
      input.value = "";
    }
  };
  
  // Submit2 Button
  submit2Button.onclick = function () {
    // Clear tasks from the container
    tasksDiv.innerHTML = "";
  
    // Clear the array of tasks
    arrayOfTasks = [];
  
    // Remove tasks from local storage
    window.localStorage.removeItem("tasks");
  };
//click on task element 
tasksDiv.addEventListener("click", (e) => {
    //delete button
    if(e.target.classList.contains("del")){
        //remove task from local storage 
        deleteTaskWith(e.target.parentElement.getAttribute("data-id"));

        //remove elemnt from page
        e.target.parentElement.remove();

    }
    //task element 
    if (e.target.classList.contains("task")){
        //toggle completed for the task
        toggleStatusTaskWith(e.target.getAttribute("data-id"));
        //toggele done class 
        e.target.classList.toggle("done");
    }

});


function addTaskToArray(taskText){
    //Task Data
    const task = {
        id : Date.now(), //This creates a unique identifier for each task based on the time the task was added. 
        title : taskText,
        completed : false // This property is initially set to false, indicating that the task is not completed when it is added.
    };
    //push task to array of tasks
    arrayOfTasks.push(task);
    // add tasks (elements)to page
    addElementsToPageFrom(arrayOfTasks);
    //add tasks to local storage
    addDataToLocalStorageFrom(arrayOfTasks);
    //for testing 
    // console.log(arrayOfTasks);
    // console.log(JSON.stringify(arrayOfTasks));

}

function addElementsToPageFrom(arrayOfTasks){//its okay to use same name
    //Empty tasks div
    tasksDiv.innerHTML = "";
    //looping on array of tasks
    arrayOfTasks.forEach((task) => {
    //create main div    
     let div = document.createElement("div");
     div.className = "task";
      //check if task is done
      if(task.completed){
        div.className = "task done"; //done" class is used to style tasks that have been marked as completed.
      }
     div.setAttribute("data-id", task.id);
     div.appendChild(document.createTextNode(task.title));
     //create delete button
     let span = document.createElement("span");
     span.className="del";
     span.appendChild(document.createTextNode("Delete"));
     //append button to main div
     div.appendChild(span);
     //add task div to tasks main tasks div
     tasksDiv.appendChild(div);
    //  console.log(div);
    });

   
}

function addDataToLocalStorageFrom(arrayOfTasks){

    window.localStorage.setItem("tasks",JSON.stringify(arrayOfTasks));
    //It uses JSON.stringify() to convert the array of tasks into a JSON-formatted string before storing it in local storage. This is necessary because local storage can only store string data.
}

function getDataFromLocalStorage(){
    let data = window.localStorage.getItem("tasks");
    //make sure the data is there
    if(data){
        let tasks = JSON.parse(data);
        addElementsToPageFrom(tasks);
    }
    
}

function deleteTaskWith(taskId){
    //for explanation
    // for(let i=0; i < arrayOfTasks.length; i++){
    //     console.log(`${arrayOfTasks[i].id}===${taskId}`);
    // }
    arrayOfTasks = arrayOfTasks.filter((task)=> task.id != taskId);
    //add renew the local storage
    addDataToLocalStorageFrom(arrayOfTasks);
}
 
function toggleStatusTaskWith(taskId) {
      for(let i=0; i < arrayOfTasks.length; i++){
        if(arrayOfTasks[i].id == taskId){
            arrayOfTasks[i].completed == false ? ( arrayOfTasks[i].completed = true): ( arrayOfTasks[i].completed =false)
        }
    }
    addDataToLocalStorageFrom(arrayOfTasks);
}

