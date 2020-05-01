import React from 'react';
import './Login.css';

function Login() {
  return (
    <div className="LOGIN ui card">
      <div className="content">
        <div className="header">Login</div>
      </div>
      <div className="content">
        <form className="ui form">
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
