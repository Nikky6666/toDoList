import React from 'react';
import './App.css';
import ToDoList from "./ToDoList";
import AddNewItemForm from "./AddNewItemForm";

class App extends React.Component {

    state = {
        todolists: []
    };

    componentDidMount() {
        this.restoreState();
    }

    restoreState = () => {
        let state = {
            todolists: []
        };
        let stateAsString = localStorage.getItem("todolists-state");
        if(stateAsString != null) {
            state = JSON.parse(stateAsString);
            state.todolists.forEach(tl => {if(tl.id>=this.nextTodoListId) this.nextTodoListId=tl.id+1});
        this.setState(state);}
    };

    saveState = () => {
        let stateAsString = JSON.stringify(this.state);
        localStorage.setItem("todolists-state", stateAsString);
    };

    nextTodoListId =0;


    addTodoList = (title) =>{
        const newTodoList = {id: this.nextTodoListId++, title};
        this.setState({
            todolists: [...this.state.todolists, newTodoList]
        }, () => {this.saveState()})
    };

    render = () => {
        const todolists = this.state.todolists.map(td => <ToDoList id={td.id} title={td.title}/>);
        return (
            <>
                <div>
                   <AddNewItemForm addItem={this.addTodoList} />
                </div>
                    <div className="App">
                    {todolists}
                </div>
            </>)
    };
}

export default App;


