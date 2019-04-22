import React, { Component } from 'react';
import M from "materialize-css";
import moment from 'moment';

import ParameterDetail from './ParameterDetail';

import SetValue from '../../mutations/SetValue';

const onRowClick = (paramId) => {
  const modal = document.getElementById(`Parameter${paramId}`);
  M.Modal.getInstance(modal).open();
}

class AllDevParamsTable extends Component {
  componentDidMount() {
    this.props.subscribeToParamUpdates();
  }
  render(){
    const rows = this.props.data.map(param => {
      const { paramId, name, value, units, protocol, timestamp, device } = param;

      return (
        <tr key={`${paramId}`} style={{ cursor: 'pointer' }}>
          <td onClick={() => onRowClick(paramId)}>{name}</td>
          <td onClick={() => onRowClick(paramId)}>{device.name}</td>
          <td onClick={() => onRowClick(paramId)}>{value}</td>
          <td onClick={() => onRowClick(paramId)}>{units}</td>
          <td onClick={() => onRowClick(paramId)}>{protocol.name}</td>
          <td onClick={() => onRowClick(paramId)}>
            {moment.unix(timestamp).format('Y-M-D HH:mm:ss')}
          </td>
          <td>
            <ParameterDetail history={this.props.history} data={param}/>
            <SetValue paramId={paramId}></SetValue>
            <button className="btn waves-effect waves-light indigo" onClick={
              e => {
                const modal = document.getElementById(`SetValue${paramId}`);
                M.Modal.getInstance(modal).open();
              }
            }>
              <i className="material-icons">settings</i>
            </button>
          </td>
        </tr>
      );
    });

    return (
      <div>
        <table className="responsive-table highlight centered">
          <thead>
            <tr>
                <th>Parameter</th>
                <th>Device</th>
                <th>Value</th>
                <th>Units</th>
                <th>Protocol</th>
                <th>Updated</th>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
    );
  }
}

export default AllDevParamsTable;
