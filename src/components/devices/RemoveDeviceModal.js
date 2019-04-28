import React, { Component } from 'react';
import M from "materialize-css";

class RemoveDeviceModal extends Component {
  componentDidMount() {
    const modal = document.getElementById(`RemoveDevice${this.props.devId}`);
    M.Modal.init(modal, { endingTop: '35%' });
  }
  render(){
    return (
      <div
        style={{ maxWidth: "500px", borderRadius: "20px", padding: "20px" }}
        className="modal" id={`RemoveDevice${this.props.devId}`}>
        <div className="container center">
          <form
            onSubmit={e => {
              e.preventDefault();
              this.props.removeDevice({
                variables: { devId: this.props.devId }
              });
              const modal = document.getElementById(`RemoveDevice${this.props.devId}`);
              M.Modal.getInstance(modal).close();
              this.props.refetchDevices();
            }}
          >
            <p style={{ fontSize: '1.3rem' }}>
              { `Do you really want to remove the device ${this.props.name}?` }
            </p>
            <button className="btn waves-effect waves-light indigo" type="submit">
              Remove device
            </button>
          </form>
        </div>
      </div>
    );
  }

}

export default RemoveDeviceModal;
