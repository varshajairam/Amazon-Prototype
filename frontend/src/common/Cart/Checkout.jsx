import React, { useState, useEffect } from 'react';
import './Cart.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import {
  fetchProfileData,
  addAddress,
} from '../../store/actions/profileActions';

const Checkout = (props) => {
  //const [states, setStates] = useState([]);

  // useEffect(() => {
  //   props.fetchProfileData();
  // }, []);

  const {products, address, card} = props.location.state;

  return (
    <React.Fragment>
            <div className="ui grid container mt-5">
            <h2 class="ui header">Bill Details:</h2>
                <label>Total Cost: {products[0].totalCost}</label>
                <Link to={{ pathname: '/order', state: { products, address, card } }} >
                <div className="ui primary button mt-5">
                    Place Order
                </div>
                </Link>
            </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
