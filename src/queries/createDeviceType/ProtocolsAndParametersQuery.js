import React from 'react';
import { Query } from "react-apollo";
import gql from "graphql-tag";

import ErrorModal from '../../components/common/ErrorModal';

import AddParameterMutation from '../../mutations/createDeviceType/AddParameter';

const ProtocolsAndParametersQuery = ({ addDeviceType }) => (
  <Query
    query={gql`
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
    `}
  >
    {({ loading, error, data, refetch }) => {
      if (error) {
        const { graphQLErrors, networkError } = error;

        if (networkError) return <ErrorModal message={networkError.message}/>;
        if (graphQLErrors) return graphQLErrors.map(error => <ErrorModal message={error.message}/>);
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
