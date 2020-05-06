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
import Register from './common/Register/Register';
import Profile from './common/Profile/Profile';
import ProductList from './common/ProductList/ProductList';
import ProductView from './common/ProductView/ProductView';
import CreateReview from './common/ProductView/CreateReview';
import AddProduct from './common/AddProduct/AddProduct';
import * as authActions from './store/actions/authActions';
import Alert from './common/Alerts/Alert';

function App() {
  const authReducerData = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  useEffect(() => dispatch(authActions.isLoggedIn()), [dispatch]);
  return (
    <Router>
      <Header />
      <Alert />
      {!authReducerData.loggedIn && (
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/" component={Home} />
          <Redirect from="/" to="/" />
        </Switch>
      )}

      {authReducerData.loggedIn && (
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/profile/:email" component={Profile} />
          <Route path="/createReview" component={CreateReview} />
          <Route path="/product/:id" component={ProductView} />
          <Route path="/productlist" component={ProductList} />
          <Route path="/addProduct" component={AddProduct} />
          <Route path="/editProduct" component={AddProduct} />
          <Route path="/deleteProduct" component={AddProduct} />
          <Redirect from="/" to="/" />
        </Switch>
      )}
    </Router>
  );
}

export default App;
