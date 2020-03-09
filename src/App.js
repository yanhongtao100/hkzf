import React from 'react';
import {BrowserRouter as Router,Route,Redirect,Switch} from 'react-router-dom'
import CityList from './pages/CityList'
import Home from './pages/Home'
import Map from './pages/Map'
import NotFound from './pages/NotFound'

function App() {
  return (
    <Router className="app">
      <Switch>
 
        <Route path="/" exact render={() => <Redirect to="/home" />} />


        <Route path="/home" component={Home} />
        <Route path="/cityList" component={CityList} />
        <Route path="/map" component={Map} />

        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;