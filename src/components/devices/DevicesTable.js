import React, { Component } from 'react';

import DeviceQuery from '../../queries/devices/DeviceQuery';

class DevicesTable extends Component {
  render(){
    const rows = this.props.data.map(device => {
      const { devId, name, type } = device;

      return (
        <DeviceQuery
          refetchDevices={this.props.refetchDevices}
          key={devId}
          data={{ devId, name, type }}
        />
      );
    });

    return (
      <div>
        <table className="responsive-table centered highlight">
          <thead>
            <tr>
              <th>Name</th>
              <th>Model</th>
              <th>Supplier</th>
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

export default DevicesTable;
