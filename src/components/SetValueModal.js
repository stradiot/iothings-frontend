import React, { Component } from 'react';
import M from "materialize-css";

class SetValueModal extends Component {
  constructor(props) {
    super(props);
    this.valueInput = React.createRef();
  }
  state = {
    value: ''
  }
  handleValueInput = (e) => {
    this.setState({
      value: e.target.value
    });
  }
  componentDidMount() {
    const modal = document.getElementById(`SetValue${this.props.paramId}`);
    M.Modal.init(modal, { endingTop: '35%', onOpenEnd: () => this.valueInput.current.focus() });
  }
  render(){
    return (
      <div
        style={{ maxWidth: "500px", borderRadius: "20px", padding: "20px" }}
        className="modal" id={`SetValue${this.props.paramId}`}>
        <div className="container center">
          <form
            onSubmit={e => {
              e.preventDefault();
              this.props.setValue({
                variables: { paramId: this.props.paramId, value: this.state.value }
              });
              this.valueInput.current.value = '';
              const modal = document.getElementById(`SetValue${this.props.paramId}`);
              M.Modal.getInstance(modal).close();
            }}
          >

            <div className="input-field">
              <input type="text" ref={this.valueInput} onChange={this.handleValueInput}/>
              <label htmlFor="value">Value</label>
            </div>

            <button className="btn waves-effect waves-light indigo" type="submit">
              Set Value
            </button>
          </form>
        </div>
      </div>
    );
  }

}

export default SetValueModal;
