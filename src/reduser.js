const ADD_TODOLIST = "TodoList/reduser/ADD_TODOLIST";
const ADD_TASK = "TodoList/reduser/ADD_TASK";
const CHANGE_TASK = "TodoList/reduser/CHANGE_TASK";
const DELETE_TODOLIST = "TodoList/reduser/DELETE_TODOLIST";
const DELETE_TASK = "TodoList/reduser/DELETE_TASK";
const SET_TODOLISTS = "TodoList/reduser/SET_TODOLISTS";
const SET_TASKS = "TodoList/reduser/SET_TASKS";
const UPDATE_TODOLIST_TITLE = "TodoList/reduser/UPDATE_TODOLIST_TITLE";

const initialState = {
    nextTaskId: 3,
    todolists: []
};

const reduser = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TODOLIST:
            return {...state, todolists: [...state.todolists, action.todolist]};
        case ADD_TASK:
            return {
                ...state,
                todolists: state.todolists.map((tl) => {
                        if (tl.id === action.todolistId) return {...tl, tasks: [...tl.tasks, action.task]};
                        else return tl
                    }
                )
            };
        case UPDATE_TODOLIST_TITLE:
            return {
                ...state, todolists: state.todolists.map(tl => {
                    if(tl.id === action.todolistId) return {...tl, title: action.todolistTitle};
                    else return tl
                })
            };
        case CHANGE_TASK: //action = {type: "", taskId, isDone, todolistId}
            debugger;
            return {
                ...state,
                todolists: state.todolists.map(tl => {
                    if (tl.id === action.todolistId) return {
                        ...tl, tasks: tl.tasks.map(t => {
                            if (t.id !== action.taskId) return t;
                            else return action.newTask
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
        case SET_TODOLISTS:
            return {
                ...state,
                todolists: action.todolists.map(tl => ({...tl, tasks: []}))
            };
        case SET_TASKS:
            return {
                ...state,
                todolists: [...state.todolists.map(tl => {
                    if(tl.id === action.todolistId) return {...tl, tasks: action.tasks};
                    else return tl;
                })
                ]
            };
        default: return state;
    }
};

export const addTodolist = (todolist) =>({type: ADD_TODOLIST, todolist});
export const addTask = (task, todolistId) =>({type: ADD_TASK, task, todolistId});
export const updateTask = (taskId, newTask, todolistId) => ({type: CHANGE_TASK, taskId, newTask, todolistId});
export const deleteTodolist = (todolistId) => ({type: DELETE_TODOLIST, todolistId});
export const deleteTask = (todolistId, taskId) => ({type: DELETE_TASK, todolistId, taskId});
export const setTodolists = (todolists) => ({type: SET_TODOLISTS, todolists});
export const setTasks = (tasks, todolistId) => ({type: SET_TASKS, tasks, todolistId});
export const updateTodolistTitle = (todolistId, todolistTitle) => ({type: UPDATE_TODOLIST_TITLE, todolistId, todolistTitle});
export default reduser;
