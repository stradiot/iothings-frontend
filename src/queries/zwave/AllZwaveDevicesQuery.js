import React, { Component } from 'react';
import { Query } from "react-apollo";
import gql from "graphql-tag";

import AllZwaveDevicesTable from '../../components/zwave/AllZwaveDevicesTable';
import ZwaveAddNodeMutation from '../../mutations/zwave/ZwaveAddNode';
import ZwaveRemoveNodeMutation from '../../mutations/zwave/ZwaveRemoveNode';

const ALL_ZWAVE_DEVICES = gql`
  query {
    AllZwaveDevices{
      moduleId
      nodeId
      manufacturer
      product
      type
    }
  }
`;

const NODE_REMOVED = gql`
  subscription{
    zwaveNodeRemoved{
      moduleId
      nodeId
    }
  }
`;

const NODE_READY = gql`
  subscription{
    zwaveNodeReady{
      moduleId
      nodeId
      product
      type
      manufacturer
    }
  }
`;

class AllZwaveDevicesQuery extends Component {
  render() {
    return (
      <Query query={ALL_ZWAVE_DEVICES}>
        {({ subscribeToMore, loading, error, data }) => {
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
          );

          return (
            <div>
              <AllZwaveDevicesTable
                data={data.AllZwaveDevices}
                history={this.props.history}
                subscribeToNodeRemoved={() =>
                  subscribeToMore({
                    document: NODE_REMOVED,
                    updateQuery: (prev, { subscriptionData }) => {
                      if (!subscriptionData.data) return prev;

                      const removedNode = subscriptionData.data.zwaveNodeRemoved;

                      const filteredPrev = prev.AllZwaveDevices.filter(device =>
                        device.moduleId !== removedNode.moduleId ||
                          device.nodeId !== removedNode.nodeId
                      );

                      return {
                        AllZwaveDevices: [ ...filteredPrev ]
                      };
                    }
                  })
                }
                subscribeToNodeReady={() =>
                  subscribeToMore({
                    document: NODE_READY,
                    updateQuery: (prev, { subscriptionData }) => {
                      if (!subscriptionData.data) return prev;

                      const nodeReady = subscriptionData.data.zwaveNodeReady;

                      return {
                        AllZwaveDevices: [ ...prev.AllZwaveDevices, nodeReady ]
                      };
                    }
                  })
                }
              />
              <ZwaveAddNodeMutation data={data.AllZwaveDevices}/>
              <ZwaveRemoveNodeMutation data={data.AllZwaveDevices}/>
            </div>
          );
        }}
      </Query>
    )}
}

export default AllZwaveDevicesQuery;
