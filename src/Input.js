import React, {Component} from 'react';
const uuidv4 = require('uuid/v4');

class Input extends Component {

    constructor() {
        super();
        this.state = {
            name: '',
            nickname: '',
            id: ''
        }
    }

    updateValue(fieldName, value) {
        this.setState({
            [fieldName]: value
        })
    }

    onAddClick() {
        this.state.id = uuidv4();
        this.props.onAddClick(this.state.name, this.state.nickname, this.state.id);
    }
    
    render() {
        return (
            <div className="app-input">
                <div>
                    <span>Name:</span>
                    <input type="text" onChange={(e) => {
                        this.updateValue('name', e.target.value)
                    }} />
                </div>
                <div>
                    <span>Nickname:</span>
                    <input type="text" onChange={(e) => {
                        this.updateValue('nickname', e.target.value)
                    }} />
                </div>
                <button onClick={() => {
                    this.onAddClick()
                }}>Add
                </button>
            </div>
        );
    }
}

Input.PropTypes = {
    onAddClick: React.PropTypes.func
};

export default Input;

