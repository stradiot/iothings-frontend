import React, { Component } from 'react';
import M from "materialize-css";
import moment from 'moment';

const onRowClick = (paramId) => {
  const modal = document.getElementById(`DeviceParameterDetail${paramId}`);
  M.Modal.getInstance(modal).open();
}

class DeviceDetail extends Component {
  componentDidMount() {
    const modal = document.getElementById(`DeviceDetail${this.props.data.devId}`);
    M.Modal.init(modal);
  }
  render(){
    const data = this.props.data;
    const parameters = data.parameters.map(parameter => (
      <tr key={`${parameter.paramId}`} style={{ cursor: 'pointer' }}>
        <td onClick={() => onRowClick(parameter.paramId)}>
          {parameter.name}
        </td>
        <td onClick={() => onRowClick(parameter.paramId)}>
          {parameter.value}
        </td>
        <td onClick={() => onRowClick(parameter.paramId)}>
          {parameter.units}
        </td>
        <td onClick={() => onRowClick(parameter.paramId)}>
          {parameter.parameter.name}
        </td>
      </tr>
    ));

    return (
      <div
        style={{ cursor: 'default', textAlign: 'left' }}
        className="modal"
        id={`DeviceDetail${data.devId}`}>
        <div className="card indigo" style={{ margin: '0px' }}>
         <div style={{ padding: '10px' }} className="card-content white-text">
          <ul style={{ border: 'none' }} className="collection">
            <b>
              <li
                style={{ border: 'none', paddingTop: '0px', paddingBottom: '5px' }}
                className="collection-item left-align indigo">
                <div>
                  Name
                  <div className="secondary-content white-text">
                    {data.name}
                  </div>
                </div>
              </li>
              <li
                style={{ border: 'none', paddingTop: '0px', paddingBottom: '5px' }}
                className="collection-item left-align indigo">
                <div>
                  Supplier
                  <div className="secondary-content white-text">
                    {data.type.supplier}
                  </div>
                </div>
              </li>
              <li
                style={{ border: 'none', paddingTop: '0px', paddingBottom: '5px' }}
                className="collection-item left-align indigo">
                <div>
                  Model
                  <div className="secondary-content white-text">
                    {data.type.model}
                  </div>
                </div>
              </li>
              <li
                style={{ border: 'none', paddingTop: '0px', paddingBottom: '5px' }}
                className="collection-item left-align indigo">
                <div>
                  Type
                  <div className="secondary-content white-text">
                    {data.type.type}
                  </div>
                </div>
              </li>
              <li
                style={{ border: 'none', paddingTop: '0px', paddingBottom: '0px' }}
                className="collection-item left-align indigo">
                <div>
                  Created
                  <div className="secondary-content white-text">
                    {moment.unix(data.created).format('Y-M-D HH:mm:ss')}
                  </div>
                </div>
              </li>
              <li
                style={{ border: 'none', paddingTop: '0px', paddingBottom: '0px' }}
                className="collection-item left-align indigo">
                <div>
                  Details
                  <div className="secondary-content white-text">
                    {data.details}
                  </div>
                </div>
              </li>
            </b>
          </ul>
         </div>
       </div>

        <table className="responsive-table centered highlight">
          <thead>
            <tr>
              <th>Parameter name</th>
              <th>Value</th>
              <th>Units</th>
              <th>Parameter</th>
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

export default DeviceDetail;
