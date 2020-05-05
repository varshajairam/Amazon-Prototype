import React, { useState, useEffect, Fragment } from 'react';
import "./OrderList.css"
import { connect } from 'react-redux';
import {
  Link, Redirect
} from "react-router-dom";
import { getOrders } from '../../store/actions/orderActions';

let OrderList = (props) => {
  useEffect(() => {
    props.getOrders();
  }, []);


  console.log('orders', props.orders)

  return (
    <React.Fragment>

    </React.Fragment >
  )
}

const mapStateToProps = state => {
  return {
    orders: state.orderReducer
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getOrders: () => dispatch(getOrders())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderList);