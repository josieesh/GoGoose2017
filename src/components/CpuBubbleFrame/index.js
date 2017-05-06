import React, {Component} from 'react';
import PropTypes from 'prop-types';

class CpuBubbleFrame extends React.Component {
  render () {

    var className = "";
    var hidden = (this.props.turn)%2===0;

    if(hidden){
      className = "hidden";
    }

    return (
      <div className={className} id="cpuspeechbubble">
        <p>{this.props.request}</p>
      </div>
    );
  }
};

export default CpuBubbleFrame;
