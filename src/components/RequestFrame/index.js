import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {Form, Field} from 'simple-react-forms';

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
