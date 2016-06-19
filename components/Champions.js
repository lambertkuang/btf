import React from 'react';
import Portrait from './Portrait';

export default class Champions extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const listStyle = {
      listStyle: 'none',
      display: 'flex',
      flexWrap: 'wrap'
    };

    return (
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
    );
  }
}