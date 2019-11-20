import React from 'react'
import Header from './Header'
import About from './About'
import Home from './Home'
import { Switch, Route, BrowserRouter as Router, StaticRouter } from 'react-router-dom'
const App = () => {

  return (
    <div>
      <StaticRouter>
        <Header></Header>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
        </Switch>
      </StaticRouter>
    </div>
  )
}
export default App