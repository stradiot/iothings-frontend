import React, { Component } from 'react';
import { ApolloConsumer } from "react-apollo";
import gql from "graphql-tag";
import M from "materialize-css";

import DeviceDetail from '../../components/devices/DeviceDetail';
import DeviceParameterDetail from '../../components/devices/DeviceParameterDetail';

import RemoveDeviceMutation from '../../mutations/devices/RemoveDevice';


const DEVICE = gql`
  query ($devId: Int!){
    Device(devId: $devId){
      devId
      name
      created
      details
      type{
        supplier
        model
        type
        details
      }
      parameters{
        paramId
        name
        value
        units
        timestamp
        rrdEnable
        polled
        details
        protocol{
          name
        }
        parameter{
          name
        }
      }
    }
  }
`;

class DeviceQuery extends Component {
  state = {
    ...this.props.data,
    parameters: []
  }
  onRowClick = async (client) => {
    const { devId } = this.props.data;

    const { data } = await client.query({
      query: DEVICE,
      variables: {
        devId
      }
    });

    this.setState({ ...data.Device });

    const modal = document.getElementById(`DeviceDetail${devId}`);
    M.Modal.getInstance(modal).open();
  };

  render() {
    const { devId, name, type, parameters } = this.state;

    const paramDetails = parameters.map(param => (
      <DeviceParameterDetail key={param.paramId} data={{ ...param }}/>
    ));

    return (
      <ApolloConsumer>
        {(client) => (
          <tr key={`${devId}`} style={{ cursor: 'pointer' }}>
            <td onClick={() => this.onRowClick(client)}>{name}</td>
            <td onClick={() => this.onRowClick(client)}>{type.model}</td>
            <td onClick={() => this.onRowClick(client)}>{type.supplier}</td>
            <td onClick={() => this.onRowClick(client)}>{type.type}</td>
            <td>
              {paramDetails}
              <DeviceDetail data={this.state}/>
              <RemoveDeviceMutation
                refetchDevices={this.props.refetchDevices}
                devId={devId}
                name={name}
              />
              <button
                className="btn-small waves-effect waves-light red lighten-1"
                onClick={(e) => {
                  const modal = document.getElementById(`RemoveDeviceModal${devId}`);
                  M.Modal.getInstance(modal).open();
                }}>
                <i className="material-icons">clear</i>
              </button>
            </td>
          </tr>
        )}
      </ApolloConsumer>
    );
  }
}

export default DeviceQuery;
