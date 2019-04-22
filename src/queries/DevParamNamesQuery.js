import React, { Component } from 'react';
import { Query } from "react-apollo";
import gql from "graphql-tag";

import ErrorModal from '../components/common/ErrorModal';
import ParameterSelect from '../components/parameterHistory/ParameterSelect';

class DevParamNamesQuery extends Component {
  render(){
    return (
      <Query
        query={gql`
          query {
            AllDeviceParams {
              paramId
              name
              rrdEnable
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

          if (loading) return null;

          const parameters = data.AllDeviceParams.filter(({ rrdEnable }) => rrdEnable);

          return (
            <ParameterSelect
              paramId={this.props.paramId}
              onChange={this.props.onChange}
              data={parameters}
            />
          );
        }}
      </Query>
    );
  }
}

export default DevParamNamesQuery;
