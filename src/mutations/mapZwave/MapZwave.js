import React from 'react';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

import ZwaveDevParamsQuery from '../../queries/mapZwave/ZwaveDevParamsQuery';

const MAP_ZWAVE = gql`
  mutation ($paramId: Int, $valueId: ID!, $moduleId: ID!){
    mapZwave(paramId: $paramId, valueId: $valueId, moduleId: $moduleId){
      success
    }
  }
`;

const MapZwave = ({ data, devId }) => {
  return (
    <Mutation mutation={MAP_ZWAVE}>
      {(mapZwave) => (
        <ZwaveDevParamsQuery mapZwave={mapZwave} data={data} devId={devId}/>
      )}
    </Mutation>
  );
};

export default MapZwave;
