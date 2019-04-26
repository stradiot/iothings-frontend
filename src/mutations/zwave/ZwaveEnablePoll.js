import React from 'react';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

import ZwaveEnablePollModal from "../../components/zwave/ZwaveEnablePollModal";

const ZWAVE_ENABLE_POLL = gql`
  mutation ($moduleId: ID!, $valueId: ID!, $intensity: Int!){
    zwaveEnablePoll(moduleId: $moduleId, valueId: $valueId, intensity: $intensity){
      success
    }
  }
`;

const ZwaveEnablePoll = ({ data }) => {
  return (
    <Mutation mutation={ZWAVE_ENABLE_POLL}>
      {(zwaveEnablePoll) => (
        <ZwaveEnablePollModal
          zwaveEnablePoll={zwaveEnablePoll}
          moduleId={data.moduleId}
          valueId={data.valueId}
          pollIntensity={data.pollIntensity}
        />
      )}
    </Mutation>
  );
};

export default ZwaveEnablePoll;
