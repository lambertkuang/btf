import React from 'react';

export default class Portrait extends React.Component {
  constructor() {
    super();
  }

  render() {
    const portraitBox = {
      border: 'black solid 2px',
      width: '10em',
      height: '10em',
      margin: '2px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      textAlign: 'center'
    };

    const nameStyle = {

    };

    const winStyle = {

    };

    return (
      <div style={portraitBox}>
        <div>{this.props.name}</div>
        <div>{this.props.winRate}</div>
      </div>
    );
  }
}