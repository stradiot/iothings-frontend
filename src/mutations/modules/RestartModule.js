import React from 'react';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

import RestartModuleModal from "../../components/modules/RestartModuleModal";

const RESTART_MODULE = gql`
  mutation restartModule($moduleId: ID!) {
    restartModule(moduleId: $moduleId) {
      success
    }
  }
`;

const RestartModule = ({ moduleId }) => {
  return (
    <Mutation mutation={RESTART_MODULE}>
      {(restartModule) => (
        <RestartModuleModal restartModule={restartModule} moduleId={moduleId}></RestartModuleModal>
      )}
    </Mutation>
  );
};

export default RestartModule;
