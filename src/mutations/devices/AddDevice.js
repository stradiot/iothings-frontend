import React from 'react';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

import DeviceTypesQuery from '../../queries/devices/DeviceTypesQuery';

const ADD_DEVICE = gql`
  mutation($typeId: Int!, $name: String!, $details: String){
    addDevice(typeId: $typeId, name: $name, details: $details){
      devId
    }
  }
`;

const AddDevice = ({ data, refetchDevices }) => {
  return (
    <Mutation mutation={ADD_DEVICE}>
      {(addDevice) => (
        <DeviceTypesQuery addDevice={addDevice} refetchDevices={refetchDevices}/>
      )}
    </Mutation>
  );
};

export default AddDevice;
