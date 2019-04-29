import React from 'react';
import { Query } from "react-apollo";
import gql from "graphql-tag";

import AddParameterMutation from '../../mutations/createDeviceType/AddParameter';

const PARAMETERS_AND_PROTOCOLS = gql`
  query{
    Parameters{
      paramId
      name
    }
    Protocols{
      protocolId
      name
    }
  }
`;

const ProtocolsAndParametersQuery = ({ addDeviceType, history }) => (
  <Query query={PARAMETERS_AND_PROTOCOLS}>
    {({ loading, error, data, refetch }) => {
      if (error) {
        return null;
      }

      if (loading) return(
        <div className="preloader-wrapper big active">
          <div className="spinner-layer spinner-blue-only">
            <div className="circle-clipper left">
              <div className="circle"></div>
            </div><div className="gap-patch">
              <div className="circle"></div>
            </div><div className="circle-clipper right">
              <div className="circle"></div>
            </div>
          </div>
        </div>
      )

      return (
        <AddParameterMutation
          history={history}
          parameters={data.Parameters}
          protocols={data.Protocols}
          refetchParameters={refetch}
          addDeviceType={addDeviceType}
        />
      );
    }}
  </Query>
);

export default ProtocolsAndParametersQuery;
