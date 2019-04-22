import React, { Component } from 'react';
import M from "materialize-css";

class RestartModuleModal extends Component {
  componentDidMount() {
    const modal = document.getElementById(`RestartModule${this.props.moduleId}`);
    M.Modal.init(modal, { endingTop: '35%' });
  }
  render(){
    return (
      <div
        style={{ maxWidth: "500px", borderRadius: "20px", padding: "20px" }}
        className="modal" id={`RestartModule${this.props.moduleId}`}>
        <p style={{ fontSize: '1.3rem' }}>
          { `Do you really want to restart the module ${this.props.moduleId}?` }
        </p>
        <button className="btn waves-effect waves-light indigo" onClick={
          e => {
            this.props.restartModule({
              variables: {
                moduleId: this.props.moduleId
              }
            });
            const modal = document.getElementById(`RestartModule${this.props.moduleId}`);
            M.Modal.getInstance(modal).close();
          }
        }>
          Restart
        </button>
      </div>
    );
  }

}

export default RestartModuleModal;
