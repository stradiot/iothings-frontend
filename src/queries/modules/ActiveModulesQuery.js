import React from 'react';
import { Query } from "react-apollo";
import gql from "graphql-tag";

import ActiveModulesTable from '../../components/modules/ActiveModulesTable';

const ACTIVE_MODULES = gql`
  query{
    ActiveModules{
      moduleId
      info
      available
      type
    }
  }
`;

const ActiveModulesQuery = () => (
  <Query query={ACTIVE_MODULES}>
    {({ loading, error, data }) => {
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
        <ActiveModulesTable data={data.ActiveModules}/>
      );
    }}
  </Query>
);

export default ActiveModulesQuery;
