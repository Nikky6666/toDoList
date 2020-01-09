import React from 'react';
import './App.css';
import AddNewItemForm from './AddNewItemForm';
import ToDoListFooter from './ToDoListFooter';
import ToDoListTasks from './ToDoListTasks';
import ToDoListTitle from "./ToDoListTitle";
import {connect} from "react-redux";
import {addTask, deleteTask, setTasks, deleteTodolist, updateTask} from "./reduser";
import axios from "axios";


class ToDoList extends React.Component {

    componentDidMount() {
        this.restoreState();
    }

    restoreState = () =>{
        axios.get(`https://social-network.samuraijs.com/api/1.1/todo-lists/${this.props.id}/tasks`,
            {
                withCredentials: true,
                headers: {"API-KEY": "0a4552fd-fc88-4874-a12b-39f74cc52685"}
            }).then(res=>{
            const allTasks = res.data.items;
            this.props.setTasks(allTasks, this.props.id)
        })
    };

    nextTaskId = 0;
    state = {
        tasks: [],
        filterValue: "All",
    };

    saveState = () => {
        let stateAsString = JSON.stringify(this.state);
        localStorage.setItem("our-state-" + this.props.id, stateAsString);
    };

    __restoreState = () => {
        let state = {
            tasks: [],
            filterValue: "All"
        };
        let stateAsString = localStorage.getItem("our-state-" + this.props.id);
        if (stateAsString != null) {
            state = JSON.parse(stateAsString);
            state.tasks.forEach(t => {
                if (t.id >= this.nextTaskId) this.nextTaskId = t.id + 1
            })
        }
        this.nextTaskId = state.tasks.length;
        this.setState(state);
    };

    addTask = (title) => {
        axios.post(`https://social-network.samuraijs.com/api/1.1/todo-lists/${this.props.id}/tasks`, {title},
            {
                withCredentials: true,
                headers: {"API-KEY": "0a4552fd-fc88-4874-a12b-39f74cc52685"}
            }).then(res=>{
            const task = res.data.data.item;
            this.props.addTask(task, this.props.id);
        })
    };

    changeFilter = (newFilterValue) => {
        this.setState({
            filterValue: newFilterValue
        }, () => {
            this.saveState();
        })
    };

/*    changeStatus = (taskId, newTask) => {
        this.props.changeTask(taskId, newTask, this.props.id);
    };

    changeTitle = (taskId, newTask) => {
        this.props.changeTask(taskId, newTask, this.props.id)
    };*/

    changeTask = (updatedTask) => {
        axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${this.props.id}/tasks/${updatedTask.id}`, updatedTask, {
            withCredentials: true,
            headers: {"API-KEY": "0a4552fd-fc88-4874-a12b-39f74cc52685"}
        }).then(res=>{if(res.data.resultCode===0) this.props.updateTask(updatedTask.id, updatedTask, this.props.id);})
    };

    render = () => {
        let {tasks = []} = this.props;
        const getFiltredTasks = (tasks, filter) => {
            return tasks.filter(t => {
                switch (filter) {
                    case 'All':
                        return true;
                    case 'Completed':
                        return t.isDone;
                    case 'Active':
                        return !t.isDone;
                }
            })
        };

        return (
            <div className="todoList">
                <div className="todoList-header">
                    <ToDoListTitle deleteTodolist={this.props.deleteTodolist} todolistId={this.props.id} title={this.props.title}/>
                    <AddNewItemForm addItem={this.addTask}/>
                </div>
                <ToDoListTasks todolistId={this.props.id} tasks={getFiltredTasks(tasks, this.state.filterValue)}
                               deleteTask={this.props.deleteTask}
                               changeTask={this.changeTask}
                />
                < ToDoListFooter changeFilter={this.changeFilter} filterValue={this.state.filterValue}/>
            </div>
        );
    }
}



const ConnectedToDoList = connect(null, {addTask, updateTask, setTasks, deleteTask, deleteTodolist})(ToDoList);

export default ConnectedToDoList;


