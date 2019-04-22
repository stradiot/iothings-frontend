import React, { Component } from 'react';
import M from "materialize-css";

import RestartModule from '../../mutations/RestartModule';

class ActiveModulesTable extends Component {
  render(){
    const rows = this.props.data.map(module => {
      const { moduleId, info, available, type } = module;
      return (
        <tr key={`${moduleId}`} style={{ cursor: 'default' }}>
          <td>{moduleId}</td>
          <td>{info}</td>
          <td>{available ? 'Available' : 'Not available'}</td>
          <td>{type}</td>
          <td>
            <RestartModule moduleId={moduleId}/>
            <button className="btn waves-effect waves-light indigo" onClick={
              e => {
                const modal = document.getElementById(`RestartModule${moduleId}`);
                M.Modal.getInstance(modal).open();
              }
            }>
              <i className="material-icons">refresh</i>
            </button>
          </td>
        </tr>
      );
    });

    return (
      <div>
        <table className="responsive-table centered">
          <thead>
            <tr>
                <th>Module ID</th>
                <th>Information</th>
                <th>Availability</th>
                <th>Type</th>
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

export default ActiveModulesTable;
