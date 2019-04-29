import React, { Component } from 'react';
import M from "materialize-css";

class ZwaveDisablePollModal extends Component {
  componentDidMount() {
    const { moduleId, valueId } = this.props;

    const modalName = `ZwaveDisablePollModal${moduleId}${valueId}`;
    const modal = document.getElementById(modalName);
    M.Modal.init(modal, { endingTop: '35%' });
  }
  handleSubmit = (e) => {
    e.preventDefault();

    const { moduleId, valueId } = this.props;

    this.props.zwaveDisablePoll({
      variables: {
        moduleId,
        valueId
      }
    });

    const modalName = `ZwaveDisablePollModal${moduleId}${valueId}`;
    const modal = document.getElementById(modalName);
    M.Modal.getInstance(modal).close();
  }
  render(){
    const { moduleId, valueId, name } = this.props;

    return (
      <div
        style={{ maxWidth: "500px", borderRadius: "20px", padding: "20px" }}
        className="modal" id={`ZwaveDisablePollModal${moduleId}${valueId}`}>
        <div className="container center">
          <p style={{ fontSize: '1.3rem' }}>
            {`Do you really want to disable polling of parameter ${name}?`}
          </p>
          <form onSubmit={this.handleSubmit}>
            <button
              className="btn waves-effect waves-light indigo"
              type="submit">
              Disable polling
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default ZwaveDisablePollModal;
