import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateOrder } from "../../store/actions/orderActions";
import { getProduct } from "../../store/actions/productActions";
import { Redirect } from "react-router-dom";

const OrderList = ({ history }) => {
  const nextStatus = {
    Customer: {},
    Seller: {
      New: "Packing",
      Packing: "Shipping",
    },
    Admin: {
      Shipping: "Package arrived",
      ["Package arrived"]: "Out for Delivery",
      ["Out for Delivery"]: "Delivered",
    },
  };
  const order = useSelector((state) => state.orderReducer.currentOrder);
  const loading = useSelector((state) => state.orderReducer.loading);
  const userType = useSelector((state) => state.authReducer.user_type);
  const currentProduct = useSelector(
    (state) => state.productReducer.currentProduct
  );
  const dispatch = useDispatch();

  const onUpdate = (data) => {
    dispatch(updateOrder(data));
  };
  if (currentProduct) {
    return (
      <Redirect
        to={{
          pathname: `/product/${currentProduct._id}`,
          state: { product: currentProduct },
        }}
      />
    );
  }
  return !order || loading ? (
    <div className="ui loading segment"></div>
  ) : (
    <div className="orders-wrapper ui container">
      <h1 className="ui header mt-5">Order Details</h1>
      <div className="ui card">
        <div className="content-header">
          <div className="left">
            <div className="data-container">
              <div className="label">ORDER PLACED</div>
              <div className="data">
                {new Date(
                  order.statusHistory[0].timestamp
                ).toLocaleDateString()}
              </div>
            </div>

            <div className="data-container">
              <div className="label">TOTAL</div>
              <div className="data">${order.cost}</div>
            </div>
          </div>
          <div className="right">
            <div className="data-container">
              <div className="label">ORDER #{order._id}</div>
            </div>
          </div>
        </div>

        <div className="content">
          <div className="ui three column relaxed grid">
            <div className="column">
              <div className="ui header lable ">
                <i className="shipping fast icon"></i>Shipping Address
              </div>
              <div className="ui list">
                <div className="item">
                  <div className="content">{order.shippingAddress.name}</div>
                </div>
                <div className="item">
                  <div className="content">
                    {order.shippingAddress.address1}
                  </div>
                </div>
                <div className="item">
                  <div className="content">
                    {order.shippingAddress.city}, {order.shippingAddress.state}.{" "}
                    {order.shippingAddress.zip}
                  </div>
                </div>
                <div className="item">
                  <div className="content">{order.shippingAddress.phone}</div>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="ui header lable ">
                <i className="file outline icon"></i>Billing Address
              </div>
              <div className="ui list">
                <div className="item">
                  <div className="content">{order.billingAddress.name}</div>
                </div>
                <div className="item">
                  <div className="content">{order.billingAddress.address1}</div>
                </div>
                <div className="item">
                  <div className="content">
                    {order.billingAddress.city}, {order.billingAddress.state}.{" "}
                    {order.billingAddress.zip}
                  </div>
                </div>
                <div className="item">
                  <div className="content">{order.billingAddress.phone}</div>
                </div>
              </div>
            </div>
            <div className="right aligned column">
              <div className="ui header lable ">
                <i className="credit card outline icon"></i>
                Card Info
              </div>
              <div className="ui list">
                <div className="item">
                  <div className="content">{order.card.name}</div>
                </div>
                <div className="item">
                  <div className="content">
                    {order.card.number
                      .toString()
                      .replace(/^.{8}/g, "**** **** ")}
                  </div>
                </div>

                <div className="item">
                  <div className="content">
                    expiration:{" "}
                    {new Date(order.card.expiration).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="ui card">
        <div className="content">
          <h3 className="ui header">{order.status}</h3>
          {order.products.map((product) => (
            <div
              className="product-div ui relaxed divided items"
              key={product.product._id}
            >
              <div className="item">
                <div className="ui small image">
                  <img
                    src={
                      product.product.image ||
                      "https://www.moodfit.com/front/images/genral_image_notfound.png"
                    }
                    alt={product.product.name}
                  />
                </div>
                <div className="content">
                  <div
                    className="header onHover"
                    onClick={() => {
                      dispatch(getProduct({ id: product.product._id }));
                    }}
                  >
                    {product.product.name}
                  </div>
                  <div className="description">
                    Sold by:
                    <span>
                      {product.product.seller.name}
                    </span>
                  </div>
                  <div className="description">
                    Price:
                    <span>${product.product.baseCost * product.quantity}</span>
                  </div>
                  {userType === "Customer" &&
                  order.status !== "Delivered" &&
                  order.status !== "Cancelled" &&
                  order.products.length > 1 ? (
                    <div className="extra">
                      <div
                        className="ui button"
                        onClick={() => {
                          onUpdate({
                            id: order._id,
                            productId: product.product._id,
                          });
                        }}
                      >
                        Remove Item
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          ))}
        </div>
        {order.status !== "Delivered" && order.status !== "Cancelled" ? (
          nextStatus[userType][order.status] ? (
            <div className="ui top attached fluid buttons">
              <div
                className="ui red button"
                onClick={() => {
                  onUpdate({ id: order._id, status: "Cancelled" });
                }}
              >
                Cancel Order
              </div>
              <div className="or"></div>
              <div
                className="ui primary button"
                onClick={() => {
                  onUpdate({
                    id: order._id,
                    status: nextStatus[userType][order.status],
                  });
                }}
              >
                {nextStatus[userType][order.status]}
              </div>
            </div>
          ) : (
            <div
              className="ui top red attached button"
              onClick={() => {
                onUpdate({ id: order._id, status: "Cancelled" });
              }}
            >
              Cancel Order
            </div>
          )
        ) : null}
      </div>

      <div className="ui card">
        <div className="ui basic segment">
          <div className="ui header lable ">
            <i className="folder open outline list icon"></i>
            Status History
          </div>
          <div class="ui relaxed divided list">
            {order.statusHistory.map((sh) => (
              <div class="item" key={sh._id}>
                <i class="large clipboard list middle aligned icon"></i>
                <div class="content">
                  <div class="header">{sh.status}</div>
                  <div class="description">
                    at {new Date(sh.timestamp).toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderList;
