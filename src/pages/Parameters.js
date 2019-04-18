import React, { Component } from 'react';
import AllDevParamsQuery from '../queries/AllDevParamsQuery';

class Parameters extends Component {
    render(){
      return (
        <div style={{ marginTop: "50px" }} className="container section center">
          <AllDevParamsQuery history={this.props.history}/>
        </div>
      );
    }
}

export default Parameters;
