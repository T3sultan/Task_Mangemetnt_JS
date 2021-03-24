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
        tasks: [
            { id: 0, title: 'task 1', comleted: false },
            { id: 1, title: 'task 2', comleted: false },
            { id: 3, title: 'task 3', comleted: false },
            { id: 4, title: 'task 4', comleted: false },
            { id: 5, title: 'task 5', comleted: false },
            { id: 6, title: 'task 6', comleted: false },
            { id: 7, title: 'task 7', comleted: false },
            { id: 8, title: 'task 8', comleted: false },
            { id: 9, title: 'task 9', comleted: false },
            { id: 10, title: 'task 10', comleted: false },
            { id: 11, title: 'task 11', comleted: false },
            { id: 12, title: 'task 12', comleted: false },
        ]

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
            document.querySelector(selectors.taskContainer).insertAdjacentHTML('beforeend',output);

        },

        populateTasks(tasks) {
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