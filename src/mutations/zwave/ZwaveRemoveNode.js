import React from 'react';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

import ZwaveRemoveNodeModal from "../../components/zwave/ZwaveRemoveNodeModal";

const ZWAVE_REMOVE_NODE = gql`
  mutation($moduleId: ID!){
    zwaveRemoveNode(moduleId: $moduleId){
      success
    }
  }
`;

const ZwaveRemoveNode = ({ data }) => {
  return (
    <Mutation mutation={ZWAVE_REMOVE_NODE}>
      {(zwaveRemoveNode) => (
        <ZwaveRemoveNodeModal zwaveRemoveNode={zwaveRemoveNode} data={data}></ZwaveRemoveNodeModal>
      )}
    </Mutation>
  );
};

export default ZwaveRemoveNode;
