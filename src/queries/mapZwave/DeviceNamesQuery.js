import React, { Component } from 'react';
import { Query } from "react-apollo";
import gql from "graphql-tag";

import DeviceSelect from '../../components/mapZwave/DeviceSelect';

const DEVICES = gql`
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
      <Query query={DEVICES}>
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
          );

          return (
            <DeviceSelect onChange={this.props.onChange} data={data.Devices}/>
          );
        }}
      </Query>
    )}
}

export default DeviceNamesQuery;
