import React from 'react';

export default class Portrait extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <div>{this.props.pic}</div>
        <h3>{this.props.name}</h3>
        <h5>{this.props.winRate}</h5>
      </div>
    );
  }
}