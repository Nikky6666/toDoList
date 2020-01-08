import React from 'react';
import './App.css';
import {connect} from "react-redux";
import { deleteTaskAC} from "./reduser";

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
        this.props.changeTitle(this.props.task.id, e.currentTarget.value)
    };

    onIsDoneChanged = (e) => {
        this.props.changeStatus(this.props.task.id, e.currentTarget.checked);
    };

        render = () => {
            const classForTask = this.props.task.isDone ? "todoList-task done" : "todoList-task";
        return (<div className={classForTask}>
            <input type="checkbox" checked={this.props.task.isDone} onChange={this.onIsDoneChanged} />
                {this.state.editMode ? <input
                                        onBlur={this.deactivateEditMode}
                                        autoFocus={true}
                                        value={this.props.task.title}
                                        onChange={this.onTitleChanged}
                    /> :
                    <span onClick={this.activateEditMode}>{`${this.props.task.id} - ${this.props.task.title}, priority: ${this.props.task.priority}`}</span>
                }
                <button onClick={()=>{this.props.deleteTask(this.props.todolistId, this.props.task.id)}}>X</button>
        </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        deleteTask: (todolistId, taskId) =>{
            dispatch(deleteTaskAC(todolistId, taskId));
        }
    }
}

const ConnectedToDoListTask = connect(null, mapDispatchToProps)(ToDoListTask);

export default ConnectedToDoListTask;

