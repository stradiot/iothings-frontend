import React, { Component } from 'react';
import {
    Charts,
    ChartContainer,
    ChartRow,
    YAxis,
    LineChart,
    Resizable,
    styler
} from "react-timeseries-charts";
import { TimeSeries } from "pondjs";

const LineStyler = styler([
    { key: "value", color: "#3f51b5", width: 2 }
]);

const markerStyle = {
  backgroundColor: 'rgba(63, 81, 181, 0.5)',
  color: "black",
  marginLeft: "5px",
  borderStyle: "solid",
  borderWidth: "thin",
  borderRadius: "7px",
  padding: "5px"
};

class TimeSeriesChart extends Component {
  series = new TimeSeries({
      columns: ["time", "value"],
      points: this.props.data
  })
  state = {
    timerange: this.series.timerange(),
    tracker: null,
    trackerX: null,
    trackerEvent: null
  }
  render(){
    return (
      <div className="section">
        { this.state.tracker ?
          <div style={{position: 'relative'}}>
              <div style={{position: 'absolute', left: this.state.trackerX}}>
                  <div style={markerStyle}>
                    {
                      new Intl.DateTimeFormat('sk-SK', {
                          year: 'numeric',
                          month: 'numeric',
                          day: 'numeric',
                          hour: 'numeric',
                          minute: 'numeric',
                          second: 'numeric'
                        }).format(this.state.tracker)
                    }
                    <br/>
                    <br/>
                    {
                      this.state.trackerEvent.get('value') === null ?
                      null
                      : this.state.trackerEvent.get('value').toFixed(4)
                    }
                  </div>
              </div>
          </div>
        : null }
        <Resizable>
          <ChartContainer
            timeRange={this.state.timerange}
            onTimeRangeChanged={(timerange) => this.setState({ timerange })}
            onTrackerChanged={(tracker, scale) =>
              this.setState({
                tracker,
                trackerX: tracker && scale(tracker),
                trackerEvent: tracker && this.series.at(this.series.bisect(tracker))
              })
            }
            trackerPosition={this.state.tracker}
            enableDragZoom={true}
            maxTime={this.series.range().end()}
            minTime={this.series.range().begin()}
            minDuration={1000 * 60 * 60 * 24 * 30}
            timeAxisStyle={{
              axis: { stroke: "black", strokeWidth: 2 },
              ticks: { stroke: "black" },
              values: { "font-size": "1rem" }
            }}
            >
              <ChartRow height="400">
                  <YAxis
                    id="axisY"
                    min={this.series.min()}
                    max={this.series.max()}
                    width="60"
                    type="linear"
                    format=",.2f"
                    transition={300}
                    style={{
                      axis: { stroke: "black", "stroke-width": 2 },
                      ticks: { stroke: "black" },
                      values: { "font-size": "0.9rem" }
                    }}
                  />
                  <Charts>
                      <LineChart axis="axisY" series={this.series} style={LineStyler}/>
                  </Charts>
              </ChartRow>
          </ChartContainer>
        </Resizable>
      </div>
    );
  }
}


export default TimeSeriesChart;
