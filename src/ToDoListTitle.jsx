import React from 'react';
import './App.css';


class ToDoListTitle extends React.Component {

    render = () => <h3 className="todoList-header__title">{this.props.title}</h3>
}

export default ToDoListTitle;

