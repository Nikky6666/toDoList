import React from 'react';
import ToDoListTask from './ToDoListTask';

class ToDoListTasks extends React.Component {
    render = () => {
        const tasksElements = this.props.tasks.map(
            task => <ToDoListTask todolistId={this.props.todolistId} task={task} changeStatus={this.props.changeStatus} changeTitle={this.props.changeTitle}/>
        );
        return (
                    <div className="todoList-tasks">
                     {tasksElements}
                    </div>
        );
    }
}

export default ToDoListTasks;