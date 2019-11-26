import React from 'react';
import ToDoListTask from './ToDoListTask';
import PropTypes from 'prop-types';

class ToDoListTasks extends React.Component {
    render = () => {
        const tasksElements = this.props.tasks.map(
            task => <ToDoListTask task={task} changeStatus={this.props.changeStatus}/>
        )
        return (
                    <div className="todoList-tasks">
                     {tasksElements}
                    </div>
        );
    }
}

export default ToDoListTasks;

ToDoListTasks.propTypes = {

    tasks: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string,
        isDone: PropTypes.bool,
        priority: PropTypes.string
    })
    )

}
