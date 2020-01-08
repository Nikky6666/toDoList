import React from 'react';
import './App.css';
import AddNewItemForm from './AddNewItemForm';
import ToDoListFooter from './ToDoListFooter';
import ToDoListTasks from './ToDoListTasks';
import ToDoListTitle from "./ToDoListTitle";
import {connect} from "react-redux";
import { addTaskAC, changeTaskAC} from "./reduser";


// классовая компонента - объект, у которого есть свой локальный стейт и
// метод сетстейт
class ToDoList extends React.Component {

    componentDidMount() {
        this.restoreState();
    }

    nextTaskId = 0;
    state = {
        tasks: [],
        filterValue: "All",
    };

    saveState = () => {
        let stateAsString = JSON.stringify(this.state);
        localStorage.setItem("our-state-" + this.props.id, stateAsString);
    };

    restoreState = () => {
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

    addTask = (taskTitle) => {
        this.props.addTask(taskTitle, this.props.id);
    };

    changeFilter = (newFilterValue) => {
        this.setState({
            filterValue: newFilterValue
        }, () => {
            this.saveState();
        })
    };

    changeStatus = (taskId, isDone) => {
        this.props.changeTask(taskId, {isDone}, this.props.id);
    };

    changeTitle = (taskId, title) => {
        this.props.changeTask(taskId, {title}, this.props.id)
    };

    render = () => {
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
                    <ToDoListTitle todolistId={this.props.id} title={this.props.title}/>
                    <AddNewItemForm addItem={this.addTask}/>
                </div>
                <ToDoListTasks todolistId={this.props.id} tasks={getFiltredTasks(this.props.tasks, this.state.filterValue)}
                               changeStatus={this.changeStatus}
                               changeTitle={this.changeTitle}
                />
                < ToDoListFooter changeFilter={this.changeFilter} filterValue={this.state.filterValue}/>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addTask: (taskTitle, todolistId) => {
            dispatch(addTaskAC(taskTitle, todolistId));
        },
        changeTask: (taskId, obj, todolistId) => {
            dispatch(changeTaskAC(taskId, obj, todolistId));
        }
    }
};

const ConnectedToDoList = connect(null, mapDispatchToProps)(ToDoList);

export default ConnectedToDoList;


