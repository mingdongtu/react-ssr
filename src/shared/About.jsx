import React from 'react';
import Axios from 'axios'
import { connect } from 'react-redux'
class About extends React.Component {
  constructor() {
    super();
    // this.state = {     redux 进行状态管理后，这个就不需要了
    //   data: ''
    // }
  }
  componentDidMount() {  //生命周期函数
    //判断是客户端路由还是服务端
    if (this.props.data === 'empty') {
      Axios.get('http://localhost:3001/getData').then(res => {
        this.props.changeData(res.data.data)
      })
    }
  }
  render() {
    return <div>
      <p>About</p>
      {/* <p>数据：{this.state.data}</p> */}
      <p>数据：{this.props.data}</p>
    </div>
  }
}
About.loadData = (store) => {
  return Axios.get('http://localhost:3001/getData').then(res => {
    store.dispatch({
      type: 'CHANGE_DATA',
      payload: res.data.data
    })
  })
}
function mapStateToProps(state) {
  return {
    data: state.data
  }
}
function mapDispatchToProps(dispatch) { //绑定到组件about上，听过this.props
  return {
    changeData(data) {
      dispatch({
        type: 'CHANGE_DATA',
        payload: data
      })
    }
  }
}
//connect 是一个高阶函数
export default connect(mapStateToProps, mapDispatchToProps)(About)  //将state 数据注入到about组件里面来