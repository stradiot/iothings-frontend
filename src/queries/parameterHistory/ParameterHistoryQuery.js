import React, { Component } from 'react';
import { Query } from "react-apollo";
import gql from "graphql-tag";

import TimeSeriesChart from '../../components/parameterHistory/TimeSeriesChart';

const PARAM_HISTORY = gql`
  query($paramId: Int!, $start: Int!, $end: Int!, $resolution: Int!){
    ParamHistory(paramId: $paramId, start: $start, end: $end, resolution: $resolution){
      data{
        timestamp
        value
      }
    }
  }
`;

class ParameterHistoryQuery extends Component {
  render(){
    const { paramId, start, end, resolution } = this.props;
    if (
      !(paramId || start || end || resolution)
    ) return null;

    return (
      <Query query={PARAM_HISTORY} variables={{ ...this.props }}>
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

          const timeseries = data.ParamHistory.data.map(({timestamp, value}) => (
            [timestamp * 1000,value]
          ));

          return (
            <TimeSeriesChart className="center-block" data={timeseries}/>
          );
        }}
      </Query>
    );
  }
}

export default ParameterHistoryQuery;
