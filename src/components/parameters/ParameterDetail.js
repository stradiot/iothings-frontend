import React, { Component } from 'react';
import M from "materialize-css";
import moment from 'moment';

class ParameterDetail extends Component {
  componentDidMount() {
    const modalName = `ParameterDetail${this.props.data.paramId}`;
    const modal = document.getElementById(modalName);
    M.Modal.init(modal);
  }
  render(){
    return (
      <div className="modal" id={`ParameterDetail${this.props.data.paramId}`}>
        <div className="card-panel" style={{ margin: '0px', padding: '10px' }}>
          <ul style={{ border: 'none' }} className="collection">
            <b>
              <li
                style={{
                  border: 'none',
                  paddingTop: '0px',
                  paddingBottom: '5px'
                }}
                className="collection-item left-align">
                <div>
                  Name
                  <div className="secondary-content indigo-text">
                    {this.props.data.name}
                  </div>
                </div>
              </li>
              <li
                style={{
                  border: 'none',
                  paddingTop: '0px',
                  paddingBottom: '5px'
                }}
                className="collection-item left-align">
                  <div>
                    Device
                    <div className="secondary-content indigo-text">
                      {this.props.data.device.name}
                    </div>
                  </div>
              </li>
              <li
                style={{
                  border: 'none',
                  paddingTop: '0px',
                  paddingBottom: '5px'
                }}
                className="collection-item left-align">
                  <div>
                    Value
                    <div className="secondary-content indigo-text">
                      {this.props.data.value}
                    </div>
                  </div>
              </li>
              <li
                style={{
                  border: 'none',
                  paddingTop: '0px',
                  paddingBottom: '5px'
                }}
                className="collection-item left-align">
                  <div>
                    Units
                    <div className="secondary-content indigo-text">
                      {this.props.data.units}
                    </div>
                  </div>
              </li>
              <li
                style={{
                  border: 'none',
                  paddingTop: '0px',
                  paddingBottom: '5px'
                }}
                className="collection-item left-align">
                  <div>
                    Updated
                    <div className="secondary-content indigo-text">
                      {moment.unix(this.props.data.timestamp).format('Y-M-D HH:mm:ss')}
                    </div>
                  </div>
              </li>
              <li
                style={{
                  border: 'none',
                  paddingTop: '0px',
                  paddingBottom: '5px'
                }}
                className="collection-item left-align">
                  <div>
                    Polling
                    <div className="secondary-content indigo-text">
                      {this.props.data.polled ? 'enabled' : 'disabled'}
                    </div>
                  </div>
              </li>
              <li
                style={{
                  border: 'none',
                  paddingTop: '0px',
                  paddingBottom: '5px'
                }}
                className="collection-item left-align">
                  <div>
                    RRD logging
                    <div className="secondary-content indigo-text">
                      {this.props.data.rrdEnable ? 'enabled' : 'disabled'}
                    </div>
                  </div>
              </li>
              <li
                style={{
                  border: 'none',
                  paddingTop: '0px',
                  paddingBottom: '5px'
                }}
                className="collection-item left-align">
                  <div>
                    Parameter
                    <div className="secondary-content indigo-text">
                      {this.props.data.parameter.name}
                    </div>
                  </div>
              </li>
              <li
                style={{
                  border: 'none',
                  paddingTop: '0px',
                  paddingBottom: '5px'
                }}
                className="collection-item left-align">
                  <div>
                    Protocol
                    <div className="secondary-content indigo-text">
                      {this.props.data.protocol.name}
                    </div>
                  </div>
              </li>
              <li
                style={{
                  border: 'none',
                  paddingTop: '0px',
                  paddingBottom: '5px'
                }}
                className="collection-item left-align">
                  <div>
                    Details
                    <div className="secondary-content indigo-text">
                      {this.props.data.details}
                    </div>
                  </div>
              </li>
            </b>
          </ul>
        </div>
        <div className="modal-footer">
          {
            this.props.data.rrdEnable ?
              <button className="btn waves-effect waves-light indigo" onClick={(e) => {
                  e.preventDefault();
                  this.props.history.push({
                    pathname: '/parameterHistory',
                    state: { paramId: this.props.data.paramId }
                  })
                }}>
                Show RRD history
                <i className="material-icons right">timeline</i>
              </button>
            :
            <button className="btn disabled">
              Show RRD history
              <i className="material-icons right">timeline</i>
            </button>
          }
        </div>
      </div>
    );
  }
}

export default ParameterDetail;
