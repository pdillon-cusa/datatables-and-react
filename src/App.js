import React, {Component} from 'react';
import Input from './Input';
import Table from './Table';

class App extends Component {
    constructor() {
        super();
        this.state = {
            names: []
        }
    }

    onAddClick(name, nickname, id) {
        let updated = false;
        const result = this.state.names.map((nameData) => {
            if (nameData.name === name) {
                updated = true;
                return {name, nickname, id}
            }
            return nameData;
        });
        if (!updated) {
            result.push({name, nickname, id});
        }

        this.setState({
            names: result
        })
    }

    render() {
        return (
            <div className="App">
                <Input onAddClick={(name, nickname, id) => {
                    this.onAddClick(name, nickname, id);
                }} />
                <Table names={this.state.names} />
            </div>
        );
    }
}

export default App;
