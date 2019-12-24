import React from 'react';
import './App.css';
import AddNewItemForm from './AddNewItemForm';
import ToDoListFooter from './ToDoListFooter';
import ToDoListTasks from './ToDoListTasks';
import ToDoListTitle from "./ToDoListTitle";


// классовая компонента - объект, у которого есть свой локальный стейт и
// метод сетстейт
class ToDoList extends React.Component {

    componentDidMount() {
        this.restoreState();
    }

    nextTaskId=0;
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
        if(stateAsString != null) {
            state = JSON.parse(stateAsString);
            state.tasks.forEach(t => {if(t.id>=this.nextTaskId) this.nextTaskId=t.id+1})
        }
        this.nextTaskId = state.tasks.length;
        this.setState(state);
    };

    addTask = (newText) => {
        let newTask = {
            id: this.nextTaskId++,
            title: newText,
            isDone: false,
            priority: "hight"
        };
        let newTasks = [...this.state.tasks, newTask];
        this.setState({
            tasks: newTasks
        }, () => { this.saveState(); });

    };

    changeFilter = (newFilterValue) => {
        this.setState({
            filterValue: newFilterValue
        }, () => { this.saveState(); })
    };

    changeStatus = (taskId, isDone) =>{
        this.changeTask(taskId, {isDone});
    };

    changeTitle = (taskId, title) =>{
        this.changeTask(taskId, {title})
    };

    changeTask = (taskId, obj) => {
        let newTasks = this.state.tasks.map(
            t=> {
                if(t.id!==taskId) return t
                else return {...t, ...obj}
            }
        );
        this.setState({
            tasks: newTasks
        }, () => { this.saveState(); })
};

    render = () => {
        const getFiltredTasks = (tasks, filter) => {
            return tasks.filter(t => {
                switch (filter) {
                    case 'All': return true;
                    case 'Completed': return t.isDone;
                    case 'Active':return !t.isDone;
                }
            })
        };

        return (
                <div className="todoList">
                    <div className="todoList-header">
                    <ToDoListTitle title={this.props.title}/>
                    <AddNewItemForm addItem={this.addTask}/>
                    </div>
                    <ToDoListTasks tasks={getFiltredTasks(this.state.tasks, this.state.filterValue)}
                                   changeStatus={this.changeStatus}
                                   changeTitle={this.changeTitle}
                    />
                    < ToDoListFooter changeFilter={this.changeFilter} filterValue={this.state.filterValue}/>
            </div>
        );
    }
}

export default ToDoList;


