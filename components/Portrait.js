import React from 'react';

export default class Portrait extends React.Component {
  constructor() {
    super();
  }

  render() {
    const portraitBox = {
      border: 'black solid 2px',
      width: '6em',
      height: '8em',
      margin: '2px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      alignItems: 'center'
    };

    const picStyle = {
      height: '4em',
      width: '4em'
    };

    return (
      <div style={portraitBox}>
        <img style={picStyle} src={'http://ddragon.leagueoflegends.com/cdn/6.12.1/img/champion/' + this.props.name + '.png'}/>
        <div>{this.props.name}</div>
        <div>{this.props.winRate.toFixed(2)}</div>
      </div>
    );
  }
}