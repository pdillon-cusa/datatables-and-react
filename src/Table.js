import React, {Component} from 'react';

import './datatables.css';

const $ = require('jquery');
$.DataTable = require('datatables.net');
require( 'datatables.net-buttons/js/dataTables.buttons.min' );
const jzip = require( 'jszip');
require( 'datatables.net-buttons/js/buttons.html5.min' );

window.JSZip = jzip;

const columns = [
    {
        title: 'Name',
        data: 'name'
    },
    {
        title: 'Nickname',
        data: 'nickname'
    },
    {
        title: 'UUID',
        data: 'id'
    }
];

function reloadTableData(names) {
    const table = $('.data-table-wrapper').find('table').DataTable();
    table.clear();
    table.rows.add(names);
    table.draw();
}

function updateTable(names) {
    const table = $('.data-table-wrapper').find('table').DataTable();
    let dataChanged = false;
    table.rows().every(function () {
        const oldNameData = this.data();
        const newNameData = names.find((nameData) => {
            return nameData.name === oldNameData.name;
        });
        if (oldNameData.nickname !== newNameData.nickname) {
            dataChanged = true;
            this.data(newNameData);
        }
       return true;
    });

    if (dataChanged) {
        table.draw();
    }
}


class Table extends Component {
    componentDidMount() {
        $(this.refs.main).DataTable({
            dom: '<"data-table-wrapper"tlBfrtip>',
            data: this.props.names,
            columns,
            ordering: true,
            buttons: [
                {
                    extend: 'excelHtml5',
                    title: 'Excel'
                }
            ],
            columnDefs: [
                { 
                    className: "dt-center", 
                    targets: [0,1]
                },
                { 
                    className: "dt-left", 
                    targets: [2]
                }]
        });
    }

    componentWillUnmount(){
       $('.data-table-wrapper').find('table').DataTable().destroy(true);
    }

    shouldComponentUpdate(nextProps) {
        if (nextProps.names.length !== this.props.names.length) {
            reloadTableData(nextProps.names);
        } else {
            updateTable(nextProps.names);
        }
        return false;
    }



    render() {
        return (
            <div>
                <table ref="main" />
            </div>);
    }
}

Table.PropTypes = {
    names: React.PropTypes.array
};

export default Table;