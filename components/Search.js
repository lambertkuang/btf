import React from 'react';

export default class Search extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <input type=text onChange={this.props.search} />
      </div>
    );
  }
}
