import React, { Component } from "react";
import 'antd/dist/antd.css';
import { Select } from 'antd';

const { Option } = Select;

export default class SelectAirport extends Component {

    onChange = (value) => {
        this.props.onSelectChange(value)
    }

    render() {
        const { airportList } = this.props

        return (
            <Select
                showSearch
                style={{ width: 200 }}
                placeholder="Select a airport"
                optionFilterProp="children"
                onChange={this.onChange}
            >
                {airportList.map(d => (
                    <Option key={d.id}>{d.name}</Option>
                ))}
            </Select>
        )
    }
}

