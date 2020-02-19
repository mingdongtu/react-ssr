import React from 'react'
import Header from './Header'
// import About from './About'
// import Home from './Home'
// import { Switch, Route, StaticRouter } from 'react-router-dom'
import { renderRoutes } from "react-router-config";
import routes from './Routes'
const App = () => {
  return (
    <div>
      <Header></Header>
      {renderRoutes(routes)}
    </div>
  )
}
export default App
{/* <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/about">
          <About />
        </Route>
      </Switch> */}