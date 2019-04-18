import React, { Component } from 'react';
import M from "materialize-css";

class ErrorModal extends Component {
    componentDidMount() {
      const modal = document.getElementById('errorModal');
      M.Modal.init(modal);
      M.Modal.getInstance(modal).open();
    }
    render(){
      return (
        <div style={{ maxWidth: "500px", overflow: "hidden", borderRadius: "20px"}} className="modal red white-text" id="errorModal">
          <div className="card red z-depth-0">
            <div className="card-content white-text">
              <span className="card-title">
                <i style={{ fontSize: "48px" }} className="left material-icons prefix">error</i>
                <p style={{ fontWeight: "bold", fontSize: "30px" }} className="center">Error</p>
              </span>
              <div className="section">
                <p className="flow-text">{this.props.message}</p>
              </div>
            </div>
          </div>
        </div>
      );
    }
}

export default ErrorModal;
