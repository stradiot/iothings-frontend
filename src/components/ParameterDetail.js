import React, { Component } from 'react';
import M from "materialize-css";
import moment from 'moment';

class ParameterDetail extends Component {
    state = {
      name: '',
      device: {},
      value: '',
      units: '',
      timestamp: 0,
      polled: false,
      rrdEnable: false,
      parameter: {},
      protocol: {},
      details: ''
    }
    show = (data) => {
      this.setState(data);
      const modal = document.getElementById('modal');
      M.Modal.getInstance(modal).open();
    }
    componentDidMount() {
      const modal = document.getElementById('modal');
      M.Modal.init(modal);
      this.props.setClick(this.show);
    }
    render(){
      return (
        <div className="modal" id="modal">
          <h5>Parameter details</h5>
          <ul className="collection">
            <li className="collection-item left-align">
              <div>
                Name
                <div className="secondary-content indigo-text">
                  {this.state.name}
                </div>
              </div>
            </li>
            <li className="collection-item left-align">
              <div>
                Device
                <div className="secondary-content indigo-text">
                  {this.state.device.name}
                </div>
              </div>
            </li>
            <li className="collection-item left-align">
              <div>
                Value
                <div className="secondary-content indigo-text">
                  {this.state.value}
                </div>
              </div>
            </li>
            <li className="collection-item left-align">
              <div>
                Units
                <div className="secondary-content indigo-text">
                  {this.state.units}
                </div>
              </div>
            </li>
            <li className="collection-item left-align">
              <div>
                Updated
                <div className="secondary-content indigo-text">
                  {moment.unix(this.state.timestamp).format('D/M/Y HH:mm:ss')}
                </div>
              </div>
            </li>
            <li className="collection-item left-align">
              <div>
                Polled
                <div className="secondary-content indigo-text">
                  {this.state.polled.toString()}
                </div>
              </div>
            </li>
            <li className="collection-item left-align">
              <div>
                RRD logging
                <div className="secondary-content indigo-text">
                  {this.state.rrdEnable.toString()}
                </div>
              </div>
            </li>
            <li className="collection-item left-align">
              <div>
                Parameter
                <div className="secondary-content indigo-text">
                  {this.state.parameter.name}
                </div>
              </div>
            </li>
            <li className="collection-item left-align">
              <div>
                Protocol
                <div className="secondary-content indigo-text">
                  {this.state.protocol.name}
                </div>
              </div>
            </li>
            <li className="collection-item left-align">
              <div>
                Details
                <div className="secondary-content indigo-text">
                  {this.state.details}
                </div>
              </div>
            </li>
          </ul>
          <div className="modal-footer">
            {
              this.props.polled ?
                <button className="btn waves-effect waves-light indigo">Show RRD history
                  <i className="material-icons right">timeline</i>
                </button>
              :
              <button className="btn disabled waves-effect waves-light indigo">Show RRD history
                <i className="material-icons right">timeline</i>
              </button>
            }
          </div>
        </div>
      );
    }
}

export default ParameterDetail;
