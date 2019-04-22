import React, { Component } from 'react';
import M from "materialize-css";

import DevParamNamesQuery from '../queries/DevParamNamesQuery';
import ParameterHistoryQuery from '../queries/ParameterHistoryQuery';

class ParameterHistory extends Component {
  data = {
    paramId: undefined,
    resolution: undefined
  }
  state = {
    paramId: undefined,
    start: undefined,
    end: undefined,
    resolution: undefined
  }
  constructor(props) {
    super(props);
    if (this.props.location.state) {
      this.data.paramId = this.props.location.state.paramId;
    }
    this.startTime = React.createRef();
    this.endTime = React.createRef();
  }
  componentDidMount() {
    const select = document.getElementById('ResolutionSelect');
    M.FormSelect.init(select);

    const startDate = document.getElementById('startDate');
    M.Datepicker.init(startDate, {
      yearRange: 1,
      format: 'yyyy-mm-dd',
      defaultDate: new Date(),
      setDefaultDate: true,
      onClose: () => this.startTime.current.click()
    });

    const endDate = document.getElementById('endDate');
    M.Datepicker.init(endDate, {
      yearRange: 1,
      format: 'yyyy-mm-dd',
      defaultDate: new Date(),
      setDefaultDate: true,
      onClose: () => this.endTime.current.click()
    });

    const timepickers = document.querySelectorAll('.timepicker');
    M.Timepicker.init(timepickers, { twelveHour: false });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const startDatePicker = document.getElementById('startDate');
    const startDate = M.Datepicker.getInstance(startDatePicker).date;

    const startTimePicker = document.getElementById('startTime');
    const startTime = M.Timepicker.getInstance(startTimePicker).time;

    const endDatePicker = document.getElementById('endDate');
    const endDate = M.Datepicker.getInstance(endDatePicker).date;

    const endTimePicker = document.getElementById('endTime');
    const endTime = M.Timepicker.getInstance(endTimePicker).time;

    if (
      !(startTime || endTime || this.data.paramId || this.data.resolution)
    ) return;

    const endSeconds = Number(endTime.split(':')[0]) * 3600 + Number(endTime.split(':')[1]) * 60;
    const end = Math.round(new Date(endDate).getTime()/1000) + endSeconds;

    const startSeconds = Number(startTime.split(':')[0]) * 3600 + Number(startTime.split(':')[1]) * 60;
    const start = Math.round(new Date(startDate).getTime()/1000) + startSeconds;

    this.setState({
      ...this.data,
      start,
      end
    });
  }
  render(){
    return (
      <div className="container section center">
        <form action="" onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="col s6">
              <div className="input-field">
                <DevParamNamesQuery
                  paramId={this.data.paramId}
                  onChange={(e) => (this.data.paramId = Number(e.target.value))}
                />
              </div>
              <div className="input-field" style={{ marginTop: '30px' }}>
                <input type="text" id="startDate" className="datepicker"/>
                <label htmlFor="startDate">Start date</label>
              </div>
              <div className="input-field" style={{ marginTop: '30px' }}>
                <input type="text" id="startTime" ref={this.startTime} className="timepicker"/>
                <label htmlFor="startTime">Start time</label>
              </div>
            </div>
            <div className="col s6">
              <div className="input-field">
                <select
                  id="ResolutionSelect"
                  defaultValue="default"
                  onChange={(e) => (this.data.resolution = Number(e.target.value))}
                >
                  <option value="default" disabled>Choose resolution</option>
                  <option value={60}>1 minute</option>
                  <option value={120}>2 minutes</option>
                  <option value={300}>5 minutes</option>
                  <option value={600}>10 minutes</option>
                  <option value={900}>15 minutes</option>
                  <option value={1800}>30 minutes</option>
                </select>
              </div>
              <div className="input-field" style={{ marginTop: '30px' }}>
                <input type="text" id="endDate" className="datepicker"/>
                <label htmlFor="endDate">End date</label>
              </div>
              <div className="input-field" style={{ marginTop: '30px' }}>
                <input type="text" id="endTime" ref={this.endTime} className="timepicker"/>
                <label htmlFor="endTime">End time</label>
              </div>
            </div>
            <div className="col s12">
              <button style={{ margin: "20px"}} className="btn-large waves-effect waves-light indigo" type="submit">
                Show
                <i className="material-icons right">timeline</i>
              </button>
            </div>
          </div>
        </form>

        <ParameterHistoryQuery paramId={this.state.paramId} start={this.state.start} end={this.state.end} resolution={this.state.resolution}/>
      </div>
    );
  }
}

export default ParameterHistory;
