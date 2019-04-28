import React from 'react';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

import CreateDeviceTypeForm from '../../components/createDeviceType/CreateDeviceTypeForm';

import ProtocolsAndParametersQuery from '../../queries/createDeviceType/ProtocolsAndParametersQuery';

const ADD_DEVICE_TYPE = gql`
  mutation ($config: InputDeviceType!){
    addDeviceType(config: $config){
      typeId
    }
  }
`;

const AddDeviceType = () => {
  return (
    <Mutation mutation={ADD_DEVICE_TYPE}>
      {(addDeviceType) => (
        <ProtocolsAndParametersQuery addDeviceType={addDeviceType}/>
      )}
    </Mutation>
  );
};

export default AddDeviceType;
