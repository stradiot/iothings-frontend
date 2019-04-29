import React, { Component } from 'react';

import AddDeviceTypeMutation from '../mutations/createDeviceType/AddDeviceType';

class CreateDeviceType extends Component {
  render(){
    return (
      <div style={{ marginTop: "50px" }} className="container center">
        <AddDeviceTypeMutation history={this.props.history}/>
      </div>
    );
  }
}

export default CreateDeviceType;
