import React from 'react';
import ToDoListTask from './ToDoListTask';

class ToDoListTasks extends React.Component {
    render = () => {
        const tasksElements = this.props.tasks.map(
            task => <ToDoListTask title={task.title} isDone={task.isDone} priority={task.priority} />
        )
        return (
                    <div className="todoList-tasks">
                     {tasksElements}
                    </div>
        );
    }
}

export default ToDoListTasks;

