import React from 'react';
import PropTypes from 'prop-types';


class MyBubbleFrame extends React.Component {

  render () {

    var className = "";
    var hidden = (this.props.request.length===0);

    if(hidden){
      className = "hidden";
    }

    if (this.props.request==="Go Goose!") {
      return (
        <div className={className} id='myspeechbubble'>
          <p>{this.props.request}</p>
        </div>
      )
    }
    else {
      return (
        <div className ={className} id="myspeechbubble">
          <p>Do you have {this.props.request}?</p>
        </div>
      );
    }
  }
};

export default MyBubbleFrame;
