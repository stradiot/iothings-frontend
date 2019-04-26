import React, { Component } from 'react';
import { Query } from "react-apollo";
import gql from "graphql-tag";

import ErrorModal from '../../components/common/ErrorModal';
import AllZwaveDevicesTable from '../../components/zwave/AllZwaveDevicesTable';
import ZwaveAddNodeMutation from '../../mutations/zwave/ZwaveAddNode';
import ZwaveRemoveNodeMutation from '../../mutations/zwave/ZwaveRemoveNode';

const query = gql`
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

const NODE_ADDED_SUBSCRIPTION = gql`
  subscription{
    zwaveNodeAdded{
      moduleId
      nodeId
    }
  }
`;

const NODE_REMOVED_SUBSCRIPTION = gql`
  subscription{
    zwaveNodeRemoved{
      moduleId
      nodeId
    }
  }
`;

const NODE_READY_SUBSCRIPTION = gql`
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
      <Query query={query}>
        {({ subscribeToMore, loading, error, data }) => {

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
          );

          return (
            <div>
              <AllZwaveDevicesTable
                data={data.AllZwaveDevices}
                history={this.props.history}
                subscribeToNodeAdded={() =>
                  subscribeToMore({
                    document: NODE_ADDED_SUBSCRIPTION,
                    updateQuery: (prev, { subscriptionData }) => {
                      if (!subscriptionData.data) return prev;

                      const addedNode = {
                        ...subscriptionData.data.zwaveNodeAdded,
                        manufacturer: '',
                        product: '',
                        type: '',
                        parameters: []
                      };

                      return {
                        AllZwaveDevices: [
                          ...prev.AllZwaveDevices,
                          addedNode
                        ]
                      };
                    }
                  })
                }
                subscribeToNodeRemoved={() =>
                  subscribeToMore({
                    document: NODE_REMOVED_SUBSCRIPTION,
                    updateQuery: (prev, { subscriptionData }) => {
                      if (!subscriptionData.data) return prev;

                      const removedNode = subscriptionData.data.zwaveNodeRemoved;

                      const filteredPrev = prev.AllZwaveDevices.filter(device =>
                        device.moduleId !== removedNode.moduleId ||
                          device.nodeId !== removedNode.nodeId
                      );

                      return {
                        AllZwaveDevices: [
                          ...filteredPrev
                        ]
                      };
                    }
                  })
                }
                subscribeToNodeReady={() =>
                  subscribeToMore({
                    document: NODE_READY_SUBSCRIPTION,
                    updateQuery: (prev, { subscriptionData }) => {
                      if (!subscriptionData.data) return prev;

                      const nodeReady = subscriptionData.data.zwaveNodeReady;

                      let prevNode = prev.AllZwaveDevices.find(device =>
                        device.moduleId === nodeReady.moduleId &&
                          device.nodeId === nodeReady.nodeId
                      );

                      if (prevNode) {
                        prevNode = Object.assign(prevNode, nodeReady);
                      }

                      return prev;
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
