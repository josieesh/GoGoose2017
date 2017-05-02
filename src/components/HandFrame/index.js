import React, {Component} from 'react';

class HandFrame extends React.Component{
  constructor(props) {
    super(props)
  }
  render () {
    var hand = this.props.hand;
    var cards = [];

    console.log('hand =', hand);
    console.log("cards = ", cards);

    for (var i = 0; i <hand.length; i ++) {
      cards.push(
        <span key={i} className = "card" id = {hand[i]}> </span>
      )
    }
    return (

      <div id = "hand-frame">
        <div className = "well">
          <h2> YOU </h2>
          {cards}
        </div>
      </div>
    );
  }
};

export default HandFrame;
