import React from 'react';
import axios from 'axios';
import Portrait from './Portrait';
import Champions from './Champions';
import {banRank} from '../helpers/banRank';

export default class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      nameData: {},
      imgData: {},
      data: [],
      showAll: false,
      firstLoad: true
    };
    this.showAll = this.showAll.bind(this);
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
      let imgData = {};
      for (let champ in names.data.data) {
        let champData = names.data.data[champ];
        nameData[champData.id] = champData.name;
        imgData[champData.name] = champData.image;
      }

      let champInfo = banRank(stats.data.map((champ) => {
        champ.name = nameData[champ.championId];
        return champ;
      }));

      this.setState({nameData: nameData});
      this.setState({imgData: imgData});
      this.setState({data: champInfo});
      this.setState({loading: false});
    }));
  }

  getTop5() {
    const top5 = this.state.data.slice().sort((a, b) => {
      return b.banPriority - a.banPriority;
    }).slice(0, 5);
    return top5.map((champ) => {
      return (
        <li key={champ.championId}>
          <Portrait name={this.state.nameData[champ.championId]} winRate={champ.winRate || 0} image={this.state.imgData[champ.name]} />
        </li>
      );
    });
  }

  componentDidMount() {
    this.getData();
  }

  showAll() {
    this.setState({showAll: !this.state.showAll});
    this.setState({firstLoad: !this.state.firstLoad ? this.state.firstLoad : false});
  }

  render() {
    const listStyle = {
      listStyle: 'none',
      display: 'flex',
      flexWrap: 'wrap'
    };

    const top5Style = {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    };

    const downArrow = {
      width: 0,
      height: 0,
      borderLeft: '20px solid transparent',
      borderRight: '20px solid transparent',
      borderTop: '20px solid pink'
    };

    const showAllStyle = {
      display: 'flex',
      justifyContent: 'center',
      marginTop: '2em'
    };

    const showText = this.state.showAll ? 'Hide' : 'Show all';
    const loading = this.state.loading ? 'Loading...' : '';

    if (!this.state.data.length) {
      return <div style={showAllStyle}>{loading}</div>;
    }

    return (
      <div>
        <div style={top5Style}>
          <h2>best 5 bans</h2>
          <ul style={listStyle}>
            {loading}
            {this.getTop5()}
          </ul>
        </div>

        <div onClick={this.showAll} style={showAllStyle}>
          <div style={downArrow}></div>
          <div>{showText}</div>
          <div style={downArrow}></div>
        </div>

        <div className={this.state.firstLoad ? 'hidden' : ''}>
          <Champions fade={this.state.showAll} names={this.state.nameData} champions={this.state.data} images={this.state.imgData} />
        </div>
      </div>
    );
  }
}