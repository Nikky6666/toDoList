import React from 'react';
import './App.css';
import {api} from "./api";

class ToDoListTitle extends React.Component {
    deleteTodolist = () => {
        api.deleteTodolist(this.props.todolistId).then(res=> {
            if(res.data.resultCode===0) this.props.deleteTodolist(this.props.todolistId);
        })

    };
    render = () =><h3 className="todoList-header__title">{this.props.title}<button onClick={this.deleteTodolist}>X</button></h3>
}

export default ToDoListTitle;

