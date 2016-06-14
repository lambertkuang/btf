import React from 'react';
import {Link} from 'react-router';

const linkStyle = {
  textDecoration: 'none'
};

export default class NavLink extends React.Component {
  render() {
    return (
      <Link {...this.props} style={linkStyle} activeClassName='active'/>
    );
  }
}