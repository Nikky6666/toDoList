import React from 'react';
import './App.css';
import axios from 'axios'

class ToDoListTitle extends React.Component {
    deleteTodolist = () => {
        axios.delete(`https://social-network.samuraijs.com/api/1.0/todo-lists/${this.props.todolistId}`, {
            withCredentials: true,
            headers: {"API-KEY": "0a4552fd-fc88-4874-a12b-39f74cc52685"}
        }).then(res=> {
            if(res.data.resultCode===0) this.props.deleteTodolist(this.props.todolistId);
        })

    };
    render = () =><h3 className="todoList-header__title">{this.props.title}<button onClick={this.deleteTodolist}>X</button></h3>
}

export default ToDoListTitle;

