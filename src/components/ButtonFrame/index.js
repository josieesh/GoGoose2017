import React, {Component} from 'react';

class ButtonFrame extends React.Component {
  render () {

    var cards = this.props.cards;
    console.log("button frame cards:", cards);
    
    var hand = this.props.hand;
    var cpu = this.props.cpu;

    return (
      <div>
        <button
         onClick={this.props.shuffle.bind(null,cards)}> Shuffle </button>
         <button onClick={this.props.drawCardHand.bind(null, cards, hand)} >Draw Card </button>
      </div>
    );
  }
};

export default ButtonFrame;
