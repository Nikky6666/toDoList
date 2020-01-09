import React from 'react';
import ToDoListTask from './ToDoListTask';

class ToDoListTasks extends React.Component {
    render = () => {
        const tasksElements = this.props.tasks.map(
            task => <ToDoListTask todolistId={this.props.todolistId}
                                  key={task.id}
                                  task={task}
                                  deleteTask={this.props.deleteTask}
                                  changeTask={this.props.changeTask}
            />
        );
        return (
                    <div className="todoList-tasks">
                     {tasksElements}
                    </div>
        );
    }
}

export default ToDoListTasks;