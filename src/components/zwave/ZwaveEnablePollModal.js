import React, { Component } from 'react';
import M from "materialize-css";

class ZwaveEnablePollModal extends Component {
  componentDidMount() {
    const { moduleId, valueId, pollIntensity } = this.props;
    const modal = document.getElementById(`ZwaveEnablePollModal${moduleId}${valueId}`);
    M.Modal.init(modal, { endingTop: '35%' });

    this.setState({ intensity: pollIntensity });
  }
  state = {
    intensity: 0
  }
  render(){
    const { moduleId, valueId } = this.props;

    return (
      <div
        style={{ maxWidth: "500px", borderRadius: "20px", padding: "20px" }}
        className="modal" id={`ZwaveEnablePollModal${moduleId}${valueId}`}>
        <div className="container center">
          <form
            onSubmit={e => {
              e.preventDefault();
              this.props.zwaveEnablePoll({
                variables: {
                  intensity: this.state.intensity,
                  moduleId,
                  valueId
                }
              });
              const modal = document.getElementById(`ZwaveEnablePollModal${moduleId}${valueId}`);
              M.Modal.getInstance(modal).close();
            }}
          >

            <div className="input-field">
              <input value={this.state.intensity} type="text" onChange={(e) => {
                if (!Number.isNaN(Number(e.target.value)) && Number(e.target.value) > 0) {
                  this.setState({
                    intensity: Number(e.target.value)
                  });
                }
              }}/>
              <label className="active">Poll interval (seconds)</label>
            </div>

            {
              this.state.intensity <= 0 ?
                <button className="btn disabled">
                  Set poll
                </button>
              : <button className="btn waves-effect waves-light indigo" type="submit">
                  Set poll
                </button>
            }
          </form>
        </div>
      </div>
    );
  }

}

export default ZwaveEnablePollModal;
