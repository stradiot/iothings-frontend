import React, { Component } from 'react';
import M from "materialize-css";

const onRowClick = (moduleId, valueId) => {
  const modal = document.getElementById(`ZwaveParameterDetail${moduleId}${valueId}`);
  M.Modal.getInstance(modal).open();
}

class ZwaveDeviceDetail extends Component {
    componentDidMount() {
      const modal = document.getElementById(`ZwaveDeviceDetail${this.props.data.moduleId}${this.props.data.nodeId}`);
      M.Modal.init(modal);
    }
    render(){
      const data = this.props.data;
      const parameters = data.parameters.map(parameter => (
        <tr key={`${data.moduleId}${parameter.valueId}`} style={{ cursor: 'default' }}>
          <td onClick={() => onRowClick(data.moduleId, parameter.valueId)}>{parameter.name}</td>
          <td onClick={() => onRowClick(data.moduleId, parameter.valueId)}>{parameter.valueId}</td>
          <td onClick={() => onRowClick(data.moduleId, parameter.valueId)}>{parameter.value}</td>
          <td>
            <button
              style={{ display: 'block' }}
              className="btn-small waves-effect waves-light indigo"
              onClick={() => {
                const modal = document.getElementById(`ZwaveEnablePollModal${data.moduleId}${parameter.valueId}`);
                M.Modal.getInstance(modal).open();
              }}
              >
              <i className="material-icons">update</i>
            </button>
            { parameter.polled ?
              <button
                style={{ display: 'block' }}
                className="btn-small waves-effect waves-light red"
                onClick={() => {
                  const modal = document.getElementById(`ZwaveDisablePollModal${data.moduleId}${parameter.valueId}`);
                  M.Modal.getInstance(modal).open();
                }}
                >
                <i className="material-icons">update</i>
              </button>
            : <button
              style={{ display: 'block' }}
              className="btn-small disabled"
              >
                <i className="material-icons">update</i>
              </button>
            }
          </td>
        </tr>
      ));

      return (
        <div
          style={{ cursor: 'default', textAlign: 'left' }}
          className="modal"
          id={`ZwaveDeviceDetail${data.moduleId}${data.nodeId}`}
          >
          <div className="card indigo" style={{ margin: '0px' }}
            >
           <div style={{ padding: '10px' }} className="card-content white-text">
            <ul style={{ border: 'none' }} className="collection">
              <b>
                <li
                  style={{ border: 'none', paddingTop: '0px', paddingBottom: '5px' }}
                  className="collection-item left-align indigo"
                  >
                   <div>
                     Module ID
                     <div className="secondary-content white-text">
                       {data.moduleId}
                     </div>
                   </div>
                </li>
                <li
                  style={{ border: 'none', paddingTop: '0px', paddingBottom: '5px' }}
                  className="collection-item left-align indigo"
                  >
                  <div>
                     Node ID
                     <div className="secondary-content white-text">
                       {data.nodeId}
                     </div>
                   </div>
                </li>
                <li
                  style={{ border: 'none', paddingTop: '0px', paddingBottom: '5px' }}
                  className="collection-item left-align indigo"
                  >
                  <div>
                     Manufacturer
                     <div className="secondary-content white-text">
                       {data.manufacturer}
                     </div>
                   </div>
                </li>
                <li
                  style={{ border: 'none', paddingTop: '0px', paddingBottom: '5px' }}
                  className="collection-item left-align indigo"
                  >
                  <div>
                     Product
                     <div className="secondary-content white-text">
                       {data.product}
                     </div>
                   </div>
                </li>
                <li
                  style={{ border: 'none', paddingTop: '0px', paddingBottom: '0px' }}
                  className="collection-item left-align indigo"
                  >
                   <div>
                     Type
                     <div className="secondary-content white-text">
                       {data.type}
                     </div>
                   </div>
                </li>
              </b>
            </ul>
           </div>
         </div>


          <table className="responsive-table centered">
            <thead>
              <tr>
                  <th>Parameter</th>
                  <th>Value ID</th>
                  <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {parameters}
            </tbody>
          </table>
        </div>
      );
    }
}

export default ZwaveDeviceDetail;
