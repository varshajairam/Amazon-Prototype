import React, { useEffect } from "react";
import "./Cart.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import {
  getCartProducts,
  updateTotalCost,
} from "../../store/actions/cartActions";

import { placeOrder } from "../../store/actions/orderActions";

const Checkout = (props) => {
  const { address, card } = props.location.state;

  const sellers = [];
  const products = [];

  let product;

  useEffect(() => {
    props.getCartProducts();
    props.updateTotalCost();
  }, []);

  if (props.cart.products && props.cart.products.length) {
    for (let prod of props.cart.products) {
      product = {
        quantity: 0,
        product: {
          images: [],
          addonCost: 0,
          averageRating: 0,
          reviews: [],
          _id: "",
          name: "",
          description: "",
          baseCost: 0,
          offers: [],
          seller: {},
          category: "",
        },
        isGift: null,
      };
      product.product = { ...prod.product };
      product.quantity = prod.quantity;
      product.isGift = prod.isGift;
      products.push(product);
      sellers.push(product.product.seller.id);
    }
  }

  return (
    <React.Fragment>
      <div className="ui container mt-5">
        <h2 class="ui center aligned header">Review Order</h2>
        {props.cart.products.length ? (
          props.cart.products.map((currProduct, i) => (
            <React.Fragment key={i}>
              <div className="ui relaxed divided items">
                <div className="item">
                  <Link
                    to={{
                      pathname: "/product/" + currProduct.product._id,
                      state: { product: currProduct.product },
                    }}
                  >
                    <div className="ui small image pointer">
                      <img
                        src={
                          currProduct.product.images[0] ||
                          "https://www.moodfit.com/front/images/genral_image_notfound.png"
                        }
                      />
                    </div>
                  </Link>
                  <div className="content product-details">
                    <Link
                      to={{
                        pathname: "/product/" + currProduct.product._id,
                        state: { product: currProduct.product },
                      }}
                    >
                      <div className="ui header onHover">
                        {currProduct.product.name}
                      </div>
                    </Link>
                    <div className="ui sub header onHover">
                      {currProduct.product.seller.name}
                    </div>
                    <br />
                    {JSON.parse(currProduct.isGift) && (
                      <div className="ui checkbox">
                        <input
                          type="checkbox"
                          name="gift"
                          checked={JSON.parse(currProduct.isGift)}
                        />
                        <label>This is a gift</label>
                      </div>
                    )}
                    <div className="field mt-3">
                      <label>Quantity</label>
                      <select disabled defaultValue={currProduct.quantity}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                    </div>
                    <div className="right floated header">
                      $ {currProduct.product.baseCost}
                    </div>
                    <br />
                    {currProduct.product.offers.find(
                      (offer) => offer.type == "percentage"
                    ) && (
                      <div className="ui right floated green header">
                        Applied a discount of{" "}
                        {
                          currProduct.product.offers.find(
                            (offer) => offer.type == "percentage"
                          ).value
                        }
                        %
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <hr />
            </React.Fragment>
          ))
        ) : (
          <center></center>
        )}
        <h3 className="ui right aligned header">
          Delivery Charges: ${props.cart.products[0].deliveryCharge}
        </h3>
        <h3 className="ui right aligned header">
          Total Cost: ${props.cart.products[0].totalCost}
        </h3>
        <div
          className="ui primary button right floated mt-5"
          onClick={() =>
            props.placeOrder({
              products: JSON.stringify(products),
              cost: props.cart.products[0].totalCost,
              customer: props.cart.products[0].customer,
              sellers: sellers,
              shippingAddress: JSON.stringify({
                ...address,
                address1: address.street1,
                address2: address.street2,
                zip: address.zipcode
              }),
              billingAddress: JSON.stringify({
                ...address,
                address1: address.street1,
                address2: address.street2,
                zip: address.zipcode
              }),
              card: JSON.stringify(card),
              statusHistory: JSON.stringify([{status: "New"}]),
            })
          }
        >
          Place Order
        </div>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  cart: state.cartReducer,
});

const mapDispatchToProps = (dispatch) => ({
  getCartProducts: () => dispatch(getCartProducts()),
  updateTotalCost: (data) => dispatch(updateTotalCost(data)),
  placeOrder: (data) => dispatch(placeOrder(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
