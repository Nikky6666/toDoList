import React from 'react';
import './App.css';

class ToDoListTitle extends React.Component {
    state = {
        editMode: false,
        title: this.props.title
    };
    deactivateEditMode = () => {
        this.setState({
            editMode: false
        });
        this.props.updateTodolistTitle(this.props.todolistId, this.state.title);
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
        this.props.deleteTodolist(this.props.todolistId);
    };
    render = () =><div>
        {this.state.editMode? <input onBlur={this.deactivateEditMode} autoFocus={true} value={this.state.title} onChange={this.onTitleChanged}/>:
        <h3 onDoubleClick={this.activateEditMode} className="todoList-header__title">{this.props.title}<button onClick={this.deleteTodolist}>X</button></h3>}
    </div>
}

export default ToDoListTitle;

