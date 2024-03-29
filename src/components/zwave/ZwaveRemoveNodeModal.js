import React, { Component } from 'react';
import M from "materialize-css";
import { uniqBy } from "lodash";

class ZwaveRemoveNodeModal extends Component {
  componentDidMount() {
    const modal = document.getElementById(`ZwaveRemoveNodeModal`);
    M.Modal.init(modal, { endingTop: '35%' });

    const select = document.getElementById(`ZwaveRemoveNodeSelect`);
    M.FormSelect.init(select);
  }
  state = {
    moduleId: undefined
  }
  handleSubmit = (e) => {
    e.preventDefault();

    this.props.zwaveRemoveNode({
      variables: { moduleId: this.state.moduleId }
    });

    const modal = document.getElementById('ZwaveRemoveNodeModal');
    M.Modal.getInstance(modal).close();
  }
  render(){
    const options = uniqBy(this.props.data, 'moduleId').map(module => (
      <option key={module.moduleId} value={module.moduleId}>
        {module.moduleId}
      </option>
    ));

    return (
      <div
        style={{ maxWidth: "500px", borderRadius: "20px", padding: "20px" }}
        className="modal" id="ZwaveRemoveNodeModal">
        <div className="container center">
          <form onSubmit={this.handleSubmit}>
            <div className="input-field">
              <select
                id="ZwaveRemoveNodeSelect"
                onChange={(e) => this.setState({ moduleId: e.target.value })}
                defaultValue="default">
                <option value="default" disabled>Choose module</option>
                {options}
              </select>
            </div>

            {
              this.state.moduleId === undefined ?
                <button className="btn disabled" type="submit">
                  Remove device
                </button>
              : <button
                  className="btn waves-effect waves-light indigo"
                  type="submit">
                  Remove device
                </button>
            }
          </form>
        </div>
      </div>
    );
  }
}

export default ZwaveRemoveNodeModal;
