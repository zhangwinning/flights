import React, { Component } from 'react';
import 'whatwg-fetch';

import GithubCorner from 'react-github-corner';


import Select from './Select'
import Map from './Map'

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      airportList: [],
      selectAirportId: '',
    };
  }

  componentDidMount() {
    fetch(`/api/airportList`)
      .then(res => res.json())
      .then(json => {
        this.setState({
          airportList: json.result
        })
      })
  }

  onSelectChange = (selectAirportId) => {
    this.setState({ selectAirportId: selectAirportId })
  }


  render() {
    const { airportList, selectAirportId } = this.state
    return (
      <div>
        <GithubCorner
          href="https://github.com/zhangwinning/flights"
          bannerColor="#64CEAA"
          octoColor="#fff"
          size={80}
          direction="right"
        />
        <h1>Using Dijkstra's algorithm to show all airports maps 🌍 </h1>
        <Select airportList={airportList} onSelectChange={this.onSelectChange}></Select>

        {
          selectAirportId ? (<Map selectAirportId={selectAirportId}> </Map>) : null
        }

      </div>
    );
  }
}

export default Home;
