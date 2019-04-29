import React from 'react';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

import ProtocolsAndParametersQuery from '../../queries/createDeviceType/ProtocolsAndParametersQuery';

const ADD_DEVICE_TYPE = gql`
  mutation ($config: InputDeviceType!){
    addDeviceType(config: $config){
      typeId
    }
  }
`;

const AddDeviceType = ({ history }) => {
  return (
    <Mutation mutation={ADD_DEVICE_TYPE}>
      {(addDeviceType) => (
        <ProtocolsAndParametersQuery
          addDeviceType={addDeviceType}
          history={history}
        />
      )}
    </Mutation>
  );
};

export default AddDeviceType;
