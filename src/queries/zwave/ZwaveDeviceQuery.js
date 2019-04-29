import React, { Component, Fragment } from 'react';
import { ApolloConsumer } from "react-apollo";
import gql from "graphql-tag";
import M from "materialize-css";

import ZwaveEnablePoll from '../../mutations/zwave/ZwaveEnablePoll';
import ZwaveDisablePoll from '../../mutations/zwave/ZwaveDisablePoll';

import ZwaveDeviceDetail from '../../components/zwave/ZwaveDeviceDetail';
import ZwaveParameterDetail from '../../components/zwave/ZwaveParameterDetail';

const ZWAVE_DEVICE = gql`
  query ($moduleId: ID!, $nodeId: Int!){
    ZwaveDevice(moduleId: $moduleId, nodeId: $nodeId){
      moduleId
      nodeId
      manufacturer
      product
      type
      parameters{
        name
        devParamId
        valueId
        value
        units
        help
        writable
        possibleValues
        polled
        pollIntensity
      }
    }
  }
`;

class ZwaveDeviceQuery extends Component {
  state = {
    ...this.props.data,
    parameters: []
  }
  onRowClick = async (client) => {
    const { moduleId, nodeId } = this.props.data;

    const { data } = await client.query({
      query: ZWAVE_DEVICE,
      variables: {
        moduleId: moduleId,
        nodeId: nodeId
      }
    });

    this.setState({ ...data.ZwaveDevice });

    const modalName = `ZwaveDeviceDetail${moduleId}${nodeId}`;
    const modal = document.getElementById(modalName);
    M.Modal.getInstance(modal).open();
  };

  onMapClick = async (client) => {
    const { moduleId, nodeId } = this.props.data;

    const { data } = await client.query({
      query: ZWAVE_DEVICE,
      variables: {
        moduleId: moduleId,
        nodeId: nodeId
      }
    });

    this.props.history.push({
      pathname: '/zwave/mapZwave',
      state: {
        moduleId: data.ZwaveDevice.moduleId,
        nodeId: data.ZwaveDevice.nodeId,
        product: data.ZwaveDevice.product
      }
    });
  };

  render() {
    const {
      moduleId,
      nodeId,
      manufacturer,
      product,
      type,
      parameters
    } = this.state;

    const paramDetails = parameters.map(param => (
      <Fragment key={`${moduleId}${param.valueId}`}>
        <ZwaveParameterDetail data={{ ...param, moduleId, nodeId }}/>
        <ZwaveEnablePoll
          data={{
            moduleId,
            valueId: param.valueId,
            pollIntensity: param.pollIntensity
          }}
        />
        <ZwaveDisablePoll
          data={{ moduleId, valueId: param.valueId, name: param.name }}
        />
      </Fragment>
    ));

    return (
      <ApolloConsumer>
        {client => (
           <tr style={{ cursor: 'pointer' }}>
            <td onClick={() => this.onRowClick(client)}>{moduleId}</td>
            <td onClick={() => this.onRowClick(client)}>{nodeId}</td>
            <td onClick={() => this.onRowClick(client)}>{manufacturer}</td>
            <td onClick={() => this.onRowClick(client)}>{product}</td>
            <td onClick={() => this.onRowClick(client)}>{type}</td>
            <td>
              {paramDetails}
              <ZwaveDeviceDetail data={this.state}/>
              <button
                className="btn waves-effect waves-light indigo"
                onClick={() => this.onMapClick(client)}>
                <i className="material-icons">map</i>
              </button>
            </td>
          </tr>
        )}
      </ApolloConsumer>
    );
  }
}

export default ZwaveDeviceQuery;
