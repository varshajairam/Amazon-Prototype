import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOrders, updateOrder } from "../../store/actions/orderActions";

const OrderList = (props) => {
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
  const dispatch = useDispatch();

  const onStatusChange = (id, status) => {
    console.log(id, status);
    
    dispatch(
      updateOrder({
        id,
        status,
      })
    );
  };

  const orderTabs = [
    {
      title: "Orders",
      status: ["Delivered"],
    },
    {
      title: "Open Orders",
      status: [
        "New",
        "Packing",
        "Shipping",
        "Package arrived",
        "Out for Delivery",
      ],
    },
    {
      title: "Cancelled Orders",
      status: ["Cancelled"],
    },
  ];

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
              key={product._id}
            >
              <div className="item">
                <div className="ui small image">
                  <img
                    src={
                      product.product.images[0] ||
                      "https://www.moodfit.com/front/images/genral_image_notfound.png"
                    }
                    alt={product.product.name}
                  />
                </div>
                <div className="content">
                  <div className="header onHover">{product.product.name}</div>
                  <div className="description">
                    Sold by:
                    <span className="onHover">
                      {product.product.seller.name}
                    </span>
                  </div>
                  <div className="description">
                    Price:
                    <span>${product.product.baseCost * product.quantity}</span>
                  </div>
                  {order.status !== "Delivered" &&
                  order.status !== "Cancelled" ? (
                    <div className="extra">
                      <div
                        className="ui button"
                        onClick={() => {
                          console.log("delete product", product.product._id);
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
                  onStatusChange(order._id, "Cancelled");
                }}
              >
                Cancel Order
              </div>
              <div className="or"></div>
              <div
                className="ui primary button"
                onClick={() => {
                  onStatusChange(order._id, nextStatus[userType][order.status]);
                }}
              >
                {nextStatus[userType][order.status]}
              </div>
            </div>
          ) : (
            <div
              className="ui top red attached button"
              onClick={() => {
                onStatusChange(order._id, "Cancelled");
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
