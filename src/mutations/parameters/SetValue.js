import React from 'react';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

import SetValueModal from "../../components/parameters/SetValueModal";

const SET_VALUE = gql`
  mutation setValue($paramId: Int!, $value: String!) {
    setValue(paramId: $paramId, value: $value) {
      value
    }
  }
`;

const SetValue = ({ paramId }) => {
  return (
    <Mutation mutation={SET_VALUE}>
      {(setValue) => (      
        <SetValueModal setValue={setValue} paramId={paramId}/>
      )}
    </Mutation>
  );
};

export default SetValue;
