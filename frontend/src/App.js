import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Header from './common/Header/Header';
import Home from './common/Home/Home';
import Login from './common/Login/Login';
import * as authActions from './store/actions/authActions';

function App() {
  const authReducerData = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  useEffect(() => dispatch(authActions.isLoggedIn()), [dispatch]);
  return (
    <Router>
      <Header />

      { !authReducerData.loggedIn && (
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Home} />
          <Route exact path="/" component={Home} />
          <Redirect from="/" to="/" />
        </Switch>
      )}

      { authReducerData.loggedIn && (
        <Switch>
          <Route exact path="/" component={Home} />
          <Redirect from="/" to="/" />
        </Switch>
      )}
    </Router>
  );
}

export default App;
