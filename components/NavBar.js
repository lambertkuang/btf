import React from 'react';
import NavLink from './NavLink';

const navStyle = {
  listStyle: 'none'
};

const listStyle = {
  display: 'inline'
};

export default class NavBar extends React.Component {
  render() {
    return (
      <div>
        <ul style={navStyle} role='nav'>
          <li style={listStyle}><NavLink to='/' onlyActiveOnIndex={true}>Home</NavLink></li>
          <li style={listStyle}><NavLink to='/about'>About</NavLink></li>
          <li style={listStyle}><NavLink to='/repos'>Repos</NavLink></li>
        </ul>
      </div>
    );
  }
};