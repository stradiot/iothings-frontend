import React from 'react';
import { Query } from "react-apollo";
import gql from "graphql-tag";

import ErrorModal from '../../components/common/ErrorModal';
import AddDeviceModal from '../../components/devices/AddDeviceModal';

const DeviceTypesQuery = ({ addDevice, refetchDevices }) => (
  <Query
    query={gql`
      query{
        DeviceTypes{
          typeId
        	supplier
          model
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

      return (
        <AddDeviceModal data={data.DeviceTypes} addDevice={addDevice} refetchDevices={refetchDevices}/>
      );
    }}
  </Query>
);

export default DeviceTypesQuery;
