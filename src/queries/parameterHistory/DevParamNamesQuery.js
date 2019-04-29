import React, { Component } from 'react';
import { Query } from "react-apollo";
import gql from "graphql-tag";

import ParameterSelect from '../../components/parameterHistory/ParameterSelect';

const ALL_DEVICE_PARAMS = gql`
  query {
    AllDeviceParams {
      paramId
      name
      rrdEnable
    }
  }
`;

class DevParamNamesQuery extends Component {
  render(){
    return (
      <Query query={ALL_DEVICE_PARAMS}>
        {({ loading, error, data }) => {
          if (error) {
            return null;
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
