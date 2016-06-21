import React from 'react';
import Portrait from './Portrait';
import Search from './Search';

export default class Champions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      champInfo: []
    };
  }

  mapData() {
    const champInfo = this.props.champions.map((champ) => {
      // champion name
      champ.name = this.props.names[champ.championId];
      return champ;
    });
    this.setState({champInfo: champInfo});
  }

  handleSearch(event) {
    const input = event.target.value.toString() || '';

    // TODO: create and set state to list which champs to display
    return this.state.champInfo.filter((champ) => {
      return champ.name.indexOf(input) >= 0;
    });
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

    return (
      <div>
        <Search search={this.handleSearch} />
        <ul className={this.props.fade ? 'fade-in' : 'fade-out'} style={listStyle}>
          {
            this.props.champions.map((champ) => {
              return (
                <li key={champ.championId}>
                  <Portrait name={this.props.names[champ.championId]} winRate={champ.winRate || 0} />
                </li>
              );
            })
          }
        </ul>
      </div>
    );
  }
}
