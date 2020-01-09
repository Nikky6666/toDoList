import React from 'react';
import './App.css';
import axios from 'axios'

class ToDoListTask extends React.Component {

    state = {
        editMode: false,
    };

    activateEditMode = () => {
        this.setState({
            editMode: true
        })
    };

    deactivateEditMode= () => {
        this.setState({
            editMode: false
        })
    };

    onTitleChanged = (e) =>{
        const updatedTask = {...this.props.task, title: e.currentTarget.value};
        this.props.changeTask(updatedTask)
    };

    onIsDoneChanged = (e) => {
        let status = e.currentTarget.checked ? 2 : 0;
        const updatedTask = {...this.props.task, status};
        this.props.changeTask(updatedTask);
    };

    deleteTask = () => {
        axios.delete(`https://social-network.samuraijs.com/api/1.0/todo-lists/tasks/${this.props.task.id}`, {
            withCredentials: true,
            headers: {"API-KEY": "0a4552fd-fc88-4874-a12b-39f74cc52685"}
        })
            .then(res=>{
                if(res.data.resultCode===0) this.props.deleteTask(this.props.todolistId, this.props.task.id)
            })

    };

        render = () => {
            const classForTask = this.props.task.status===2 ? "todoList-task done" : "todoList-task";
            let priority;
            switch (this.props.task.priority) {
                case 0: priority = "low";
                case 1: priority = "middle";
                case 2: priority = "hi";
                case 3: priority = "urgently";
                case 4: priority = "later";
                default: priority="low";
            }
        return (<div className={classForTask}>
            <input type="checkbox" checked={this.props.task.status===2} onChange={this.onIsDoneChanged} />
                {this.state.editMode ? <input
                                        onBlur={this.deactivateEditMode}
                                        autoFocus={true}
                                        value={this.props.task.title}
                                        onChange={this.onTitleChanged}
                    /> :
                    <span onClick={this.activateEditMode}>{this.props.task.title}, priority: {priority}</span>
                }
                <button onClick={this.deleteTask}>X</button>
        </div>
        );
    }
}


export default ToDoListTask;

