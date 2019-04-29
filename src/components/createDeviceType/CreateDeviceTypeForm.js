import React, { Component } from 'react';
import M from "materialize-css";

import AddParameterModal from './AddParameterModal';

const validateConfig = (config) => {
  const { supplier, model, type, parameters } = config;

  if (!(supplier && model && type)) {
    return false;
  }

  if (parameters.length === 0) {
    return false;
  }

  for (const param of parameters) {
    const { paramId, protocolId, name, defVal } = param;

    if (!(paramId && protocolId && name && defVal)) {
      return false;
    }
  }

  return true;
};

class CreateDeviceTypeForm extends Component {
  componentDidUpdate() {
    const selects = document.querySelectorAll('select');
    M.FormSelect.init(selects);
  }
  state = {
    supplier: null,
    model: null,
    type: null,
    details: null,
    parameters: []
  }
  render(){
    const parameterOptions = this.props.parameters.map(({ name, paramId }) => (
      <option key={paramId} value={paramId}>{name}</option>
    ));

    const protocolOptions = this.props.protocols.map(({ name, protocolId }) => (
      <option key={protocolId} value={protocolId}>{name}</option>
    ));

    const paramForms = this.state.parameters.map((parameter, index) => (
      <div key={index} className="card-panel">
        <div className="row">
          <div className="col s6">
            <div className="input-field">
              <select defaultValue="default" onChange={(e) => {
                if (e.target.value === 'new') {
                  const modal = document.getElementById('AddParameterModal');
                  M.Modal.getInstance(modal).open();
                } else {
                  const updated = [ ...this.state.parameters ];
                  updated[index].paramId = Number(e.target.value);
                  this.setState({ parameters: updated });
                }
              }}>
                <option value="default" disabled>Choose parameter</option>
                {parameterOptions}
                <option value="new">Add new parameter</option>
              </select>
            </div>
          </div>
          <div className="col s6">
            <div className="input-field">
              <select defaultValue="default" onChange={(e) => {
                const updated = [ ...this.state.parameters ];
                updated[index].protocolId = Number(e.target.value);
                this.setState({ parameters: updated });
              }}>
                <option value="default" disabled>Choose protocol</option>
                {protocolOptions}
              </select>
            </div>
          </div>
          <div className="col s6">
            <div className="input-field">
              <input type="text" onChange={(e) => {
                const updated = [ ...this.state.parameters ];
                updated[index].name = e.target.value;
                this.setState({ parameters: updated });
              }}/>
              <label>Name</label>
            </div>
          </div>
          <div className="col s6">
            <div className="input-field">
              <input type="text" onChange={(e) => {
                const updated = [ ...this.state.parameters ];
                updated[index].units = e.target.value;
                this.setState({ parameters: updated });
              }}/>
              <label>Units</label>
            </div>
          </div>
          <div className="col s6">
            <div className="input-field">
              <input type="text" onChange={(e) => {
                const updated = [ ...this.state.parameters ];
                updated[index].defVal = e.target.value;
                this.setState({ parameters: updated });
              }}/>
              <label>Default value</label>
            </div>
          </div>
          <div className="col s6">
            <div className="input-field">
              <input type="text" onChange={(e) => {
                const updated = [ ...this.state.parameters ];
                updated[index].details = e.target.value;
                this.setState({ parameters: updated });
              }}/>
              <label>Details</label>
            </div>
          </div>
          <div className="col s12" style={{ marginTop: '20px' }}>
            <label>
              <input type="checkbox" onChange={(e) => {
                const updated = [ ...this.state.parameters ];
                updated[index].rrdEnable = e.target.checked;
                this.setState({ parameters: updated });
              }}/>
              <span style={{ fontSize: '1.5rem' }}>RRD logging</span>
            </label>
          </div>
        </div>
      </div>
    ));

    return (
      <div className="container center">
        <AddParameterModal
          addParameter={this.props.addParameter}
          refetchParameters={this.props.refetchParameters}
        />
        <h4 className="indigo-text">Create new device type</h4>
        <form>
          <div className="row">
            <div className="col s6">
              <div className="input-field">
                <input
                  type="text"
                  onChange={(e) => this.setState({ supplier: e.target.value })}
                />
                <label>Supplier</label>
              </div>
            </div>
            <div className="col s6">
              <div className="input-field">
                <input
                  type="text"
                  onChange={(e) => this.setState({ model: e.target.value })}
                />
                <label>Model</label>
              </div>
            </div>
            <div className="col s6">
              <div className="input-field">
                <input
                  type="text"
                  onChange={(e) => this.setState({ type: e.target.value })}
                />
                <label>Type</label>
              </div>
            </div>
            <div className="col s6">
              <div className="input-field">
                <input
                  type="text"
                  onChange={(e) => this.setState({ details: e.target.value })}
                />
                <label>Details</label>
              </div>
            </div>
          </div>
          <div className="divider"></div>
          <h5
            style={{ marginBottom: '20px' }}
            className="indigo-text">
            Parameters
          </h5>
          {paramForms}
        </form>
        <span>
          <button
            className="btn waves-effect waves-light indigo"
            style={{ marginRight: '20px', marginBottom: '20px' }}
            onClick={(e) => {
              const arr = this.state.parameters.concat({ rrdEnable: false });
              this.setState({ parameters: arr });              }
            }>
            <i className="material-icons left">add</i>
            Add parameter
          </button>
          <button
            className="btn waves-effect waves-light indigo"
            style={{ marginLeft: '20px', marginRight: '20px', marginBottom: '20px' }}
            onClick={(e) => {
              const arr = this.state.parameters.slice(0, this.state.parameters.length - 1);
              this.setState({ parameters: arr });
            }}>
            <i className="material-icons left">clear</i>
            Remove parameter
          </button>
          {
            !validateConfig(this.state) ?
              <button
                className="btn disabled"
                style={{
                  marginRight: '20px',
                  marginLeft: '20px',
                  marginBottom: '20px'
                }}>
                <i className="material-icons left">done</i>
                Submit
              </button>
            : <button
                className="btn waves-effect waves-light indigo"
                style={{ marginRight: '20px', marginLeft: '20px', marginBottom: '20px' }}
                onClick={(e) => {
                  this.props.parameters.length && this.props.addDeviceType({
                    variables: {
                      config: this.state
                    }
                  });

                  this.props.parameters.length && this.props.history.goBack();
                }}>
                <i className="material-icons left">done</i>
                Submit
              </button>
          }
        </span>
      </div>
    );
  }
}

export default CreateDeviceTypeForm;
