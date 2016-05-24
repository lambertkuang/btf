import React from 'react';
import Champion from './Champion'

export default class TopChamps extends React.Component {
  getTopChamps(list) {
    return list.map((champ) => {
      return (
        <Champion champion={champ}/>
      );
    })
  }

  render() {
    return (
      <table>
        <Champion/>
      </table>
    );
  }
}