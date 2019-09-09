import React, { Component } from 'react';
import 'whatwg-fetch';

import {
  getFromStorage,
  setInStorage
} from '../../utils/storage'

import Select from './Select'
import Map from './Map'

import Airport from './Airport'

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
        <Select airportList={airportList} onSelectChange={this.onSelectChange}></Select>

        {
          selectAirportId ? (<Map selectAirportId={selectAirportId}> </Map>) : null
        }

      </div>
    );
  }
}

export default Home;
