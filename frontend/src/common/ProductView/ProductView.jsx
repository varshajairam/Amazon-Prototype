import React, { useState, useEffect } from 'react';
import "./ProductView.css"
import StarRatings from '../StarRatings/StarRatings';
import { connect } from 'react-redux';
import {
  Link, Redirect
} from "react-router-dom";

let ProductView = (props) => {
  const [dispImg, setImage] = useState("");

  useEffect(() => {
    setImage(props.location.state && props.location.state.product.images[0]);
  }, []);

  if (!(props.location.state && props.location.state.product))
    return <Redirect to="/productlist" />

  let product = props.location.state.product;


  console.log('props', product)

  return (
    <React.Fragment>
      <div className="product-wrapper">
        <div className="ui grid no-margin product-container">
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
              By <span>{product.seller}</span>

              {/* INSERT RATINGS */}
              <div className="rating-container">
                <StarRatings max="5" rating={3} customizable="false" />
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

              <div class="inline field mt-5">
                <div class="ui checkbox">
                  <input type="checkbox" tabindex="0" class="hidden" id="gift" /><label for="gift">Add as Gift</label>
                </div>
              </div>


            </div>
          </div>
        </div>
      </div>
    </React.Fragment >
  )
}

const mapStateToProps = state => {
  return {
  }
}

const mapDispatchToProps = dispatch => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductView);