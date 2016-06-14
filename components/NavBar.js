import React from 'react';
import NavLink from './NavLink';


export default class NavBar extends React.Component {
  render() {
    const navStyle = {
      listStyle: 'none',
      width: '100%',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      margin: '0 auto',
      padding: 'initial',
      display: 'flex',
      alignItems: 'center',
      background: 'white',
      textAlign: 'center',
      height: '2em'
    };

    const listStyle = {
      display: 'inline-block',
      width: '33%'
    };

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