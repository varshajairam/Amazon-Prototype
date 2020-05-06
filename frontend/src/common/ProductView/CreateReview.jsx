import React, { useState, useEffect } from 'react';
import './CreateReview.css';
import { connect } from 'react-redux';
import {
  Link, Redirect,
} from 'react-router-dom';
import StarRatings from '../StarRatings/StarRatings';
import { addReview } from '../../store/actions/productActions';

const CreateReview = (props) => {
  const [review, setReview] = useState({
    stars: 0,
    title: '',
    text: '',
  });

  if (!(props.location.state && props.location.state.product)) { return <Redirect to="/productlist" />; }

  if (props.products.redirectProduct) { return <Redirect to={{ pathname: '/product', state: { product: props.products.products.find((product) => product._id == props.location.state.product._id) } }} />; }

  const { product } = props.location.state;

  return (
    <>
      <div className="review-wrapper ui container">
        <div className="ui  dividing row-header">
          <div className="ui header">
            <h2>Create Review</h2>
          </div>
          <div className="product-details">
            <img className="img-container" src={product.images[0]} />
            <div className="product-name">{product.name}</div>
          </div>
        </div>

        <div className="ui dividing row-header mt-5 review-row">
          <div className="ui header">
            <h2>Overall Review</h2>
            <StarRatings max="5" rating={review.stars} onStarClick={(data) => setReview({ ...review, stars: data })} />
          </div>
        </div>

        <div className="ui dividing row-header mt-5 text-row">
          <div className="ui header">
            <h4>Add a headline</h4>
          </div>
          <div className="ui form">
            <div className="field">
              <input placeholder="What's most important to know?" type="text" onChange={(e) => setReview({ ...review, title: e.target.value })} />
            </div>
            <h4 className="mt-5">Write a review</h4>
            <div className="field">
              <textarea placeholder="What did you like or dislike? What did you use this product for?" onChange={(e) => setReview({ ...review, text: e.target.value })} />
            </div>
          </div>
          <div className="submit-container mt-3">

            {/* TODO: ADD CUSTOMER ID */}

            <div
              className="ui primary button"
              onClick={(e) => props.addReview({
                ...review,
                product: product._id,
              })}
            >
              Submit
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
const mapStateToProps = (state) => ({
  products: state.productReducer,
});

const mapDispatchToProps = (dispatch) => ({
  addReview: (data) => dispatch(addReview(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateReview);
