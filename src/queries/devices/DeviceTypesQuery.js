import React from 'react';
import { Query } from "react-apollo";
import gql from "graphql-tag";

import AddDeviceModal from '../../components/devices/AddDeviceModal';

const DEVICE_TYPES = gql`
  query{
    DeviceTypes{
      typeId
      supplier
      model
    }
  }
`;

const DeviceTypesQuery = ({ addDevice, refetchDevices }) => (
  <Query query={DEVICE_TYPES}>
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

      return (
        <AddDeviceModal
          data={data.DeviceTypes}
          addDevice={addDevice}
          refetchDevices={refetchDevices}
        />
      );
    }}
  </Query>
);

export default DeviceTypesQuery;
