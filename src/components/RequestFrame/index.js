import React from 'react';
import ReactDOM from 'react-dom';

class RequestFrame extends React.Component {

  /*onClickHandler () {
    this.props.request = this.refs['simpleForm'].getFormValues();
  }*/

  update() {
    this.props.onUpdate(this.refs.simpleForm.value);
  }

  render () {
    return (
    <div>
      <input type='text' ref='simpleForm'/>
      <input type='button' onClick={this.update.bind(this)} disabled={!(this.props.turn)%2 === 0} value='Ask'/>
    </div>

    );
  }
}

export default RequestFrame;
