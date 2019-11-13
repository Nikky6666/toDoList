import React from 'react';
import './App.css';
import ToDoListHeader from './ToDoListHeader';
import ToDoListFooter from './ToDoListFooter';
import ToDoListTasks from './ToDoListTasks';
// классовая компонента - объект, у которого есть свой локальный стейт и метод сетстейт
class App extends React.Component {
    constructor(props) {
        super(props);
        this.newTaskTitleRef = React.createRef();
        /*  setTimeout(() => {
              let newTask = {title: "React", isDone: false, priority: "hight"};
              let newTasks = [...this.state.tasks, newTask];
              this.setState ({
                  tasks: newTasks
              });
          }, 2000)*/
    };

    state = {
        tasks: [
            {title: "CSS", isDone: true, priority: "medium"},
            {title: "HTML", isDone: true, priority: "low"},
            {title: "JS", isDone: true, priority: "high"},
            {title: "ReactJS", isDone: false, priority: "hight"}
        ],

        filterValue: "Completed",
    };

    onAddTaskClick = () => {
        let newTask = {
            title: this.newTaskTitleRef.current.value,
            isDone: false,
            priority: "hight"
        };
        let newTasks = [...this.state.tasks, newTask];
        this.setState({
            tasks: newTasks
        });
        this.newTaskTitleRef.current.value = "";
    }

    render = () => {
        return (
            <div className="App">
                <div className="todoList">

                    <div className="todoList-header">
                        <h3 className="todoList-header__title">What to Learn</h3>
                        <div className="todoList-newTaskForm">
                            <input ref={this.newTaskTitleRef} type="text" placeholder="New task name"/>
                            <button onClick={this.onAddTaskClick}>Add</button>
                        </div>
                    </div>

                    {/*<ToDoListHeader/>*/}
                    <ToDoListTasks tasks={this.state.tasks}/>
                    <ToDoListFooter filterValue={this.state.filterValue}/>

                </div>
            </div>
        );
    }
}

export default App;

