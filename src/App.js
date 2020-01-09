import React from 'react';
import './App.css';
import ToDoList from "./ToDoList";
import AddNewItemForm from "./AddNewItemForm";
import {connect} from "react-redux";
import {addTodolist, setTodolists} from "./reduser";
import axios from 'axios'

class App extends React.Component {

    state = {
        todolists: []
    };

    componentDidMount() {
        this.restoreState();
    }

    restoreState = () =>{
        axios.get("https://social-network.samuraijs.com/api/1.0/todo-lists", {withCredentials: true})
            .then(res => {
                this.props.setTodolists(res.data)});
    };

    __restoreState = () => {
        let state = {
            todolists: []
        };
        let stateAsString = localStorage.getItem("todolists-state");
        if (stateAsString != null) {
            state = JSON.parse(stateAsString);
            state.todolists.forEach(tl => {
                if (tl.id >= this.nextTodoListId) this.nextTodoListId = tl.id + 1
            });
            this.setState(state);
        }
    };

    saveState = () => {
        let stateAsString = JSON.stringify(this.state);
        localStorage.setItem("todolists-state", stateAsString);
    };

    nextTodoListId = 4;

    addTodoList = (title) => {
        axios.post("https://social-network.samuraijs.com/api/1.0/todo-lists", {title},
            {
                withCredentials: true,
                headers: {"API-KEY": "0a4552fd-fc88-4874-a12b-39f74cc52685"}
            }).then(res=>{
                const todolist = res.data.data.item;
                debugger;
                this.props.addTodolist(todolist);
        })
     /*   this.props.addTodolist(title, this.nextTodoListId++);*/
    };

    render = () => {
        const todolists = this.props
            .todolists
            .map(td => <ToDoList key={td.id} id={td.id} title={td.title} tasks={td.tasks}/>);
        return (
            <>
                <div>
                    <AddNewItemForm addItem={this.addTodoList}/>
                </div>
                <div className="App">
                    {todolists}
                </div>
            </>)
    };
}

const mapStateToProps = (state) => {
    return {
        todolists: state.todolists
    }
};



const ConnectedApp = connect(mapStateToProps, {addTodolist, setTodolists})(App);

export default ConnectedApp;


