import React from 'react';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

import CreateDeviceTypeForm from '../../components/createDeviceType/CreateDeviceTypeForm';

const ADD_PARAMETER = gql`
  mutation($name: String!){
    addParameter(name: $name){
      paramId
    }
  }
`;

const AddParameter = ({ addDeviceType, parameters, protocols, refetchParameters }) => {
  return (
    <Mutation mutation={ADD_PARAMETER}>
      {(addParameter) => (
        <CreateDeviceTypeForm
          parameters={parameters}
          protocols={protocols}
          addDeviceType={addDeviceType}
          addParameter={addParameter}
          refetchParameters={refetchParameters}
        />
      )}
    </Mutation>
  );
};

export default AddParameter;
