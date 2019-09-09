import React, { Component } from 'react'
import { Table } from 'antd'

export default class PathList extends Component {
    render() {
        const { data } = this.props
        const columns = [
            {
                title: 'path',
                dataIndex: 'path',
                render: (record) => {
                    return record.join('--->')
                }
            },
            {
                title: 'distance(meter)',
                dataIndex: 'distance',
            },
        ]
        return (
            <Table columns={columns} dataSource={data} />
        )
    }
}