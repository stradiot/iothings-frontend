import React, { Component } from 'react';
import { Query } from "react-apollo";
import gql from "graphql-tag";

import AllDevParamsTable from '../../components/parameters/AllDevParamsTable';

const ALL_DEVICE_PARAMS = gql`
  query {
    AllDeviceParams {
      paramId
      parameter {
        name
      }
      protocol {
        name
      }
      name
      value
      units
      timestamp
      rrdEnable
      polled
      details
      device {
        name
      }
    }
  }
`;

const PARAM_UPDATED = gql`
  subscription {
    paramUpdated{
      paramId,
      value,
      timestamp,
      polled
    }
  }
`;

class AllDevParamsQuery extends Component {
  render() {
    return (
      <Query query={ALL_DEVICE_PARAMS}>
        {({ subscribeToMore, loading, error, data }) => {

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
          );

          return (
            <AllDevParamsTable
              history={this.props.history}
              data={data.AllDeviceParams}
              subscribeToParamUpdates={() =>
                subscribeToMore({
                  document: PARAM_UPDATED,
                  updateQuery: (prev, { subscriptionData }) => {
                    if (!subscriptionData.data) return prev;

                    const paramUpdated = subscriptionData.data.paramUpdated;

                    let updatedParam = prev.AllDeviceParams.find((param) =>
                      param.paramId === paramUpdated.paramId
                    );

                    if (updatedParam) {
                      updatedParam = Object.assign(updatedParam, paramUpdated);
                    }

                    return prev;
                  }
                })
              }
            />
          );
        }}
      </Query>
    )}
}

export default AllDevParamsQuery;
