import React, { Component } from 'react';
import { Query } from "react-apollo";
import gql from "graphql-tag";

import ErrorModal from '../../components/common/ErrorModal';
import DeviceSelect from '../../components/mapZwave/DeviceSelect';

const query = gql`
  query{
    Devices{
      devId
      name
    }
  }
`;

class DeviceNamesQuery extends Component {
  render() {
    return (
      <Query query={query}>
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
          );

          return (
            <DeviceSelect onChange={this.props.onChange} data={data.Devices}/>
          );
        }}
      </Query>
    )}
}

export default DeviceNamesQuery;
