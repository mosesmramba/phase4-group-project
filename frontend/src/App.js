import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ProfilePage from './pages/ProfilePage';
import RentCarPage from './pages/RentCarPage';
import ViewCarsPage from './pages/ViewCarsPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={LandingPage} />
        <Route path="/profile" component={ProfilePage} />
        <Route path="/rent-vehicle" component={RentCarPage} />
        <Route path="/cars" component={ViewCarsPage} />
      </Switch>
    </Router>
  );
}

export default App;
