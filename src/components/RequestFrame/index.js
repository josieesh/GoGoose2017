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
      this.refs.simpleForm.value =""; // this should clear the form after request is sent back to parent
      this.props.onUpdate(request);
    }
  }

  render () {

    return (
    <div>
      <input type='text' ref='simpleForm'/>
      <input type='button' onClick={this.update} disabled={this.props.cpuRequest !== "Your turn" && this.props.cpuRequest !== "Yep!"} value='Ask'/>
    </div>

    );
  }
}

export default RequestFrame;
