import React, {Component} from 'react';
import PropTypes from 'prop-types';

class ButtonFrame extends React.Component {

  found() {
    var hand = this.props.hand;
    var disabledCards = this.props.disabledCards;

    if (hand === disabledCards){
      if (this.props.cpuRequest === "Your turn") {
        return true;
      }
      else {
        return false;
      }
    }
    else {
      return true;
    }
  }

  render () {

    var cards = this.props.cards;
    var hand = this.props.hand;
    var cpu = this.props.cpu;

    return (
      <div>
         <button onClick={this.props.drawCardHand.bind(null, cards, hand)} disabled={this.props.cpuRequest != "Go Goose!"}>Draw Card </button>
         <button onClick={this.props.goGoose.bind(this)} disabled={this.found()}>Go Goose!</button>
      </div>
    );
  }
};

export default ButtonFrame;
