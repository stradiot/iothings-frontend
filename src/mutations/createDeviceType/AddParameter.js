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

const AddParameter = (props) => {
  const {
    history,
    addDeviceType,
    parameters,
    protocols,
    refetchParameters
  } = props;

  return (
    <Mutation mutation={ADD_PARAMETER}>
      {(addParameter) => (
        <CreateDeviceTypeForm
          history={history}
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
