import React, { Component } from 'react';
import { Query } from "react-apollo";
import gql from "graphql-tag";

import ErrorModal from '../../components/common/ErrorModal';
import DeviceParamsQuery from './DeviceParamsQuery';

const query = gql`
  query ($moduleId: ID!, $nodeId: Int!){
    ZwaveDevice(moduleId: $moduleId, nodeId: $nodeId){
      parameters{
        name
        devParamId
        valueId
      }
    }
  }
`;

class ZwaveDevParamsQuery extends Component {
  render(){
    const { moduleId, nodeId } = this.props.data;

    return (
      <Query query={query} variables={{ moduleId, nodeId }}>
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
          );

          return (
            <DeviceParamsQuery
              mapZwave={this.props.mapZwave}
              refetchZwave={refetch}
              data={{
                moduleId,
                nodeId,
                parameters: data.ZwaveDevice.parameters
              }}
              devId={this.props.devId}
            />
          );
        }}
      </Query>
    );
  }
}

export default ZwaveDevParamsQuery;
