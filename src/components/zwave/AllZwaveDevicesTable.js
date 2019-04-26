import React, { Component } from 'react';

import ZwaveDeviceQuery from '../../queries/zwave/ZwaveDeviceQuery';

class AllZwaveDevicesTable extends Component {
  componentDidMount(){
    this.props.subscribeToNodeAdded();
    this.props.subscribeToNodeRemoved();
    this.props.subscribeToNodeReady();
  }
  render(){
    const rows = this.props.data.map(device => {
      const { moduleId, nodeId } = device;

      return (
        <ZwaveDeviceQuery key={`${moduleId}${nodeId}`} data={device} history={this.props.history}/>
      );
    });

    return (
      <div>
        <table className="responsive-table centered highlight">
          <thead>
            <tr>
                <th>Module ID</th>
                <th>Node ID</th>
                <th>Manufacturer</th>
                <th>Product</th>
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

export default AllZwaveDevicesTable;
