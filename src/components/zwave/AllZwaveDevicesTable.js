import React, { Component } from 'react';

class AllZwaveDevicesTable extends Component {
  componentDidMount(){
    this.props.subscribeToNodeAdded();
    this.props.subscribeToNodeRemoved();
    this.props.subscribeToNodeReady();
  }
  render(){
    const rows = this.props.data.map(device => {
      const { moduleId, nodeId, manufacturer, product, type } = device;
      return (
        <tr key={`${moduleId}${nodeId}`} style={{ cursor: 'default' }}>
          <td>{moduleId}</td>
          <td>{nodeId}</td>
          <td>{manufacturer}</td>
          <td>{product}</td>
          <td>{type}</td>
          <td>
            <button className="btn waves-effect waves-light indigo">
              <i className="material-icons">map</i>
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
