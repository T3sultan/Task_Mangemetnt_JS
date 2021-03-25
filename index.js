//storageCtrl
//Uictrl
//taskctrl
//appctrl
//storagectrl function to storage part
const StrorageCtrl = (function () {

})();



//taskctrl function to control data related part
const TaskCtrl = (function () {
    let data = {
        tasks: []

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
        taskTitle: '.task-title'
    };

    const hideTaskContainer = function(){
        document.querySelector(selectors.taskContainer).style.display='none';
    }
    const showTaskContainer = function(){
        document.querySelector(selectors.taskContainer).style.display='block';
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
        populateTask(task) {
            showTaskContainer();
            let output = '';
            output += `
            <div class="task-item" id="task-${task.id}">
            <div class="row">
                <div class="col-sm-6">
                    <h5>${task.title}</h5>
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
            if (tasks.length === 0) {
                //hiding task container there is no tasks
                hideTaskContainer();

            } else {
                //showing task container there is tasks
                showTaskContainer();
                let output = '';
                tasks.forEach(task => {
                    output += `
                    <div class="task-item" id="task-${task.id}">
                    <div class="row">
                        <div class="col-sm-6">
                            <h5>${task.title}</h5>
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


        }
    }

})();




//appctrl function to do connection between to different part
const AppCtrl = (function (TaskCtrl, UICtrl, StrorageCtrl) {
    const loadEventListener = function () {
        const selectors = UICtrl.getSelector();

        document.querySelector(selectors.addTask)
            .addEventListener('click', TaskAddSubmit);
        // document.querySelector(selectors.updateTask)
        //     .addEventListener('click', updateTaskSubmit);
        // document.querySelector(selectors.deleteTask)
        //     .addEventListener('click', deleteTaskSubmit);
        // document.querySelector(selectors.backbtn)
        //     .addEventListener('click', backToAddTaskState);
        // document.querySelector(selectors.taskContainer)
        //     .addEventListener('click', completedTask);
        // document.querySelector(UICtrl.getSelector().taskContainer)
        //     .addEventListener('click', editTask);
    };

    function TaskAddSubmit(e) {
        e.preventDefault();
        const taskTitle = UICtrl.getTitleInput();
        if (taskTitle.trim() === '') {
            UICtrl.showAlert('Please provide necessary Information', 'alert alert-warning');

        } else {
            //data storage control TaskCtrl
            const task = TaskCtrl.addTask(taskTitle);
            UICtrl.clearFields();
            UICtrl.populateTask(task);

        }

    }

    return {
        init() {
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