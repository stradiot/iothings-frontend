import React, { Component } from 'react';
import M from "materialize-css";

import AddDeviceTypeMutation from '../mutations/createDeviceType/AddDeviceType';

class CreateDeviceType extends Component {
    render(){
      return (
        <div style={{ marginTop: "50px" }} className="container center">
          <AddDeviceTypeMutation/>
        </div>
      );
    }
}

export default CreateDeviceType;
