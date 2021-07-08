import React, { Component } from 'react';
import './App.css';
import {Button} from "antd";
import { DatePicker } from 'antd';

const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

function onChange(date, dateString) {
  console.log(date, dateString);
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <Button type="danger">百度一下</Button>
        <br/>
        <br/>
        <Button type="dashed">百度一下</Button>
        <br/>
        <br/>
        <Button type="dashed" icon="download" shape="circle" size="small"/>
        <div>
          <DatePicker onChange={onChange} />
          <br />
          <MonthPicker onChange={onChange} placeholder="选择月份" />
          <br />
          <RangePicker onChange={onChange} />
          <br />
          <WeekPicker onChange={onChange} placeholder="选择日期" />
        </div>
      </div>
    );
  }

}

export default App;
