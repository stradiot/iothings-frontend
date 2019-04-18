import React from 'react';
import { Query } from "react-apollo";
import gql from "graphql-tag";
import M from "materialize-css";
import moment from 'moment';

import ParameterDetail from '../components/ParameterDetail';
import ErrorModal from '../components/ErrorModal';

import SetValue from '../mutations/SetValue';

var onRowClick;

const AllDevParamsQuery = ({ history }) => (
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
      )

      const rows = data.AllDeviceParams.map(param => {
        const { paramId, name, value, units, protocol, timestamp, device } = param;
        return (
          <tr key={`${paramId}`}>
            <td onClick={() => onRowClick(param)}>{name}</td>
            <td onClick={() => onRowClick(param)}>{device.name}</td>
            <td onClick={() => onRowClick(param)}>{value}</td>
            <td onClick={() => onRowClick(param)}>{units}</td>
            <td onClick={() => onRowClick(param)}>{protocol.name}</td>
            <td onClick={() => onRowClick(param)}>{moment.unix(timestamp).format('Y-M-D HH:mm:ss')}</td>
            <td>
              <div>
                <SetValue paramId={paramId}></SetValue>
                <button className="btn waves-effect waves-light indigo" onClick={
                  e => {
                    const modal = document.getElementById(`SetValue${paramId}`);
                    M.Modal.getInstance(modal).open();
                  }
                }>
                  <i className="material-icons">settings</i>
                </button>
              </div>
            </td>
          </tr>
        );
      });

      return (
        <div>
          <ParameterDetail history={history} setClick={click => onRowClick = click}/>
          <table className="responsive-table highlight centered">
            <thead>
              <tr>
                  <th>Parameter</th>
                  <th>Device</th>
                  <th>Value</th>
                  <th>Units</th>
                  <th>Protocol</th>
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
