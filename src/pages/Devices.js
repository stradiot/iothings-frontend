import React, { Component } from 'react';
import M from "materialize-css";

import DevicesQuery from '../queries/devices/DevicesQuery';

class Devices extends Component {
    render(){
      return (
        <div style={{ marginTop: "50px" }} className="container section center">
          <DevicesQuery/>
          <span style={{ position: 'absolute', bottom: 0, right: '15%' }}>
            <button
              className="btn waves-effect waves-light indigo"
              style={{ marginRight: '20px', marginBottom: '20px' }}
              onClick={
                e => {
                  const modal = document.getElementById(`AddDeviceModal`);
                  M.Modal.getInstance(modal).open();
                }
              }
            >
              <i className="material-icons left">add</i>
              Add device
            </button>
            <button
              className="btn waves-effect waves-light indigo"
              style={{ marginLeft: '20px', marginBottom: '20px' }}
              onClick={
                e => {
                  this.props.history.push('/devices/createDeviceType');
                }
              }
            >
              <i className="material-icons left">add</i>
              Add device type
            </button>
          </span>
        </div>
      );
    }
}

export default Devices;
