import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './Register.css';
import * as authActions from '../../store/actions/authActions';

function Register() {
  const authReducerData = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const history = useHistory();
  return (
    <div className="REGISTER ui card">
      <div className="content">
        <div className="header">Register</div>
      </div>
      <div className="content">
        { authReducerData.registerError && (
          <div className="ui error message">
            User already exists.
          </div>
        )}
        <form className="ui form" onSubmit={(ev) => dispatch(authActions.register(ev, history))}>
          <div className="field">
            <label htmlFor="inputUsername">
              Full Name
              <input type="text" id="inputName" name="name" placeholder="Full Name" required />
            </label>
          </div>
          <div className="field">
            <label htmlFor="inputEmail">
              Email
              <input type="email" id="inputEmail" name="email" placeholder="Email" required />
            </label>
          </div>
          <div className="field">
            <label htmlFor="inputPass">
              Password
              <input type="password" id="inputPass" name="password" placeholder="Password" required />
            </label>
          </div>
          <div className="inline fields">
            <label htmlFor="userType">User Type:</label>
            <div className="field">
              <div className="ui radio checkbox">
                <input type="radio" id="inputRadioCustomer" name="type" value="Customer" defaultChecked />
                <label htmlFor="inputRadioCustomer">Customer</label>
              </div>
            </div>
            <div className="field">
              <div className="ui radio checkbox">
                <input type="radio" id="inputRadioSeller" name="type" value="Seller" />
                <label htmlFor="inputRadioSeller">Seller</label>
              </div>
            </div>
          </div>
          <button type="submit" className="ui primary button">Register</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
