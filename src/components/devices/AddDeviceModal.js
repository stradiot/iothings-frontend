import React, { Component } from 'react';
import M from "materialize-css";

class AddDeviceModal extends Component {
  constructor(props) {
    super(props);
    this.nameInput = React.createRef();
    this.detailsInput = React.createRef();
  }
  componentDidMount() {
    const modal = document.getElementById(`AddDeviceModal`);
    M.Modal.init(modal, { endingTop: '35%' });

    const select = document.getElementById(`AddDeviceSelect`);
    M.FormSelect.init(select);
  }
  state = {
    typeId: undefined,
    name: '',
    details: ''
  }
  render(){
    const options = this.props.data.map(type => (
        <option key={type.typeId} value={type.typeId}>{type.supplier} {type.model}</option>
      )
    );

    return (
      <div
        style={{ maxWidth: "500px", borderRadius: "20px", padding: "20px" }}
        className="modal" id="AddDeviceModal">
        <div className="container center">
          <form
            onSubmit={e => {
              e.preventDefault();
              this.props.addDevice({
                variables: {
                  typeId: this.state.typeId,
                  name: this.state.name,
                  details: this.state.details
                }
              });
              this.nameInput.current.value = '';
              this.detailsInput.current.value = '';
              const modal = document.getElementById('AddDeviceModal');
              M.Modal.getInstance(modal).close();
              this.props.refetchDevices();
            }}
          >

            <div className="input-field">
              <select
                id="AddDeviceSelect"
                onChange={(e) => this.setState({ typeId: Number(e.target.value) })}
                defaultValue="default"
                >
                <option value="default" disabled>Choose device type</option>
                {options}
              </select>
            </div>

            <div className="input-field">
              <input type="text" ref={this.nameInput} onChange={(e) =>
                this.setState({
                    name: e.target.value
                  })
                }
              />
              <label>Name</label>
            </div>
            <div className="input-field">
              <input type="text" ref={this.detailsInput} onChange={(e) =>
                this.setState({
                    details: e.target.value
                  })
                }
              />
              <label>Details</label>
            </div>

            {
              this.state.typeId === undefined || this.state.name === '' ?
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

export default AddDeviceModal;
