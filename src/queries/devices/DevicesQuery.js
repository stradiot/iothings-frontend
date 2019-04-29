import React from 'react';
import { Query } from "react-apollo";
import gql from "graphql-tag";

import DevicesTable from '../../components/devices/DevicesTable';

import AddDeviceMutation from '../../mutations/devices/AddDevice';

const DEVICES = gql`
  query{
    Devices{
      devId
      name
      type{
        type
        model
        supplier
      }
    }
  }
`;

const DevicesQuery = () => (
  <Query query={DEVICES}>
    {({ loading, error, data, refetch }) => {
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
        <>
          <AddDeviceMutation refetchDevices={refetch}/>
          <DevicesTable data={data.Devices} refetchDevices={refetch}/>
        </>
      );
    }}
  </Query>
);

export default DevicesQuery;
