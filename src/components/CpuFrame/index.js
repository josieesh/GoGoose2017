import React from 'react';

class CpuFrame extends React.Component{
  /*constructor(props) {
    super(props)
  } */

  render () {
    var cpu = this.props.cpu;
    console.log(cpu);
    var cards = [];
    for (var i = 0; i <cpu.length; i ++) {
      cards.push(
        <span key={i} className = "card" id = "facedown"> </span>
      )
    }
    return (

      <div id = "cpu-frame">
        <div className = "well">
          <h2> CPU </h2>
          {cards}
        </div>
      </div>
    );
  }
};

export default CpuFrame;
