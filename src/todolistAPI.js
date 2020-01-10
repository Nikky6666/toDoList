import axios from 'axios'

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/todo-lists",
    withCredentials: true,
    headers: {"API-KEY": "0a4552fd-fc88-4874-a12b-39f74cc52685"}
});

export const todolistAPI = {
    getTodolists(){
        return  instance.get("");
    },
    createTodolist(title){
        return instance.post("", {title},)
    },
    deleteTodolist(todolistId){
        return instance.delete(`/${todolistId}`)
    },
    updateTodolistTitle(todolistId, title){
        return instance.put(`/${todolistId}`, {title})
    },
    createTask(newTaskTitle, todolistId){
      return   instance.post(`/${todolistId}/tasks`, {title: newTaskTitle})
    },
    updateTask(todolisId, updatedTask){
        return instance.put(`/${todolisId}/tasks/${updatedTask.id}`, updatedTask)
    },
    deleteTask(todolistId, taskId){
        return instance.delete(`/${todolistId}/tasks/${taskId}`)
    },
    getTasks(todolistId){
        return instance.get(`/${todolistId}/tasks`)
    }
};