import React from 'react';
import NavLink from './NavLink';
import NavBar from './NavBar';

export default React.createClass({
  render() {
    return (
      <div>
        <NavBar/>
        <h1>Champion Stats</h1>
        {this.props.children}
      </div>
    );
  }
})
