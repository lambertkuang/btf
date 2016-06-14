import React from 'react';
import axios from 'axios';
import Portrait from './Portrait';

export default class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      nameData: {},
      data: []
    };
  }

  getData() {
    // get static champion data (names)
    function getNames() {
      return axios.get('/api/names');
    }
    function getStats() {
      return axios.get('/api/stats');
    }

    axios.all([getNames(), getStats()])
    .then(axios.spread((names, stats) => {
      let nameData = {};
      for (let champ in names.data.data) {
        let champData = names.data.data[champ];
        nameData[champData.id] = champ;
      }
      this.setState({nameData: nameData});
      this.setState({data: stats.data});
      this.setState({loading: false});
    }));
  }

  sortData() {
    if (this.state.loading) {
      return <div>Loading data...</div>;
    }
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