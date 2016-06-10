import React from 'react';
import TopChamps from './TopChamps';
import axios from 'axios';

export default class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      nameData: {},
      data: []
    };
  }

  getData() {
    // get static champion data (names)
    axios.get('/api/names').then((res) => {
      let nameData = {};
      for (let champ in res.data.data) {
        let champData = res.data.data[champ];
        nameData[champData.id] = champ;
      }
      this.setState({nameData: nameData});
    })
    .catch((res) => {
      console.log('err getting static: ', res);
    });

    // get champion win rates and stuff
    axios.get('/api/stats').then((res) => {
      this.setState({data: res.data});
    })
    .catch((res) => {
      console.log('api get err', res);
    });
  }

  sortData() {
    return this.state.data.map((champ) => {
      return <li key={champ.championId}>{this.state.nameData[champ.championId]}: {champ.winRate}</li>;
    });
  }

  componentDidMount() {
    this.getData();
  }

  render() {
    return (
      <div>
        <ul>
          {this.sortData()}
        </ul>
      </div>
    );
  }
}