import React, { Component } from 'react'
import { DatePicker, Button } from 'antd';
import './App.less';

class App extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      passMonth: localStorage.getItem('PASS_MONTH') || 0
    }
  }

  handleChange(value) {

    let birthDay = new Date(value),
      nowDay = new Date();

    let passYear = nowDay.getYear() - birthDay.getYear();
    let month = nowDay.getMonth() - birthDay.getMonth();

    let passMonth = passYear * 12 + month;

    this.setState({
      passMonth: passMonth
    })

    localStorage.setItem('PASS_MONTH', passMonth);

  }

  resetBirthDay() {

    this.setState({
      passMonth: 0
    });

  }

  render() {
    return (
      <div className="life-grid">
        <div className="option">
          <h1>生命格子</h1>

          <p>假设你能活75岁, 那么这折换成月份一共是900个月, 下面的每个格子都代表一个月, 来看看你还剩多少. </p>

          {
            this.state.passMonth ?
              <p className="info">
                <span style={{marginRight: '20px'}}>你的人生已经度过了<em>{Math.floor(this.state.passMonth/12)}</em>年, 还有<em>{75-Math.floor(this.state.passMonth/12)}</em>年</span>
                <Button type="primary" onClick={this.resetBirthDay.bind(this)}>重置生日</Button>
              </p>
              :
              <p>
                <span>请选择你的出生日期: </span>
                <DatePicker onChange={this.handleChange.bind(this)} defaultValue="1988/01/01" format="yyyy/MM/dd"/>
              </p>
          }

        </div>
        <div className="grid">
          {(new Array(900).join('1,').split(',')).map((o, i)=> {
            return ((i+1) <= this.state.passMonth) ?
              <div key={i} className="cell cell-light"></div>
              :
              <div key={i} className="cell"></div>
          })}
        </div>
      </div>
    )
  }
}

export default App;

