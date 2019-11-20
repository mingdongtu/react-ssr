import React from 'react';
import { Link } from 'react-router-dom'
const Header = () => {
  return (
    <div>
      <ul>
        <li><Link to='/'>首页</Link></li>
        <li><Link to='/about'>关于</Link></li>
        <li><Link to='/other'>其他</Link></li>
      </ul>
    </div>
  )
}
export default Header