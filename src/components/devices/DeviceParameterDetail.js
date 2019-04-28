import React, { Component } from 'react';
import M from "materialize-css";
import moment from 'moment';

class DeviceParameterDetail extends Component {
  componentDidMount() {
    const modal = document.getElementById(`DeviceParameterDetail${this.props.data.paramId}`);
    M.Modal.init(modal);
  }
  render(){
    const {
      paramId,
      name,
      value,
      units,
      timestamp,
      rrdEnable,
      polled,
      details,
      protocol,
      parameter
    } = this.props.data;

    return (
      <div
        style={{ maxHeight: '100%', cursor: 'default', textAlign: 'left' }}
        className="modal"
        id={`DeviceParameterDetail${paramId}`}
        >
        <div className="card-panel" style={{ margin: '0px' }}>
          <ul style={{ border: 'none' }} className="collection">
            <b>
              <li
                style={{ border: 'none', paddingTop: '0px', paddingBottom: '5px' }}
                className="collection-item left-align"
                >
                 <div>
                   Parameter name
                   <div className="secondary-content indigo-text">
                     {name}
                   </div>
                 </div>
              </li>
              <li
                style={{ border: 'none', paddingTop: '0px', paddingBottom: '5px' }}
                className="collection-item left-align"
                >
                 <div>
                   Parameter
                   <div className="secondary-content indigo-text">
                     {parameter.name}
                   </div>
                 </div>
              </li>
              <li
                style={{ border: 'none', paddingTop: '0px', paddingBottom: '5px' }}
                className="collection-item left-align"
                >
                 <div>
                  Value
                  <div className="secondary-content indigo-text">
                     {value}
                   </div>
                 </div>
              </li>
              <li
                style={{ border: 'none', paddingTop: '0px', paddingBottom: '5px' }}
                className="collection-item left-align"
                >
                 <div>
                   Units
                   <div className="secondary-content indigo-text">
                     {units}
                   </div>
                 </div>
              </li>
              <li
                style={{ border: 'none', paddingTop: '0px', paddingBottom: '5px' }}
                className="collection-item left-align"
                >
                 <div>
                   Timestamp
                   <div className="secondary-content indigo-text">
                     {moment.unix(timestamp).format('Y-M-D HH:mm:ss')}
                   </div>
                 </div>
              </li>
              <li
                style={{ border: 'none', paddingTop: '0px', paddingBottom: '5px' }}
                className="collection-item left-align"
                >
                 <div>
                   RRD logging
                   <div className="secondary-content indigo-text">
                     {rrdEnable ? 'Enabled' : 'Disabled'}
                   </div>
                 </div>
              </li>
              <li
                style={{ border: 'none', paddingTop: '0px', paddingBottom: '5px' }}
                className="collection-item left-align"
                >
                 <div>
                   Polling
                   <div className="secondary-content indigo-text">
                     {polled ? 'Enabled' : 'Disabled'}
                   </div>
                 </div>
              </li>
              <li
                style={{ border: 'none', paddingTop: '0px', paddingBottom: '5px' }}
                className="collection-item left-align"
                >
                 <div>
                   Protocol
                   <div className="secondary-content indigo-text">
                     {protocol.name}
                   </div>
                 </div>
              </li>
              <li
                style={{ border: 'none', paddingTop: '0px', paddingBottom: '5px' }}
                className="collection-item left-align"
                >
                 <div>
                   Details
                   <div className="secondary-content indigo-text">
                     {details}
                   </div>
                 </div>
              </li>
            </b>
          </ul>
         </div>
       </div>
    );
  }
}

export default DeviceParameterDetail;
