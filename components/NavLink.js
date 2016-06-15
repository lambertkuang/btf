import React from 'react';
import {Link} from 'react-router';


export default class NavLink extends React.Component {
  render() {
    const linkStyle = {
      textDecoration: 'none'
    };
    return (
      <Link {...this.props} style={linkStyle} activeClassName='active'/>
    );
  }
}