import React from 'react';
import { Query } from "react-apollo";
import gql from "graphql-tag";
import moment from 'moment';

import ParameterDetail from '../components/ParameterDetail';

var onRowClick;

const AllDevParamsQuery = ({ modal }) => (
  <Query
    query={gql`
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
    `}
  >
    {({ loading, error, data }) => {
      if (error) return <p>{error.toString()}</p>;

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

      const rows = data.AllDeviceParams.map(param => {
        const { paramId, name, value, units, timestamp, device } = param;
        return (
          <tr onClick={() => onRowClick(param)} key={`${paramId}`}>
            <td>{name}</td>
            <td>{device.name}</td>
            <td>{value}</td>
            <td>{units}</td>
            <td>{moment.unix(timestamp).format('D/M/Y HH:mm:ss')}</td>
            <td>
              <button className="btn waves-effect waves-light indigo" id="13">
                Set value
              </button>
            </td>
          </tr>
        );
      });

      return (
        <div>
          <ParameterDetail setClick={click => onRowClick = click}/>
          <table className="responsive-table highlight centered">
            <thead>
              <tr>
                  <th>Parameter</th>
                  <th>Device</th>
                  <th>Value</th>
                  <th>Units</th>
                  <th>Updated</th>
              </tr>
            </thead>
            <tbody>
              {rows}
            </tbody>
          </table>
        </div>
      );
    }}
  </Query>
);

export default AllDevParamsQuery;
