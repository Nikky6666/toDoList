import React from 'react';
import './App.css';


class AddNewItemForm extends React.Component {

    state = {
        error: false,
        title: "",
    };


    onAddItemClick = () => {
        let newTitle = this.state.title;
        if (newTitle.trim() === "") {
            this.setState({error: true});
        } else {
            this.props.addItem(newTitle);
            this.setState({
                error: false,
                title: ""
            });
        }
    };

        onChangeInput = (e) => {
            this.setState({
                title: e.currentTarget.value
            });
           e.currentTarget.value==="" ? this.setState({error: true}) : this.setState({error:false});
        };

        onKeyPress = (e) => {
            if(e.key==='Enter') this.onAddItemClick()
        };

    render = () => {
        const classForInput = this.state.error ? "error": "";
        return (
                <div className="newItemForm">
                    <input onKeyPress={this.onKeyPress}
                           onChange={this.onChangeInput}
                           type="text"
                           placeholder="New item name"
                           className={`${classForInput} decorationInput`}
                           value={this.state.title}
                    />
                    <button onClick={this.onAddItemClick}>Add</button>
                </div>

        );
    }
}

export default AddNewItemForm;

