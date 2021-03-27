//storageCtrl
//Uictrl
//taskctrl
//appctrl
//storagectrl function to storage part
const StrorageCtrl = (function () {
    return {
        addTask(task) {
            let tasks;
            if (localStorage.getItem('tasks') === null) {
                tasks = [];
                tasks.push(task);

            } else {
                tasks = JSON.parse(localStorage.getItem('tasks'));
                tasks.push(task);
            }
            localStorage.setItem('tasks', JSON.stringify(tasks))

        },
        getTasks() {
            let tasks;
            if (localStorage.getItem('tasks') === null) {
                tasks = [];

            } else {
                tasks = JSON.parse(localStorage.getItem('tasks'));
            }
            return tasks;
        },
        updatedTask(updatedTask) {
            let tasks = JSON.parse(localStorage.getItem('tasks'));
            const taskAfterUpdates = tasks.filter(task => {
                if (task.id === updatedTask.id) {
                    task.title = updatedTask.title;
                    return task;
                } else {
                    return task;
                }
            })
            localStorage.setItem('tasks', JSON.stringify(taskAfterUpdates))
        },
        deletedTask(taskToDelete) {
            let tasks = JSON.parse(localStorage.getItem('tasks'))
            const taskAfterDeletion = tasks.filter(task => task.id !== taskToDelete.id);
            tasks = taskAfterDeletion;
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }


})();



//taskctrl function to control data related part
const TaskCtrl = (function () {
    let data = {
        tasks: StrorageCtrl.getTasks(),
        currentTask: null

    };
    return {
        getTasks() {
            return data.tasks
        },
        addTask(taskTitle) {
            const id = data.tasks.length > 0 ? data.tasks.length : 0
            const task = {
                id,
                title: taskTitle,
                comleted: false
            };
            const dataWithUpdateTask = {
                ...data,
                tasks: [...data.tasks, task]
            }

            data = dataWithUpdateTask;
            return task;


        },
        completedTask(id) {
            data.tasks = data.tasks.map(task => {
                if (task.id === id) {
                    task.completed = !task.comleted;
                    return task;
                }
                else {
                    return task;
                }
            })
        },
        getTaskById(id) {
            return data.tasks.find(task => task.id === id);

        },
        setCurrentTask(taskToEdit) {
            data.currentTask = taskToEdit

        },
        getCurrentTask() {
            return data.currentTask

        },
        updateItem(taskTitle) {
            let foundTask = null;
            data.tasks = data.tasks.map(task => {
                if (task.id === data.currentTask.id) {
                    task.title = taskTitle;
                    foundTask = task;
                    return task;
                } else {
                    return task;

                }
            });
            return foundTask;
        },
        deleteTask(currentTask) {
            const tasksAfterDeletion = data.tasks.filter(task => task.id !== currentTask.id)
            console.log(tasksAfterDeletion);
            data.tasks = tasksAfterDeletion

        },
        getTotalTaskCount() {
            return data.tasks.length;
        }
    }

})();



//uictrl function to ui related to task
const UICtrl = (function () {
    const selectors = {
        taskContainer: '.task-container',
        addTask: '.add-task',
        updateTask: '.update-task',
        deleteTask: '.delete-task',
        backbtn: '.backbtn',
        taskTitle: '.task-title',
        completedTask: '.completed-tasks',
        totalTask: '.total-tasks'
    };

    const hideTaskContainer = function () {
        document.querySelector(selectors.taskContainer).style.display = 'none';
    }
    const showTaskContainer = function () {
        document.querySelector(selectors.taskContainer).style.display = 'block';
    }

    return {
        getSelector() {
            return selectors;
        },
        showEditState() {
            document.querySelector(selectors.addTask).style.display = 'none',
                document.querySelector(selectors.updateTask).style.display = 'block',
                document.querySelector(selectors.deleteTask).style.display = 'block',
                document.querySelector(selectors.backbtn).style.display = 'block'

        },
        clearEditState() {
            document.querySelector(selectors.addTask).style.display = 'block',
                document.querySelector(selectors.updateTask).style.display = 'none',
                document.querySelector(selectors.deleteTask).style.display = 'none',
                document.querySelector(selectors.backbtn).style.display = 'none'


        },
        getTitleInput() {
            return document.querySelector(selectors.taskTitle).value;

        },
        showAlert(msg, className) {
            console.log(msg, className)


        },
        clearFields() {
            document.querySelector(selectors.taskTitle).value = '';

        },
        populateForm(taskTitle) {
            document.querySelector(selectors.taskTitle).value = taskTitle;

        },
        populateTask(task) {
            const { id, title } = task;
            showTaskContainer();
            let output = '';
            output += `
            <div class="task-item" id="task-${id}">
            <div class="row">
                <div class="col-sm-6">
                    </h5>${title}</h5>
                </div>
                <div class="col-sm-6">
                    <a href="#" class="completed-task float-right">
                        <i class="fas fa-check"></i>
                    </a>
                    <a href="#" class="edit-task float-right mr-2">
                        <i class="fas fa-pencil-alt"></i>
                    </a>

                </div>

            </div>

        </div>

            
            `;
            document.querySelector(selectors.taskContainer).insertAdjacentHTML('beforeend', output);

        },

        populateTasks(tasks) {
            //  const {id,title,completed} = tasks
            if (tasks.length === 0) {
                //hiding task container there is no tasks
                hideTaskContainer();

            } else {
                //showing task container there is tasks
                showTaskContainer();
                let output = '';
                tasks.forEach(({ id, title, completed }) => {
                    output += `
                    <div class="task-item" id="task-${id}">
                    <div class="row">
                        <div class="col-sm-6">
                            <h5  class =${completed === true ? 'completed-task' : ''}>${title}</h5>
                        </div>
                        <div class="col-sm-6">
                            <a href="#" class="completed-task float-right">
                                <i class="fas fa-check"></i>
                            </a>
                            <a href="#" class="edit-task float-right mr-2">
                                <i class="fas fa-pencil-alt"></i>
                            </a>
    
                        </div>
    
                    </div>
    
                </div>
    
                    `;
                });
                document.querySelector(selectors.taskContainer).innerHTML = output;

            }


        },
        showTotalTaskCount(totalTasks) {
            document.querySelector(selectors.totalTask).textContent = totalTasks;

        }
    }

})();




//appctrl function to do connection between to different part
const AppCtrl = (function (TaskCtrl, UICtrl, StrorageCtrl) {
    const loadEventListener = function () {
        const selectors = UICtrl.getSelector();

        document.querySelector(selectors.addTask)
            .addEventListener('click', TaskAddSubmit);
        document.querySelector(selectors.updateTask)
            .addEventListener('click', updateTaskSubmit);
        document.querySelector(selectors.deleteTask)
            .addEventListener('click', deleteTaskSubmit);
        document.querySelector(selectors.backbtn)
            .addEventListener('click', backToAddTaskState);
        document.querySelector(selectors.taskContainer)
            .addEventListener('click', completedTask);
        document.querySelector(UICtrl.getSelector().taskContainer)
            .addEventListener('click', editTask);
    };

    function TaskAddSubmit(e) {
        e.preventDefault();
        const taskTitle = UICtrl.getTitleInput();
        if (taskTitle.trim() === '') {
            UICtrl.showAlert('Please provide necessary Information', 'alert alert-warning');

        } else {
            //data storage control TaskCtrl
            const task = TaskCtrl.addTask(taskTitle);

            //update to localstorage
            StrorageCtrl.addTask(task);

            UICtrl.clearFields();
            //get total task count
            const totalTasks = TaskCtrl.getTotalTaskCount();
            //update total task count
            UICtrl.showTotalTaskCount(totalTasks)
            UICtrl.populateTask(task);

        }

    }
    function completedTask(e) {
        if (e.target.parentElement.classList.contains('completed-task')) {
            const targetId = e.target.parentElement.parentElement.parentElement.parentElement.id;

            const id = Number(targetId.split('-')[1]);
            //update completed property in data storage
            TaskCtrl.completedTask(id);
            //getting tasks

            const tasks = TaskCtrl.getTasks();
            //update UI
            UICtrl.populateTasks(tasks);
        }

    }
    function editTask(e) {
        if (e.target.parentElement.classList.contains('edit-task')) {
            const targetId = e.target.parentElement.parentElement.parentElement.parentElement.id;
            //console.log(id)
            //show edit task
            UICtrl.showEditState();
            //getting id
            const id = Number(targetId.split('-')[1]);

            const taskToUpdate = TaskCtrl.getTaskById(id);
            // console.log(taskToUpdate)

            //get state in data storage
            TaskCtrl.setCurrentTask(taskToUpdate);


            //populate form in edit task
            UICtrl.populateForm(taskToUpdate.title)
        }
    }
    function updateTaskSubmit(e) {
        e.preventDefault();
        const titleInput = UICtrl.getTitleInput();
        //updating to our data storage
        const updatedTask = TaskCtrl.updateItem(titleInput);
        StrorageCtrl.updatedTask(updatedTask);
        //clear form field
        UICtrl.clearFields();
        //clear edit state
        UICtrl.clearEditState();
        //get  task
        const tasks = TaskCtrl.getTasks();
        //Update UI
        UICtrl.populateTasks(tasks);


    }
    function deleteTaskSubmit(e) {
        //prevent Default action
        e.preventDefault()
        //get editedTask/currentTask
        const currentTask = TaskCtrl.getCurrentTask();
        //deleted form storage
        TaskCtrl.deleteTask(currentTask);
        //delete task from local storage
        StrorageCtrl.deletedTask(currentTask)

        const tasks = TaskCtrl.getTasks()
        UICtrl.populateTasks(tasks)
        //clear form field
        UICtrl.clearFields();
        //clear edit state
        UICtrl.clearEditState()
    }
    function backToAddTaskState(e) {
        e.preventDefault();
        //clear edit state
        UICtrl.clearEditState();
        //clear form
        UICtrl.clearFields();
    }

    return {
        init() {
            //get total task count
            const totalTasks = TaskCtrl.getTotalTaskCount();
            //console.log(totalTasks);
            UICtrl.showTotalTaskCount(totalTasks);

            //getting tasks from data centers

            const task = TaskCtrl.getTasks();
            //populating task in UI
            UICtrl.populateTasks(task);
            //show edit state

            //UICtrl.showEditState()
            //clear edit state
            UICtrl.clearEditState()
            //calling Event listeners
            loadEventListener();


        }
    };


})(TaskCtrl, UICtrl, StrorageCtrl);
AppCtrl.init();