import React from 'react';
import NavLink from './NavLink';
import NavBar from './NavBar';

export default React.createClass({
  render() {
    const headerStyle = {
      marginTop: '2em'
    };

    return (
      <div>
        <NavBar/>
        <h1 style={headerStyle}>Champion Stats</h1>
        {this.props.children}
      </div>
    );
  }
})
