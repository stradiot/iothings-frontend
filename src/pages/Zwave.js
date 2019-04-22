import React, { Component } from 'react';
import M from "materialize-css";

import AllZwaveDevicesQuery from '../queries/AllZwaveDevicesQuery';

class Zwave extends Component {
    render(){
      return (
        <div style={{ marginTop: "50px" }} className="container section center">
          <AllZwaveDevicesQuery/>
          <span style={{ position: 'absolute', bottom: 0, right: '15%' }}>
            <button
              className="btn waves-effect waves-light indigo"
              style={{ marginRight: '20px', marginBottom: '20px' }}
              onClick={
                e => {
                  const modal = document.getElementById(`ZwaveAddNodeModal`);
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
                  const modal = document.getElementById(`ZwaveRemoveNodeModal`);
                  M.Modal.getInstance(modal).open();
                }
              }
            >
              <i className="material-icons left">clear</i>
              Remove device
            </button>
          </span>
        </div>
      );
    }
}

export default Zwave;
