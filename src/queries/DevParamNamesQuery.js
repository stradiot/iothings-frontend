import React, { Component } from 'react';
import { Query } from "react-apollo";
import gql from "graphql-tag";

import ErrorModal from '../components/ErrorModal';

class DevParamNamesQuery extends Component {
  render(){
    return (
      <Query
        query={gql`
          query {
            AllDeviceParams {
              paramId
              name
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

          const options = data.AllDeviceParams.map(({paramId, name}) => (
            <option key={paramId} value={paramId}>{name}</option>
          ));

          let defaultValue = 'default';

          if (this.props.paramId !== undefined) {
            defaultValue = this.props.paramId;
          }

          return (
            <select defaultValue={defaultValue} className="browser-default" onChange={this.props.onSelect}>
              <option value="default" disabled>Choose parameter</option>
              {options}
            </select>
          );
        }}
      </Query>
    );
  }
}

export default DevParamNamesQuery;
