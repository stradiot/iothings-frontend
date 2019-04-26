import React, { Component } from 'react';
import M from "materialize-css";

class ZwaveParameterDetail extends Component {
  componentDidMount() {
    const modal = document.getElementById(`ZwaveParameterDetail${this.props.data.moduleId}${this.props.data.valueId}`);
    M.Modal.init(modal);
  }
  render(){
    const {
      moduleId,
      nodeId,
      valueId,
      name,
      value,
      units,
      help,
      writable,
      possibleValues,
      polled,
      pollIntensity,
      devParamId
    } = this.props.data;

    return (
      <div
        style={{ maxHeight: '100%', cursor: 'default', textAlign: 'left' }}
        className="modal"
        id={`ZwaveParameterDetail${moduleId}${valueId}`}
        >
        <div className="card-panel" style={{ margin: '0px' }}>
          <ul style={{ border: 'none' }} className="collection">
            <b>
              <li
                style={{ border: 'none', paddingTop: '0px', paddingBottom: '5px' }}
                className="collection-item left-align"
                >
                 <div>
                   Module ID
                   <div className="secondary-content indigo-text">
                     {moduleId}
                   </div>
                 </div>
              </li>
              <li
                style={{ border: 'none', paddingTop: '0px', paddingBottom: '5px' }}
                className="collection-item left-align"
                >
                <div>
                   Node ID
                   <div className="secondary-content indigo-text">
                     {nodeId}
                   </div>
                 </div>
              </li>
              <li
                style={{ border: 'none', paddingTop: '0px', paddingBottom: '5px' }}
                className="collection-item left-align"
                >
                <div>
                   Value ID
                   <div className="secondary-content indigo-text">
                     {valueId}
                   </div>
                 </div>
              </li>
              <li
                style={{ border: 'none', paddingTop: '0px', paddingBottom: '5px' }}
                className="collection-item left-align"
                >
                <div>
                   Name
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
                   Linked to parameter
                   <div className="secondary-content indigo-text">
                     {devParamId}
                   </div>
                 </div>
              </li>
              <li
                style={{ border: 'none', paddingTop: '0px', paddingBottom: '5px' }}
                className="collection-item left-align"
                >
                 <div>
                   Writable
                   <div className="secondary-content indigo-text">
                     {writable ? 'yes' : 'no'}
                   </div>
                 </div>
              </li>
              <li
                style={{ border: 'none', paddingTop: '0px', paddingBottom: '5px' }}
                className="collection-item left-align"
                >
                 <div>
                   Polled
                   <div className="secondary-content indigo-text">
                    {polled ? 'yes' : 'no'}
                   </div>
                 </div>
              </li>
              <li
                style={{ border: 'none', paddingTop: '0px', paddingBottom: '5px' }}
                className="collection-item left-align"
                >
                 <div>
                   Poll intensity
                   <div className="secondary-content indigo-text">
                     {pollIntensity}
                   </div>
                 </div>
              </li>
              <li
                style={{ border: 'none', paddingTop: '0px', paddingBottom: '5px' }}
                className="collection-item left-align"
                >
                 <div>
                   Possible values
                   <div className="secondary-content indigo-text">
                     {possibleValues && possibleValues.map(value =>
                        `[ ${value} ]`
                     )}
                   </div>
                 </div>
              </li>
              <li
                style={{ border: 'none', paddingTop: '0px', paddingBottom: '0px' }}
                className="collection-item left-align"
                >
                 <div>
                   Help
                   <div className="secondary-content indigo-text">
                     {help}
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

export default ZwaveParameterDetail;
