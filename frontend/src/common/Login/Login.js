import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Login.css';
import * as authActions from '../../store/actions/authActions';

function Login() {
  const authReducerData = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  return (
    <div className="LOGIN ui card">
      <div className="content">
        <div className="header">Login</div>
      </div>
      <div className="content">
        <form className="ui form" onSubmit={(ev) => dispatch(authActions.login(ev))}>
          { authReducerData.loginError && (
            <div className="ui red basic label error-label">
              Invalid username or password.
            </div>
          )}
          <div className="field">
            <label htmlFor="inputUsername">
              Username
              <input type="text" id="inputUsername" name="username" placeholder="Username" required />
            </label>
          </div>
          <div className="field">
            <label htmlFor="inputPass">
              Password
              <input type="password" id="inputPass" name="password" placeholder="Password" required />
            </label>
          </div>
          <button type="submit" className="ui primary button">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
