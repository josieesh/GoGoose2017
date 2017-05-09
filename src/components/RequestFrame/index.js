import React from 'react';
import ReactDOM from 'react-dom';

class RequestFrame extends React.Component {
  constructor(props) {
    super(props);
    this.update=this.update.bind(this);
  }

  update() {
    console.log("calling update function in request frame");
    var request = this.refs.simpleForm.value;
    console.log(request);

    if(request.length != 0) {
      this.props.onUpdate(request);
    }
  }

  render () {

    return (
    <div>
      <input type='text' ref='simpleForm'/>
      <input type='button' onClick={this.update} disabled={!(this.props.turn)%2 === 0} value='Ask'/>
    </div>

    );
  }
}

export default RequestFrame;
