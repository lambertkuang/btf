import React from 'react';
import NavLink from './NavLink';
import NavBar from './NavBar';

export default React.createClass({
  render() {
    const headerStyle = {
      marginTop: '2em',
      display: 'flex',
      justifyContent: 'center'
    };

    return (
      <div>
        <NavBar/>
        <header style={headerStyle}>
          <h1>ban these fools</h1>
        </header>
        {this.props.children}
      </div>
    );
  }
})
