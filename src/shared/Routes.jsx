
import About from './About';
import Home from './Home';
import App from './App'

const routes = [
  {
    path: '/home',
    component: Home,
  },
  {
    path: '/about',
    component: About,
    loadData: About.loadData
  },
  {
    path: '/about/abc',
    component: About,
    loadData: About.loadData
  }
]
export default routes