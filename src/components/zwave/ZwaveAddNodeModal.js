import React, { Component } from 'react';
import M from "materialize-css";
import { uniqBy } from "lodash";

class ZwaveAddNodeModal extends Component {
  componentDidMount() {
    const modal = document.getElementById(`ZwaveAddNodeModal`);
    M.Modal.init(modal, { endingTop: '35%' });

    const select = document.getElementById(`ZwaveAddNodeSelect`);
    M.FormSelect.init(select);
  }
  state = {
    moduleId: undefined
  }
  render(){
    const options = uniqBy(this.props.data, 'moduleId').map(module => (
        <option key={module.moduleId} value={module.moduleId}>{module.moduleId}</option>
      )
    );

    return (
      <div
        style={{ maxWidth: "500px", borderRadius: "20px", padding: "20px" }}
        className="modal" id="ZwaveAddNodeModal">
        <div className="container center">
          <form
            onSubmit={e => {
              e.preventDefault();
              this.props.zwaveAddNode({
                variables: { moduleId: this.state.moduleId }
              });
              const modal = document.getElementById(`ZwaveAddNodeModal`);
              M.Modal.getInstance(modal).close();
            }}
          >

            <div className="input-field">
              <select
                id="ZwaveAddNodeSelect"
                onChange={(e) => this.setState({ moduleId: e.target.value })}
                defaultValue="default"
                >
                <option value="default" disabled>Choose module</option>
                {options}
              </select>
            </div>

            {
              this.state.moduleId === undefined ?
                <button className="btn waves-effect waves-light indigo disabled" type="submit">
                  Add device
                </button>
              : <button className="btn waves-effect waves-light indigo" type="submit">
                  Add device
                </button>
            }
          </form>
        </div>
      </div>
    );
  }

}

export default ZwaveAddNodeModal;
