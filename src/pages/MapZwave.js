import React, { Component } from 'react';

import DeviceNamesQuery from '../queries/mapZwave/DeviceNamesQuery';
import MapZwaveMutation from '../mutations/mapZwave/MapZwave';

class MapZwave extends Component {
  componentWillMount() {
    if(this.props.location.state === undefined){
      this.props.history.goBack();
    }
  }
  state = {
    devId: null
  }
  render(){
    const { product, moduleId } = this.props.location.state;

    return (
      <div className="container section center">
        <h4 className="indigo-text">
          {`Mapping of Z-Wave device ${product} on module ${moduleId}`}
        </h4>
        <br/>
        <div style={{ maxWidth: '500px' }} className="input-field center-block">
          <DeviceNamesQuery onChange={(e) => this.setState({
            devId: e.target.value
          })}
        />
        </div>
        {
          this.state.devId === null ?
            null
          :  <MapZwaveMutation
              data={this.props.location.state}
              devId={Number(this.state.devId)}
            />
        }
      </div>
    );
  }
}

export default MapZwave;
