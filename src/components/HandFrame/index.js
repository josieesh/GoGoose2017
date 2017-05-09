import React from 'react';

class HandFrame extends React.Component{
  /*constructor(props) {
    super(props)
  } */

  /*handleClick (arr, obj) {
    if (this.disabled(arr,obj)) {
      alert("cannot click this card");
    }
    else{
      this.props.sendCardToCpu;
    }
  }

  disabled(arr,obj) {
    return (arr.indexOf(obj) != -1);
  }*/

  render () {
    var hand = this.props.hand;
    var cards = [];

    /*cards=hand.map(function(card, i){
      return <span key={i} className="card" id={card[i]} onClick={this.props.sendCardToCpu.bind(null, card[i])}> </span>;
    });*/

    //var disabledCards = this.props.disabledCards;

    for (var i = 0; i <hand.length; i ++) {
      cards.push(
        <span key={i} className="card" id={hand[i]} onClick={this.props.sendCardToCpu.bind(null, hand[i])}> </span>
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
