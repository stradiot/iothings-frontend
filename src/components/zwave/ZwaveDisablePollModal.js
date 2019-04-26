import React, { Component } from 'react';
import M from "materialize-css";

class ZwaveDisablePollModal extends Component {
  componentDidMount() {
    const { moduleId, valueId } = this.props;
    const modal = document.getElementById(`ZwaveDisablePollModal${moduleId}${valueId}`);
    M.Modal.init(modal, { endingTop: '35%' });
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
          <form
            onSubmit={e => {
              e.preventDefault();
              this.props.zwaveDisablePoll({
                variables: {
                  moduleId,
                  valueId
                }
              });
              const modal = document.getElementById(`ZwaveDisablePollModal${moduleId}${valueId}`);
              M.Modal.getInstance(modal).close();
            }}
          >
          <button className="btn waves-effect waves-light indigo" type="submit">
            Disable polling
          </button>
          </form>
        </div>
      </div>
    );
  }

}

export default ZwaveDisablePollModal;
