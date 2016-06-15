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
      return (
        <li key={champ.championId}>
          <Portrait name={this.state.nameData[champ.championId]} winRate={champ.winRate} />
        </li>
      );
    });
  }

  getTop5() {
    const top5 = this.state.data.slice().sort((a, b) => {
      if (a.winRate > b.winRate) {
        return -1;
      }
      if (a.winRate < b.winRate) {
        return 1;
      }
      return 0;
    }).slice(0, 5);
    return top5.map((champ) => {
      return (
        <li key={champ.championId}>
          <Portrait name={this.state.nameData[champ.championId]} winRate={champ.winRate} />
        </li>
      );
    });
  }

  componentDidMount() {
    this.getData();
  }

  render() {
    const listStyle = {
      listStyle: 'none',
      display: 'flex',
      flexWrap: 'wrap'
    };

    const top5Style ={
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    };

    return (
      <div>
        <div style={top5Style}>
          <h2>Top 5 Win Rates</h2>
          <ul style={listStyle}>
            {this.getTop5()}
          </ul>
        </div>
        <ul style={listStyle}>
          {this.sortData()}
        </ul>
      </div>
    );
  }
}