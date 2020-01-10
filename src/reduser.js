import {todolistAPI} from "./todolistAPI";

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

export const loadTasks = (todolistId) => (dispatch) => {
    todolistAPI.getTasks(todolistId).then(res=>{
        const allTasks = res.data.items;
        dispatch(setTasks(allTasks, todolistId));
    })
};

export const addTask = (todolistId, title) => (dispatch) => {
    todolistAPI.createTask(title, todolistId).then(res =>{
        const newTask = res.data.data.item;
        dispatch(createTaskSuccess(newTask,todolistId))
    })
};

export const updateTask = (todolistId, newTask) => (dispatch, getState) =>{
    getState().todolists.find(tl=>tl.id===todolistId)
        .tasks.forEach((t=>{
            if(t.id === newTask.id) {
                todolistAPI.updateTask(todolistId,newTask).then(res=>{
                    if(res.data.resultCode===0) dispatch(updateTaskSuccess(newTask.id, newTask, todolistId))
                })
            }
    }))
};

export const addTodolist = (title) => (dispatch) =>{
    todolistAPI.createTodolist(title).then(res=>{
        const newTodolist = res.data.data.item;
        dispatch(createTodolistSuccess(newTodolist));
    })
};

export const setTodolists = () => (dispatch) => {
    todolistAPI.getTodolists().then(res=>{
        dispatch(getTodolistsSuccess(res.data));
    })
};

export const deleteTodolist = (todolistId) => (dispatch, getState) => {
    if (getState().todolists.find(tl => tl.id === todolistId)) {
        todolistAPI.deleteTodolist(todolistId).then(res => {
            if (res.data.resultCode === 0) dispatch(deleteTodolistSuccess(todolistId));
        })
    }
};

export const deleteTask = (todolistId, taskId) => (dispatch) => {
    todolistAPI.deleteTask(todolistId, taskId).then(res => {
        if(res.data.resultCode===0) dispatch(deleteTaskSuccess(todolistId, taskId))
    })
};

export const updateTodolistTitle = (todolistId, todolistTitle) => (dispatch, getState) =>{
    if(getState().todolists.find(tl=>tl.id===todolistId)){
        todolistAPI.updateTodolistTitle(dispatch(updateTodolistTitleSuccess(todolistId, todolistTitle)))
    }
};


const createTodolistSuccess = (todolist) =>({type: ADD_TODOLIST, todolist});
const createTaskSuccess = (task, todolistId) =>({type: ADD_TASK, task, todolistId});
const updateTaskSuccess = (taskId, newTask, todolistId) => ({type: CHANGE_TASK, taskId, newTask, todolistId});
const deleteTodolistSuccess = (todolistId) => ({type: DELETE_TODOLIST, todolistId});
const deleteTaskSuccess = (todolistId, taskId) => ({type: DELETE_TASK, todolistId, taskId});
const getTodolistsSuccess = (todolists) => ({type: SET_TODOLISTS, todolists});
const setTasks = (tasks, todolistId) => ({type: SET_TASKS, tasks, todolistId});
export const updateTodolistTitleSuccess = (todolistId, todolistTitle) => ({type: UPDATE_TODOLIST_TITLE, todolistId, todolistTitle});

export default reduser;
