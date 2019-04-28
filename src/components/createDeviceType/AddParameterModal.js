import React, { Component } from 'react';
import M from "materialize-css";

class AddParameterModal extends Component {
  constructor(props) {
    super(props);
    this.nameInput = React.createRef();
  }
  state = {
    name: ''
  }
  handleNameInput = (e) => {
    this.setState({
      name: e.target.value
    });
  }
  componentDidMount() {
    const modal = document.getElementById(`AddParameterModal`);
    M.Modal.init(modal, { endingTop: '35%', onOpenEnd: () => this.nameInput.current.focus() });
  }
  render(){
    return (
      <div
        style={{ maxWidth: "500px", borderRadius: "20px", padding: "20px" }}
        className="modal" id='AddParameterModal'>
        <div className="container center">
          <form
            onSubmit={e => {
              e.preventDefault();
              this.props.addParameter({
                variables: { name: this.state.name }
              });
              this.nameInput.current.value = '';
              const modal = document.getElementById("AddParameterModal");
              M.Modal.getInstance(modal).close();
              this.props.refetchParameters();
            }}
          >

            <div className="input-field">
              <input type="text" ref={this.nameInput} onChange={this.handleNameInput}/>
              <label>Name</label>
            </div>

            <button className="btn waves-effect waves-light indigo" type="submit">
              Add parameter
            </button>
          </form>
        </div>
      </div>
    );
  }

}

export default AddParameterModal;
