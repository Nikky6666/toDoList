import React from 'react';
import './App.css';
import {api} from "./api";

class ToDoListTitle extends React.Component {
    state = {
        editMode: false,
        title: this.props.title
    };
    deactivateEditMode = () => {
        this.setState({
            editMode: false
        });
        api.updateTodolistTitle(this.props.todolistId, this.state.title).then(res => {
            if(res.data.resultCode===0) this.props.updateTodolistTitle(this.props.todolistId, this.state.title);
        })
    };
    activateEditMode = () =>{
        this.setState({
            editMode: true
        })
    };
    onTitleChanged = (e) =>{
        this.setState({
            title: e.currentTarget.value,
        })
    };
    deleteTodolist = () => {
        api.deleteTodolist(this.props.todolistId).then(res=> {
            if(res.data.resultCode===0) this.props.deleteTodolist(this.props.todolistId);
        })

    };
    render = () =><div>
        {this.state.editMode? <input onBlur={this.deactivateEditMode} autoFocus={true} value={this.state.title} onChange={this.onTitleChanged}/>:
        <h3 onDoubleClick={this.activateEditMode} className="todoList-header__title">{this.props.title}<button onClick={this.deleteTodolist}>X</button></h3>}
    </div>
}

export default ToDoListTitle;

