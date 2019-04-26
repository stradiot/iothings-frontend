import React, { Component } from 'react';
import M from "materialize-css";

class ZwaveMapping extends Component {
  componentDidMount() {
    const selects = document.querySelectorAll('select');
    M.FormSelect.init(selects);
  }
  render(){
    const linked = this.props.zwaveData.parameters.reduce((acc, act) => {
      act.devParamId !== null && acc.push(act.devParamId);
      return acc;
    }, []);

    const items = this.props.data.map(({ name, paramId }) => {
      return linked.includes(paramId) ?
        (<option disabled key={paramId} value={paramId}>{name}</option>)
      : (<option key={paramId} value={paramId}>{name}</option>);
    });

    const rows = this.props.zwaveData.parameters.map(({ name, valueId, devParamId }) => (
      <tr key={valueId}>
        <td style={{  padding: '0px' }}>
          <div style={{ fontSize: '1.2rem' }}>
            {name}
          </div>
        </td>
        <td style={{ padding: '0px' }}>
          <div style={{ fontSize: '1.2rem' }}>
            {valueId}
          </div>
        </td>
        <td style={{ padding: '0px' }}>
          <div style={{ margin: '0px' }} className="input-field inline right">
            <select
              id="a"
              defaultValue={devParamId === null ? 'none' : `${devParamId}`}
              style={{ padding: '0 30px 0 10px' }}
              onChange={(e) => {
                this.props.mapZwave({
                  variables: {
                    valueId,
                    moduleId: this.props.zwaveData.moduleId,
                    paramId: e.target.value === 'none' ? null : Number(e.target.value)
                  }
                });
                this.props.refetchZwave();
              }}
            >
              <option value="none">None</option>
              {items}
            </select>
          </div>
        </td>
      </tr>
    ));

    return (
      <div className="section center">
        <table className="centered" style={{ tableLayout: 'fixed', arginTop: '30px' }}>
          <tbody>
            <tr/>
            {rows}
          </tbody>
        </table>
      </div>
    );
  }

}

export default ZwaveMapping;
