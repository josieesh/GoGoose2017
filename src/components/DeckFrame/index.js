import React, {Component} from 'react';
import PropTypes from 'prop-types';

class DeckFrame extends React.Component{
  render () {

    var cards = this.props.cards;

    var deck = [];
    for (var i = 0; i <cards.length; i ++) {
      deck.push(
        <span key ={i} className= "card" id = {cards[i]} > </span>
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
