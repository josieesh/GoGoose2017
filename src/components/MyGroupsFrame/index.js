import React from 'react';
import ReactDOM from 'react-dom';

class MyGroupFrame extends React.Component {
  constructor(props) {
    super(props);
  }

  var group=this.props.myGroup;
  for (var i = 0; i <group.length; i ++) {
    cards.push(
      <span key={i} className = "card" id = "facedown"> </span>
    )
  }

  render () {

    return (
    <div>
      {cards}
    </div>

    );
  }
}

export default MyGroupFrame;
