import React, {Component} from 'react';
import PropTypes from 'prop-types';

class DeckFrame extends React.Component{
  render () {
    var hand = this.props.hand;
    var cards = this.props.cards;

    var deck = [];
    for (var i = 0; i <cards.length; i ++) {
      deck.push(
        <span key ={i} className= "card" id = 'facedown-deck' >
          <button id="draw-card-button" onClick={this.props.drawCardHand.bind(null, cards, hand)} disabled={this.props.cpuRequest != "Go Goose!"}></button>
        </span>
      )
    }

    return (
      <div id = "deck-frame">
        <div className = "well">
          {deck}
        </div>
      </div>
    );
  }
};

export default DeckFrame;
