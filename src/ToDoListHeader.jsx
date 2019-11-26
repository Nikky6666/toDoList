import React from 'react';
import './App.css';


class ToDoListHeader extends React.Component {

    state = {
        error: false,
        title: "",
    };

    chekOnSpaceOnly = (title) => {
        for(let i=0;i<title.length; i++) if(title[i]!==" ") return false;
        return true;
    };

    onAddTaskClick = () => {
        let newTitle = this.state.title;
        if (newTitle === "" || this.chekOnSpaceOnly(newTitle)) {
            this.setState({error: true});
        } else {
            this.props.addTask(newTitle);
            this.setState({
                error: false,
                title: ""
            });
        }
    };

        onChangeInput = (e) => {
            this.setState({
                title: e.currentTarget.value
            })
           e.currentTarget.value==="" ? this.setState({error: true}) : this.setState({error:false});
        };

        onKeyPress = (e) => {
            if(e.key==='Enter') this.onAddTaskClick()
        };

    render = () => {
        const classForInput = this.state.error ? "error": "";
        return (
            <div className="todoList-header">
                <h3 className="todoList-header__title">What to Learn</h3>
                <div className="todoList-newTaskForm">
                    <input onKeyPress={this.onKeyPress}
                           onChange={this.onChangeInput}
                           type="text"
                           placeholder="New task name"
                           className={`${classForInput} decorationInput`}
                           value={this.state.title}
                    />
                    <button onClick={this.onAddTaskClick}>Add</button>
                </div>
            </div>
        );
    }
}

export default ToDoListHeader;

