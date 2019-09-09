import React, { PureComponent } from 'react';
import ReactEcharts from 'echarts-for-react';
import 'whatwg-fetch';

import PathList from './PathList'

require("echarts/map/js/world.js");

export default class Airport extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            edgeList: [],
            nodeList: [],
        };
    }
    getOption = () => {

        const { edgeList } = this.state

        // console.l
        const convertData = function () {
            var res = [];
            for (var i = 0; i < edgeList.length; i++) {
                var dataItem = edgeList[i];
                var fromY0 = parseFloat(dataItem.y0);
                var toX0 = parseFloat(dataItem.x0);

                var fromY1 = parseFloat(dataItem.y1);
                var toX1 = parseFloat(dataItem.x1);

                const coords = [[fromY0, toX0], [fromY1, toX1]]

                res.push({ coords: coords });
            }
            return res;
        };

        const series = [];
        series.push(
            {
                type: 'lines',
                zlevel: 2,
                symbol: ['none', 'arrow'],
                symbolSize: 10,
                lineStyle: {
                    normal: {
                        color: "#a6c84c",
                        width: 1,
                        opacity: 0.3,
                        curveness: 0.1
                    }
                },
                data: convertData()
            },
        );

        const option = {
            backgroundColor: '#404a59',
            title: {
                text: 'map',
                subtext: 'finding the shortest distance between nodes in a graph',
                left: 'center',
                textStyle: {
                    color: '#fff'
                }
            },
            tooltip: {
                trigger: 'item'
            },
            geo: {
                map: 'world',
                label: {
                    emphasis: {
                        show: false
                    }
                },
                roam: true,
                itemStyle: {
                    normal: {
                        areaColor: '#323c48',
                        borderColor: '#404a59'
                    },
                    emphasis: {
                        areaColor: '#2a333d'
                    }
                }
            },
            series: series
        };
        return option;
    };


    getPathApi(selectAirportId) {
        fetch(`/api/getPath`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: selectAirportId
            })
        })
            .then(res => res.json())
            .then(data => {
                const result = data.result
                this.setState({
                    edgeList: result.edgeList,
                    nodeList : result.nodeList
                })
            })
    }

    componentWillReceiveProps() {
        const { selectAirportId } = this.props
        this.getPathApi(selectAirportId)
    }

    componentDidMount() {
        const { selectAirportId } = this.props
        this.getPathApi(selectAirportId)
    }

    render() {
        const { nodeList } = this.state
        return (
            <div>
                <label> show paths. </label>
                    <PathList data = {nodeList} />
                <label> render a airport chart. </label>
                <ReactEcharts
                    option={this.getOption()}
                    style={{ height: '700px', width: '100%' }}
                    className='react_for_echarts' />
            </div>
        );
    }
}
