import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import './Header.css';
import * as authActions from '../../store/actions/authActions';

function Header() {
  const authReducerData = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const adminList = authReducerData.user_type === 'Admin' && ([
    <NavLink exact className="item" activeClassName="active" to="/categorylist">Categories</NavLink>,
    <NavLink exact className="item" activeClassName="active" to="/analyticview">Analytics Dashboard</NavLink>,
  ]
  );
  return (
    <div className="HEADER">
      {authReducerData.loggedIn && (
        <div className="ui secondary menu">
          <NavLink exact className="item" activeClassName="active" to="/">Home</NavLink>
          <NavLink exact className="item" activeClassName="active" to="/productlist">Products</NavLink>
          <NavLink exact className="item" activeClassName="active" to="/addProduct">Add Product</NavLink>
          <NavLink exact className="item" activeClassName="active" to="/orders">Orders</NavLink>
          <NavLink exact className="item" activeClassName="active" to="/cart"><i className="shop icon"></i>Cart</NavLink>
          <NavLink exact className="item" activeClassName="active" to="/profile">Profile</NavLink>
          <NavLink exact className="item" activeClassName="active" to="/sellerlist">Sellers</NavLink>
          {adminList}
          <Link onClick={() => dispatch(authActions.logout())} className="item right" to="/">Logout</Link>
        </div>
      )}
      {!authReducerData.loggedIn && (
        <div className="ui secondary menu">
          <NavLink exact className="item" activeClassName="active" to="/">Home</NavLink>
          <NavLink exact className="item right" activeClassName="active" to="/login">Login</NavLink>
        </div>
      )}
    </div>
  );
}

export default Header;
