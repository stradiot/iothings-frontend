import React, { Component } from 'react';
import M from "materialize-css";

class DeviceSelect extends Component {
  componentDidMount() {
    const select = document.getElementById('DeviceSelect');
    M.FormSelect.init(select);
  }
  render(){
    const options = this.props.data.map(({ devId, name }) => (
      <option key={devId} value={devId}>{name}</option>
    ));

    return (
      <select
        id="DeviceSelect"
        onChange={this.props.onChange}
        defaultValue={ 'default' }>
        <option value="default" disabled>Choose device</option>
        {options}
      </select>
    );
  }
}

export default DeviceSelect;
