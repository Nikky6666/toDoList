import React from 'react';
import './App.css';

class ToDoListTask extends React.Component {

    state = {
        editMode: false,
        title: this.props.task.title
    };

    activateEditMode = () => {
        this.setState({
            editMode: true
        })
    };

    deactivateEditMode= () => {
        this.setState({
            editMode: false
        });
        const updatedTask = {...this.props.task, title: this.state.title};
        this.props.changeTask(updatedTask);
    };

    onTitleChanged = (e) =>{
        this.setState({
            title: e.currentTarget.value
        })
    };

    onIsDoneChanged = (e) => {
        let status = e.currentTarget.checked ? 2 : 0;
        const updatedTask = {...this.props.task, status};
        this.props.changeTask(updatedTask);
    };

        render = () => {
            const classForTask = this.props.task.status===2 ? "todoList-task done" : "todoList-task";
            let priority;
            switch (this.props.task.priority) {
                case 0: priority = "low";
                case 1: priority = "middle";
                case 2: priority = "hi";
                case 3: priority = "urgently";
                case 4: priority = "later";
                default: priority="low";
            }
        return (<div className={classForTask}>
            <input type="checkbox" checked={this.props.task.status===2} onChange={this.onIsDoneChanged} />
                {this.state.editMode ? <input
                                        onBlur={this.deactivateEditMode}
                                        autoFocus={true}
                                        value={this.state.title}
                                        onChange={this.onTitleChanged}
                    /> :
                    <span onClick={this.activateEditMode}>{this.props.task.title}, priority: {priority}</span>
                }
                <button onClick={()=> {this.props.deleteTask(this.props.task.id)}}>X</button>
        </div>
        );
    }
}


export default ToDoListTask;

