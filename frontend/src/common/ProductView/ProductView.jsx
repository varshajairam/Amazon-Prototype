import React, { useState, useEffect, Fragment } from 'react';
import "./ProductView.css"
import StarRatings from '../StarRatings/StarRatings';
import { connect } from 'react-redux';
import {
  Link, Redirect
} from "react-router-dom";

let ProductView = (props) => {
  const [dispImg, setImage] = useState("");
  const ratingArr = new Array(5).fill(0);

  useEffect(() => {
    setImage(props.location.state && props.location.state.product && props.location.state.product.images[0]);
  }, []);

  if (!(props.location.state && props.location.state.product))
    return <Redirect to="/productlist" />

  let product = props.location.state.product;

  const writeReview = () => {
    props.history.push({ pathname: '/createReview', state: { product: product } });
  }

  const onEditClick = () => {
    props.history.push({ pathname: '/editProduct', state: { product: product } });
  }

  // Seller Route Here
  const showSellerProfile = (id) => {
    props.history.push({ pathname: '/sellerProfile/' + id });
  }

  return (
    <React.Fragment>
      <div className="product-wrapper">
        <div className="ui grid no-margin product-container m-0">
          <div className="seven wide column image-col ui grid">
            <div className="two wide column prev-col">
              <div className="ui small image">
                {
                  product.images.map((img, i) => {
                    return <div className={"img-prev " + (dispImg == img ? "active" : "")} key={i} onMouseOver={e => setImage(img)}>
                      <img src={img || "https://www.moodfit.com/front/images/genral_image_notfound.png"} />

                    </div>
                  })
                }
              </div>
            </div>
            <div className="fourteen wide column disp-col">
              <div className="disp-image ui large image" style={{ backgroundImage: "url(" + dispImg + ")" }}>
              </div>
            </div>
          </div>
          <div className="six wide column desc-col">
            <div className="ui dividing header">
              <h1 className="ui header">{product.name}</h1>
              By <span className="onHover" onClick={e => showSellerProfile(product.seller.id)}>{product.seller.name}</span>

              {/* INSERT RATINGS */}
              <div className="rating-container">
                <StarRatings max="5" rating={product.averageRating} customizable="false" />
              </div>
            </div>
            <br />

            <div className="text-container">
              List Price: <span className="price">${product.baseCost}</span>
            </div>
            <br />
            <div className="text-container">
              {product.description}
            </div>
          </div>


          <div className="three wide column purchase-col ui segment">
            {
              props.user.user_type == 'Customer' ? <Fragment>
                <div className="price">${product.baseCost}</div>
                <div className="price-desc mt-3">& <b>FREE Shipping</b> on orders over $25.00 shipped by Amazon.</div>
                <br />

                <div className="btn-container ui form">
                  <div className="field mt-3">
                    <label>Quantity:</label>
                    <select onChange={e => console.log(e.target.value)}>
                      <option value="">Select</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                  </div>
                  <div className="ui primary button">
                    <i className="shop icon"></i>Add to Cart
              </div>

                  <div className="ui secondary button mt-3">
                    <i className="save icon"></i>Save for Later
              </div>

                  <div className="inline field mt-5">
                    <div className="ui checkbox">
                      <input type="checkbox" tabIndex="0" className="hidden" id="gift" /><label for="gift">Add as Gift</label>
                    </div>
                  </div>
                </div>
              </Fragment> : <div className="ui primary button flex-center edit-btn" onClick={e => onEditClick()}>
                  <i className="edit icon"></i>Edit Product
              </div>
            }


          </div>
        </div>

        <div className="ui grid no-margin review-wrapper m-0">

          <div className="eleven wide column ui feed">

            {/* Review Start */}

            {
              product.reviews.map((review, i) => {
                ratingArr[review.stars - 1]++;

                return <div className="review-container event mt-5" key={i}>
                  <div className="label flex-center">
                    <img src="http://simpleicon.com/wp-content/uploads/user-3.png" />
                    <div className="name">{review.customer && review.customer.name || "Anonymous"}</div>
                  </div>

                  <div className="review mt-3">
                    <StarRatings max="5" rating={review.stars} customizable="false" /> <b>{review.title}</b>
                    <div className="text mt-3">
                      {review.text}
                    </div>
                  </div>
                </div>
              })
            }
            {/* Review End */}
          </div>
          <div className="two wide column"></div>
          <div className="three wide column">

            <div className="rating-col">
              <h2 className="ui header ">Customer Reviews</h2>
              <div className="rating-container">
                <StarRatings max="5" rating={product.averageRating} customizable="false" /> <span className="ui header ">{+product.averageRating.toFixed(1)} out of 5</span>

                <div className="total-container mt-5">
                  {product.reviews.length} customer ratings
    </div>

                <div className="rating-tracker-container">
                  {
                    [...Array(5)].map((rating, i) => {
                      const perc = ((ratingArr[4 - i] / product.reviews.length) * 100);

                      return <div className="star-rating flex-center" key={i}>
                        <span>{5 - i} star</span>
                        <div className="ui basic progress" data-percent="63">
                          <div className="bar" style={{ width: perc + "%" }}><div className="progress"></div></div>
                        </div>
                        <span>{perc ? perc.toFixed(1) : 0}%</span>
                      </div>
                    })
                  }

                </div>
              </div>
            </div>

            <div className="ui dividing header"></div>

            <div className="ui header">Write your own review</div>
            <div className="mt-3">Share your thoughts with other customers</div>
            <div className="ui button w-100 mt-5" onClick={writeReview}>Write a customer review</div>
          </div>

        </div>
      </div>
    </React.Fragment >
  )
}

const mapStateToProps = state => {
  return {
    user: state.authReducer
  }
}

const mapDispatchToProps = dispatch => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductView);