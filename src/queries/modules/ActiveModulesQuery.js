import React from 'react';
import { Query } from "react-apollo";
import gql from "graphql-tag";

import ErrorModal from '../../components/common/ErrorModal';
import ActiveModulesTable from '../../components/modules/ActiveModulesTable';

const ActiveModulesQuery = () => (
  <Query
    query={gql`
        query{
          ActiveModules{
            moduleId
            info
            available
            type
          }
        }
    `}
  >
    {({ loading, error, data }) => {
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
        <ActiveModulesTable data={data.ActiveModules}/>
      );
    }}
  </Query>
);

export default ActiveModulesQuery;
