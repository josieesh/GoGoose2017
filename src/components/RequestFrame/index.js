import React, {Component} from 'react';
import {Form, Field} from 'simple-react-forms';

class RequestFrame extends React.Component {

  onClickHandler () {
    this.props.request = this.refs['simpleForm'].getFormValues();
  }
  render () {
    return (
    <div>
      <Form ref='simpleForm'>
          <Field
            name='request'
            label='Enter request'
            type='text'
          />
      </Form>
      <button onClick={this.onClickHandler.bind(this)} disabled={!(this.props.turn)%2 == 0}>Submit</button>
    </div>

    );
  }
}

export default RequestFrame;
