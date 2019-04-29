import React from 'react';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

import RemoveDeviceModal from '../../components/devices/RemoveDeviceModal';

const REMOVE_DEVICE = gql`
  mutation($devId: Int!){
    removeDevice(devId: $devId){
      success
    }
  }
`;

const RemoveDevice = ({ devId, name, data, refetchDevices }) => {
  return (
    <Mutation mutation={REMOVE_DEVICE}>
      {(removeDevice) => (
        <RemoveDeviceModal
          devId={devId}
          name={name}
          removeDevice={removeDevice}
          refetchDevices={refetchDevices}
        />
      )}
    </Mutation>
  );
};

export default RemoveDevice;
