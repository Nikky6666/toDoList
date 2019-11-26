import React from 'react';
import './App.css';
import ToDoListHeader from './ToDoListHeader';
import ToDoListFooter from './ToDoListFooter';
import ToDoListTasks from './ToDoListTasks';


// классовая компонента - объект, у которого есть свой локальный стейт и
// метод сетстейт
class App extends React.Component {
    constructor(props) {
        super(props);
    };

    state = {
        tasks: [
            {title: "CSS", isDone: true, priority: "medium"},
            {title: "HTML", isDone: true, priority: "low"},
            {title: "JS", isDone: true, priority: "high"},
            {title: "ReactJS", isDone: false, priority: "hight"}
        ],
        filterValue: "All",
    };

    addTask = (newText) => {
        let newTask = {
            title: newText,
            isDone: false,
            priority: "hight"
        };
        let newTasks = [...this.state.tasks, newTask];
        this.setState({
            tasks: newTasks
        });
    };

    changeFilter = (newFilterValue) => {
        this.setState({
            filterValue: newFilterValue
        })
    };

    changeStatus = (task, isDone) =>{
        let newTasks = this.state.tasks.map(
            t => {
                if(t!==task) return t
                else return {...task, isDone}
            }
        )
        this.setState({
            tasks: newTasks
            })
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
            <div className="App">
                <div className="todoList">
                    <ToDoListHeader addTask={this.addTask}/>
                    <ToDoListTasks tasks={getFiltredTasks(this.state.tasks, this.state.filterValue)} changeStatus={this.changeStatus}/>
                    < ToDoListFooter changeFilter={this.changeFilter} filterValue={this.state.filterValue}/>

                </div>
            </div>
        );
    }
}

export default App;


