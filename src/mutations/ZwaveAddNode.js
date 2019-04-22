import React from 'react';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

import ZwaveAddNodeModal from "../components/zwave/ZwaveAddNodeModal";

const ZWAVE_ADD_NODE = gql`
  mutation($moduleId: ID!){
    zwaveAddNode(moduleId: $moduleId){
      success
    }
  }
`;

const ZwaveAddNode = ({ data }) => {
  return (
    <Mutation mutation={ZWAVE_ADD_NODE}>
      {(zwaveAddNode) => (
        <ZwaveAddNodeModal zwaveAddNode={zwaveAddNode} data={data}></ZwaveAddNodeModal>
      )}
    </Mutation>
  );
};

export default ZwaveAddNode;
