import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import authReducer from './store/reducers/authReducer';
import profileReducer from './store/reducers/profileReducer';
import productReducer from './store/reducers/productReducer';
import categoryReducer from './store/reducers/categoryReducer';
import alertReducer from './store/reducers/alertReducer';
import orderReducer from './store/reducers/orderReducer';
import cartReducer from './store/reducers/cartReducer';
import recomendationsReducer from './store/reducers/recomendationsReducer';
import statisticsReducer from './store/reducers/statisticsReducer';
import analyticsReducer from './store/reducers/analyticsReducer';
import userReducer from './store/reducers/userReducer';
import App from './App';
import * as serviceWorker from './serviceWorker';

const rootReducer = combineReducers({
  authReducer, productReducer, categoryReducer, alertReducer, cartReducer, profileReducer, orderReducer, recomendationsReducer, statisticsReducer, analyticsReducer, userReducer
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
