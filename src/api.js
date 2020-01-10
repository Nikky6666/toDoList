import axios from 'axios'

export const api = {
    getTodolists(){
        return  axios.get("https://social-network.samuraijs.com/api/1.0/todo-lists", {withCredentials: true});
    },
    createTodolist(title){
        return axios.post("https://social-network.samuraijs.com/api/1.0/todo-lists", {title},
            {
                withCredentials: true,
                headers: {"API-KEY": "0a4552fd-fc88-4874-a12b-39f74cc52685"}
            })
    },
    deleteTodolist(todolistId){
        return axios.delete(`https://social-network.samuraijs.com/api/1.0/todo-lists/${todolistId}`, {
            withCredentials: true,
            headers: {"API-KEY": "0a4552fd-fc88-4874-a12b-39f74cc52685"}
        })
    },
    createTask(newTaskTitle, todolistId){
      return   axios.post(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks`, {title: newTaskTitle},
            {
                withCredentials: true,
                headers: {"API-KEY": "0a4552fd-fc88-4874-a12b-39f74cc52685"}
            })
    },
    updateTask(todolisId, updatedTask){
        return axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolisId}/tasks/${updatedTask.id}`, updatedTask, {
            withCredentials: true,
            headers: {"API-KEY": "0a4552fd-fc88-4874-a12b-39f74cc52685"}
        })
    },
    deleteTask(taskId){
        return axios.delete(`https://social-network.samuraijs.com/api/1.0/todo-lists/tasks/${taskId}`, {
            withCredentials: true,
            headers: {"API-KEY": "0a4552fd-fc88-4874-a12b-39f74cc52685"}
        })
    },
    getTasks(todolistId){
        return axios.get(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks`,
            {
                withCredentials: true,
                headers: {"API-KEY": "0a4552fd-fc88-4874-a12b-39f74cc52685"}
            })
    }
};