import React from 'react';
// import Axios from 'axios'
import { connect } from 'react-redux'
class About extends React.Component {
  constructor() {
    super();
    // this.state = {     redux 进行状态管理后，这个就不需要了
    //   data: ''
    // }
  }
  // componentDidMount() {  //生命周期函数
  //   Axios.get('http://localhost:3000/getData').then(res => {
  //     console.log(res)
  //     this.setState({
  //       data: res.data.data
  //     })
  //   })
  // }
  render() {
    return <div>
      <p>About</p>
      {/* <p>数据：{this.state.data}</p> */}
      <p>数据：{this.props.data}</p>
    </div>
  }
}
About.loadData = () => { }
function mapStateToProps(state) {
  return {
    data: state.data
  }
}
//connect 是一个高阶函数
export default connect(mapStateToProps)(About)  //将state 数据注入到about组件里面来