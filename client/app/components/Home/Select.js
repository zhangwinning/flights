import React, { Component } from "react";
import 'antd/dist/antd.css';
import { Select } from 'antd';

const { Option } = Select;

export default class SelectAirport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            result: [],
        };
    }

    onChange = (value) => {
        console.log(`selected ${value}`);
        this.props.onSelectChange(value)
    }

    render() {
        const { name, result } = this.state
        const { airportList } = this.props

        return (
            <Select
                showSearch
                style={{ width: 200 }}
                placeholder="Select a airport"
                optionFilterProp="children"
                onChange={this.onChange}
                // onFocus={this.onFocus}
                // onBlur={this.onBlur}
                // onSearch={this.onSearch}
                // filterOption={(input, option) =>
                //     option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                // }
            >
                {airportList.map(d => (
                    <Option key={d.id}>{d.name}</Option>
                ))}
            </Select>
        )
    }
}

