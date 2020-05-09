import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GET_ORDER_SUCCESS } from "../../store/actions/types";
import "./OrderList.css";

// import {
//   Link, Redirect,
// } from 'react-router-dom';
import { getOrders } from "../../store/actions/orderActions";

const OrderList = ({ history }) => {
  const orders = useSelector((state) => state.orderReducer.orders);
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    dispatch(
      getOrders({
        page: 1,
      })
    );
  }, []);

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

  return (
    <>
      <div className="orders-wrapper ui container">
        <h1 className="ui header mt-5">Your Orders</h1>

        <div className="orders">
          <div className="ui secondary menu mt-5">
            {orderTabs.map((tab, i) => (
              <div
                className={`order-tab onHover flex-center${
                  activeTab === i ? " active" : ""
                }`}
                key={tab.title}
                onClick={() => setActiveTab(i)}
                onKeyDown={() => setActiveTab(i)}
                role="button"
                tabIndex="0"
              >
                {tab.title}
              </div>
            ))}
          </div>

          <div className="orders-listing">
            {orders
              .filter((order) =>
                orderTabs[activeTab].status.includes(order.status)
              )
              .map((order) => (
                <div className="order" key={order.key}>
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
                          <div
                            className="data onHover"
                            onClick={() => {
                              dispatch({
                                type: GET_ORDER_SUCCESS,
                                payload: order,
                              });
                              history.push("/orderDetails");
                            }}
                          >
                            Order Details
                          </div>
                        </div>
                      </div>
                    </div>
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
                                  product.product.image ||
                                  "https://www.moodfit.com/front/images/genral_image_notfound.png"
                                }
                                alt={product.product.name}
                              />
                            </div>
                            <div className="content">
                              <div className="header">
                                {product.product.name}
                              </div>
                              <div className="description">
                                Sold by:{" "}
                                <span>{product.product.seller.name}</span>
                              </div>
                              <div className="description">
                                Price:{" "}
                                <span>
                                  ${product.product.baseCost * product.quantity}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderList;
