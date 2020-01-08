import React from 'react';
import './App.css';
import {connect} from "react-redux";
import {deleteTodoListAC} from "./reduser";


class ToDoListTitle extends React.Component {



    render = () =><h3 className="todoList-header__title">{this.props.title} - {this.props.todolistId}<button onClick={()=>{this.props.deleteTodolist(this.props.todolistId)}}>X</button></h3>
}

const mapDispatchToProps = (dispatch) => {
    return{
        deleteTodolist: (todolistId) =>{
            dispatch(deleteTodoListAC(todolistId));
        }
    }
};

const ConnectedToDoListTitle = connect(null, mapDispatchToProps)(ToDoListTitle);

export default ConnectedToDoListTitle;

