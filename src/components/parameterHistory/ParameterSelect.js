import React, { Component } from 'react';
import M from "materialize-css";

class ParameterSelect extends Component {
  componentDidMount() {
    const select = document.getElementById('ParameterSelect');
    M.FormSelect.init(select);
  }
  render(){
    const options = this.props.data.map(({ paramId, name }) => (
      <option key={paramId} value={paramId}>{name}</option>
    ));

    return (
      <select
        id="ParameterSelect"
        onChange={this.props.onChange}
        defaultValue={ this.props.paramId ? this.props.paramId : 'default' }>
        <option value="default" disabled>Choose parameter</option>
        {options}
      </select>
    );
  }
}

export default ParameterSelect;
