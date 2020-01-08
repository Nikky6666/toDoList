const ADD_TODOLIST = "TodoList/reduser/ADD_TODOLIST";
const ADD_TASK = "TodoList/reduser/ADD_TASK";
const CHANGE_TASK = "TodoList/reduser/CHANGE_TASK";
const DELETE_TODOLIST = "TodoList/reduser/DELETE_TODOLIST";
const DELETE_TASK = "TodoList/reduser/DELETE_TASK";

const initialState = {
    nextTaskId: 3,
    todolists: [
        {id: 0, title: "What to learn",
            tasks: [
                {id: 0, isDone: false, priority: "hight", title: "React"},
                {id: 1, title: "HTML", isDone: false, priority: "hight"},
                {id: 2, title: "CSS", isDone: false, priority: "hight"},
                {id: 3, title: "JS", isDone: false, priority: "hight"}
            ]},
        {id: 1, title: "Shop",
            tasks: [
                {id: 0, title: "milk", isDone: false, priority: "hight"},
                {id: 1, title: "cheese", isDone: false, priority: "hight"}
            ]},
        {id: 2, title: "hobby",
            tasks: [
                {id: 0, title: "swimming", isDone: false, priority: "hight"},
                {id: 1, title: "reading", isDone: false, priority: "hight"}
            ]}
    ]
};

const reduser = (state = initialState, action) => {
    console.log(action.type);
    switch (action.type) {
        case ADD_TODOLIST:
            debugger;
            return {...state, todolists: [...state.todolists, {title: action.title, id: action.todolistId, tasks: []}]};
        case ADD_TASK:
            return {
                ...state,
                todolists: state.todolists.map((tl) => {
                        if (tl.id === action.todolistId) return {...tl, tasks: [...tl.tasks,
                                                                                        {id: state.nextTaskId++,
                                                                                            isDone:false,
                                                                                            priority: "hight",
                                                                                            title: action.taskTitle
                                                                                        }]};
                        else return tl
                    }
                )
            };
        case CHANGE_TASK: //action = {type: "", taskId, isDone, todolistId}
            return {
                ...state,
                todolists: state.todolists.map(tl => {
                    if (tl.id === action.todolistId) return {
                        ...tl, tasks: tl.tasks.map(t => {
                            if (t.id !== action.taskId) return t;
                            else return {...t, ...action.obj}
                        })
                    };
                    else return tl
                })
            };
        case DELETE_TODOLIST:
            return {
                ...state,
                todolists: state.todolists.filter(tl => tl.id !== action.todolistId)
            };

        case DELETE_TASK:
            return {
                ...state,
                todolists: state.todolists.map(tl => {
                    if (tl.id === action.todolistId) return {
                        ...tl, tasks: tl.tasks.filter(t => t.id!==action.taskId)
                    };
                    else return tl
                })
            };
        default: return state;
    }
};

export const addTodoListAC = (title, todolistId) =>({type: ADD_TODOLIST, title, todolistId});
export const addTaskAC = (taskTitle, todolistId) =>({type: ADD_TASK, taskTitle, todolistId});
export const changeTaskAC = (taskId, obj, todolistId) => ({type: CHANGE_TASK, taskId, obj, todolistId});
export const deleteTodoListAC = (todolistId) => ({type: DELETE_TODOLIST, todolistId});
export const deleteTaskAC = (todolistId, taskId) => ({type: DELETE_TASK, todolistId, taskId});
export default reduser;
