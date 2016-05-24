import React from 'react';

export default class Champion extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <tr>
        <td>{this.props.champion.name}</td>
        <td>{this.props.champion.winrate}</td>
      </tr>
    );
  }
}