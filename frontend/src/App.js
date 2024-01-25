// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import SignInPage from './components/auth/SignInPage';
import SignUpPage from './components/auth/SignUpPage';
import ViewCarsPage from './components/pages/ViewCarsPage';
import RentCarPage from './components/pages/RentCarPage';
import ProfilePage from './components/pages/ProfilePage';

const App = () => {
  return (
    <Router>
      <div className="container">
        <nav>
          <ul className="flex justify-end">
            <li>
              <Link to="/signin">Sign In</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/signin" component={SignInPage} />
          <Route path="/signup" component={SignUpPage} />
          <Route path="/viewcars" component={ViewCarsPage} />
          <Route path="/rentcar" component={RentCarPage} />
          <Route path="/profile" component={ProfilePage} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
