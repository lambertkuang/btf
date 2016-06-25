import React from 'react';

export default class Portrait extends React.Component {
  constructor() {
    super();
  }

  render() {
    const portraitBox = {
      border: 'black solid 2px',
      width: '6em',
      height: '8em',
      margin: '2px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      alignItems: 'center'
    };

    const picStyle = {
      height: '4em',
      width: '4em'
    };

    function getImage(img) {
      if (img) {
        return {
          backgroundImage: 'url(' + 'images/' + img.sprite + ')',
          backgroundPosition: '-' + img.x + 'px -' + img.y + 'px',
          height: img.h + 'px',
          width: img.w + 'px'
        };
      } else {
        return {
          backgroundImage: 'url(' + 'images/champion4.png' + ')',
          backgroundPosition: '-432px -48px',
          height: '48px',
          width: '48px'
        };
      }
    }

    return (
      <div style={portraitBox}>
        <div style={getImage(this.props.image)}>
        </div>

        <div>{this.props.name}</div>
        <div>{this.props.winRate.toFixed(2)}</div>
      </div>
    );
  }
}
