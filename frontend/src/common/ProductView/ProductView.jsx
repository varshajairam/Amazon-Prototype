import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { PropTypes } from 'prop-types';
import './ProductView.css';

import {
  Redirect,
} from 'react-router-dom';
import StarRatings from '../StarRatings/StarRatings';
import { addProductToCart } from '../../store/actions/cartActions';
import { addView } from '../../store/actions/productActions';

const ProductView = ({ location, history }) => {
  const [dispImg, setImage] = useState('');
  const user = useSelector((state) => state.authReducer);
  const [qty, setQty] = useState(1);
  const ratingArr = new Array(5).fill(0);
  const dispatch = useDispatch();

  useEffect(() => {
    setImage(location.state && location.state.product && location.state.product.images[0]);

    dispatch(addView({ id: location.state && location.state.product && location.state.product._id }));
  }, []);

  if (!(location.state && location.state.product)) { return <Redirect to="/productlist" />; }

  const { product } = location.state;

  const writeReview = () => {
    history.push({ pathname: '/createReview', state: { product } });
  };

  const onEditClick = () => {
    history.push({ pathname: '/editProduct', state: { product } });
  };

  // Seller Route Here
  const showSellerProfile = (email) => {
    history.push({ pathname: `/profile/${email}` });
  };

  return (
    <>
      <div className="product-wrapper">
        <div className="ui grid no-margin product-container m-0">
          <div className="seven wide column image-col ui grid">
            <div className="two wide column prev-col">
              <div className="ui small image">
                {
                  product.images.map((img) => (
                    <div className={`img-prev ${dispImg === img ? 'active' : ''}`} key={img} onMouseOver={() => setImage(img)} onFocus={() => setImage(img)}>
                      <img src={img || 'https://www.moodfit.com/front/images/genral_image_notfound.png'} alt="Product" />

                    </div>
                  ))
                }
              </div>
            </div>
            <div className="fourteen wide column disp-col">
              <div className="disp-image ui large image" style={{ backgroundImage: `url(${dispImg})` }} />
            </div>
          </div>
          <div className="six wide column desc-col">
            <div className="ui dividing header">
              <h1 className="ui header">{product.name}</h1>
              By
              {' '}
              <span className="onHover" onClick={() => showSellerProfile(product.seller.email)} onKeyDown={() => showSellerProfile(product.seller.email)} role="button" tabIndex="0">{product.seller.name}</span>

              {/* INSERT RATINGS */}
              <div className="rating-container">
                <StarRatings max="5" rating={product.averageRating} customizable="false" />
              </div>
            </div>
            <br />

            <div className="text-container">
              List Price:
              {' '}
              <span className="price">
                $
                {product.baseCost}
              </span>
            </div>
            <br />
            <div className="text-container">
              {product.description}
            </div>
          </div>


          <div className="three wide column purchase-col ui segment">
            {
              user.user_type === 'Customer' ? (
                <>
                  <div className="price">
                    $
                    {product.baseCost}
                  </div>
                  <div className="price-desc mt-3">
                    &
                    <b>FREE Shipping</b>
                    {' '}
                    on orders over $25.00 shipped by Amazon.
                  </div>
                  <br />

                  <div className="btn-container ui form">
                    <div className="field mt-3">
                      <label htmlFor="dropdown">
                        <select onChange={e => setQty(e.target.value)}>
                          <option value="">Select</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </select>
                      </label>
                    </div>
                    <div className="ui primary button" onClick={() => dispatch(addProductToCart({
                      product: product._id,
                      quantity: qty,
                      isGift: false
                    }))}>
                      <i className="shop icon"></i>Add to Cart
              </div>

                    <div className="ui secondary button mt-3">
                      <i className="save icon" />
                      Save for Later
                    </div>

                    <div className="inline field mt-5">
                      <div className="ui checkbox">
                        <label htmlFor="gift">
                          <input type="checkbox" tabIndex="0" className="hidden" id="gift" />
                          Add as Gift
                        </label>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                  <div className="ui primary button flex-center edit-btn" onClick={() => onEditClick()} onKeyDown={() => onEditClick()} role="button" tabIndex="0">
                    <i className="edit icon" />
                  Edit Product
                  </div>
                )
            }


          </div>
        </div>

        <div className="ui grid no-margin review-wrapper m-0">

          <div className="eleven wide column ui feed">

            {/* Review Start */}

            {
              product.reviews.map((review) => {
                ratingArr[review.stars - 1] += 1;

                return (
                  <div className="review-container event mt-5" key={review.customer && review.customer.name}>
                    <div className="label flex-center">
                      <img src="http://simpleicon.com/wp-content/uploads/user-3.png" alt="Customer" />
                      <div className="name">{(review.customer && review.customer.name) || 'Anonymous'}</div>
                    </div>

                    <div className="review mt-3">
                      <StarRatings max="5" rating={review.stars} customizable="false" />
                      {' '}
                      <b>{review.title}</b>
                      <div className="text mt-3">
                        {review.text}
                      </div>
                    </div>
                  </div>
                );
              })
            }
            {/* Review End */}
          </div>
          <div className="two wide column" />
          <div className="three wide column">

            <div className="rating-col">
              <h2 className="ui header ">Customer Reviews</h2>
              <div className="rating-container">
                <StarRatings max="5" rating={product.averageRating} customizable="false" />
                {' '}
                <span className="ui header ">
                  {+product.averageRating.toFixed(1)}
                  {' '}
                  out of 5
                </span>

                <div className="total-container mt-5">
                  {product.reviews.length}
                  {' '}
                  customer ratings
                </div>

                <div className="rating-tracker-container">
                  {
                    [...Array(5)].map((rating, i) => {
                      const perc = ((ratingArr[4 - i] / product.reviews.length) * 100);

                      return (
                        <div className="star-rating flex-center" key={i + 1}>
                          <span>
                            {5 - i}
                            {' '}
                            star
                          </span>
                          <div className="ui basic progress" data-percent="63">
                            <div className="bar" style={{ width: `${perc}%` }}><div className="progress" /></div>
                          </div>
                          <span>
                            {perc ? perc.toFixed(1) : 0}
                            %
                          </span>
                        </div>
                      );
                    })
                  }

                </div>
              </div>
            </div>

            <div className="ui dividing header" />

            <div className="ui header">Write your own review</div>
            <div className="mt-3">Share your thoughts with other customers</div>
            <div className="ui button w-100 mt-5" onClick={writeReview} onKeyDown={writeReview} role="button" tabIndex="0">Write a customer review</div>
          </div>

        </div>
      </div>
    </>
  );
};

ProductView.propTypes = {
  name: PropTypes.string,
};

export default ProductView;
