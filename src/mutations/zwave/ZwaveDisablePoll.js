import React from 'react';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

import ZwaveDisablePollModal from "../../components/zwave/ZwaveDisablePollModal";

const ZWAVE_DISABLE_POLL = gql`
  mutation ($moduleId: ID!, $valueId: ID!){
    zwaveDisablePoll(moduleId: $moduleId, valueId: $valueId){
      success
    }
  }
`;

const ZwaveDisablePoll = ({ data }) => {
  return (
    <Mutation mutation={ZWAVE_DISABLE_POLL}>
      {(zwaveDisablePoll) => (
        <ZwaveDisablePollModal
          zwaveDisablePoll={zwaveDisablePoll}
          moduleId={data.moduleId}
          valueId={data.valueId}
          name={data.name}
        />
      )}
    </Mutation>
  );
};

export default ZwaveDisablePoll;
