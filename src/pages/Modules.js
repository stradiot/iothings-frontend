import React, { Component } from 'react';

import ActiveModulesQuery from '../queries/modules/ActiveModulesQuery';

class Modules extends Component {
  render(){
    return (
      <div style={{ marginTop: "50px" }} className="container section center">
        <ActiveModulesQuery/>
      </div>
    );
  }
}

export default Modules
