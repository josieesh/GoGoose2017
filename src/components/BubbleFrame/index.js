import React from 'react';
import PropTypes from 'prop-types';


class MyBubbleFrame extends React.Component {

  render () {

    var className = "";
    var hidden = (this.props.turn)%2!==0;

    if(hidden){
      className = "hidden";
    }

    return (
      <div className ={className} id="myspeechbubble">
        <p>Do you have a ...</p>
      </div>
    );
  }
};

export default MyBubbleFrame;
