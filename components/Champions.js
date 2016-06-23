import React from 'react';
import Portrait from './Portrait';
import Search from './Search';

export default class Champions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      champInfo: [],
      filtered: []
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.mapData = this.mapData.bind(this);
  }

  mapData() {
    const champInfo = this.props.champions.map((champ) => {
      // champion name
      champ.name = this.props.names[champ.championId];
      return champ;
    });
    this.setState({
      champInfo: champInfo,
      filtered: champInfo
    });
  }

  handleSearch(event) {
    const input = event.target.value.toString() || '';

    const filteredChamps = this.state.champInfo.filter((champ) => {
      return champ.name.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    });

    this.setState({filtered: filteredChamps});
  }

  componentDidMount() {
    this.mapData();
  }

  render() {
    const listStyle = {
      listStyle: 'none',
      display: 'flex',
      flexWrap: 'wrap'
    };

    const searchStyle = {
      display: 'flex',
      justifyContent: 'center',
      marginTop: '1em'
    };

    return (
      <div>
        <div style={searchStyle}>
          <Search search={this.handleSearch} />
        </div>
        <ul className={this.props.fade ? 'fade-in' : 'fade-out'} style={listStyle}>
          {
            this.state.filtered.map((champ) => {
              return (
                <li key={champ.championId}>
                  <Portrait name={champ.name} winRate={champ.winRate || 0} />
                </li>
              );
            })
          }
        </ul>
      </div>
    );
  }
}
