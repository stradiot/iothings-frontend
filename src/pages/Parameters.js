import React, { Component } from 'react';
import AllDevParamsQuery from '../queries/AllDevParamsQuery';

class Parameters extends Component {
    render(){
      return (
        <div style={{ marginTop: "50px" }} className="container section center">
          <AllDevParamsQuery props="aa"/>
        </div>
      );
    }
}

export default Parameters;
