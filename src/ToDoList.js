import React from 'react';
import './App.css';
import AddNewItemForm from './AddNewItemForm';
import ToDoListFooter from './ToDoListFooter';
import ToDoListTasks from './ToDoListTasks';
import ToDoListTitle from "./ToDoListTitle";
import {connect} from "react-redux";
import {addTask, deleteTask, deleteTodolist, updateTask, updateTodolistTitle, loadTasks} from "./reduser";

class ToDoList extends React.Component {

    componentDidMount() {
        this.props.loadTasks(this.props.id);
    }

    state = {
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

    onAddTask = (newTitle) => {
        this.props.addTask(this.props.id, newTitle);
    };

    changeFilter = (newFilterValue) => {
        this.setState({
            filterValue: newFilterValue
        }, () => {
            this.saveState();
        })
    };

    changeTask = (updatedTask) => {
       this.props.updateTask(this.props.id, updatedTask)
    };

    deleteTask = (taskId) => {
        this.props.deleteTask(this.props.id, taskId);
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
                    <ToDoListTitle updateTodolistTitle={this.props.updateTodolistTitle} deleteTodolist={this.props.deleteTodolist} todolistId={this.props.id} title={this.props.title}/>
                    <AddNewItemForm addItem={this.onAddTask}/>
                </div>
                <ToDoListTasks todolistId={this.props.id} tasks={getFiltredTasks(tasks, this.state.filterValue)}
                               deleteTask={this.deleteTask}
                               changeTask={this.changeTask}
                />
                < ToDoListFooter changeFilter={this.changeFilter} filterValue={this.state.filterValue}/>
            </div>
        );
    }
}

const ConnectedToDoList = connect(null, {addTask, updateTask, deleteTask, deleteTodolist, updateTodolistTitle, loadTasks})(ToDoList);

export default ConnectedToDoList;


