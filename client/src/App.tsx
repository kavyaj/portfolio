import { Router, Route } from 'wouter'
import Portfolio from './pages/Portfolio'

function App() {
  return (
    <Router>
      <Route path="/" component={Portfolio} />
      <Route path="/portfolio" component={Portfolio} />
    </Router>
  )
}

export default App