import React, { Component } from 'react';
import { Query } from "react-apollo";
import gql from "graphql-tag";

import ErrorModal from '../../components/common/ErrorModal';
import ZwaveMapping from '../../components/mapZwave/ZwaveMapping';

const query = gql`
  query ($devId: Int!){
    Device(devId: $devId){
      parameters{
        name
        paramId
      }
    }
  }
`;

class DeviceParamsQuery extends Component {
  render() {
    const { devId } = this.props;

    return (
      <Query query={query} variables={{ devId }}>
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
            <ZwaveMapping
             mapZwave={this.props.mapZwave}
             refetchZwave={this.props.refetchZwave}
             zwaveData={this.props.data}
             data={data.Device.parameters}
           />
          );
        }}
      </Query>
    );
  }
}

export default DeviceParamsQuery;
