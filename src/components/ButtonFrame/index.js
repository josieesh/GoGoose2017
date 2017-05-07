import React, {Component} from 'react';
import PropTypes from 'prop-types';

class ButtonFrame extends React.Component {

  found() {
    var hand = this.props.hand;
    var disabledCards = this.props.disabledCards;

    if (hand === disabledCards){
      return false;
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
        <button onClick={this.props.shuffle.bind(null,cards)}> Shuffle </button>
         <button onClick={this.props.drawCardHand.bind(null, cards, hand)} >Draw Card </button>
         <button onClick={this.props.goGoose} disabled={this.found()}>Go Goose!</button>
      </div>
    );
  }
};

export default ButtonFrame;
