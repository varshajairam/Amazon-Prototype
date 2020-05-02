import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import './Header.css';
import * as authActions from '../../store/actions/authActions';

function Header() {
  const authReducerData = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  return (
    <div className="HEADER">
      { authReducerData.loggedIn && (
        <div className="ui secondary menu">
          <NavLink exact className="item" activeClassName="active" to="/">Home</NavLink>
          <NavLink exact className="item" activeClassName="active" to="/productlist">Products</NavLink>
          <NavLink exact className="item" activeClassName="active" to="/addProduct">Add Product</NavLink>
          <NavLink exact onClick={() => dispatch(authActions.logout())} className="item right" activeClassName="active" to="/">Logout</NavLink>
        </div>
      )}
      { !authReducerData.loggedIn && (
        <div className="ui secondary menu">
          <NavLink exact className="item" activeClassName="active" to="/">Home</NavLink>
          <NavLink exact className="item right" activeClassName="active" to="/login">Login</NavLink>
        </div>
      )}
    </div>
  );
}

export default Header;
