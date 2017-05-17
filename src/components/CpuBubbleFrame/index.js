import React, {Component} from 'react';
import PropTypes from 'prop-types';

class CpuBubbleFrame extends React.Component {
  render () {

    var className = "";
    var hidden = this.props.request.length===0;

    if(hidden){
      className = "hidden";
    }

    return (
      <div className={className} id="cpuspeechbubble">
      <span>
        <p>{this.props.request}</p>
      </span>
      </div>
    );
  }
};

export default CpuBubbleFrame;
