import React, { useState, useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getOrders } from '../../store/actions/orderActions';

const OrderList = (props) => {
  const orders = useSelector((state) => state.orderReducer.orders);
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    dispatch(getOrders({
      page: 1,
    }));
  }, []);

  const orderTabs = [{
    title: 'Orders',
    status: ['Delivered'],
  }, {
    title: 'Open Orders',
    status: ['New',
      'Packing',
      'Shipping',
      'Package arrived',
      'Out for Delivery'],
  }, {
    title: 'Cancelled Orders',
    status: ['Cancelled'],
  }];

  console.log(orders[0]);
  
  return (
    <>
      <div className="orders-wrapper ui container">
        <h1 className="ui header mt-5">Order Details</h1>
            {
              orders.filter((order) => orderTabs[activeTab].status.includes(order.status))
                .map((order) => (
                  <Fragment>
                  <div className="ui card">
                    
                  <div className="content-header">
                        <div className="left">
                          <div className="data-container">
                            <div className="label">
                              ORDER PLACED
                            </div>
                            <div className="data">
                              {new Date(order.statusHistory[0].timestamp).toLocaleDateString()}
                            </div>
                          </div>

                          <div className="data-container">
                            <div className="label">
                              TOTAL
                            </div>
                            <div className="data">
                              $
                              {order.cost}
                            </div>
                          </div>

                        </div>
                        <div className="right">
                          <div className="data-container">
                            <div className="label">
                              ORDER #
                              {order._id}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="content">
                        <div className="ui three column grid">
                          <div className="column">1</div>
                          <div className="column">2</div>
                          <div className="column">3</div>
                        </div>
                      </div>
                    </div>
                    <div className="ui card">

                      <div className="content">
                        <h3 className="ui header">{order.status}</h3>
                        {
                          order.products.map((product) => (
                            <div className="product-div ui relaxed divided items" key={product._id}>
                              <div className="item">
                                <div className="ui small image">
                                  <img src={product.product.images[0] || 'https://www.moodfit.com/front/images/genral_image_notfound.png'} alt={product.product.name} />
                                </div>
                                <div className="content">
                                  <div className="header onHover">{product.product.name}</div>
                                  <div className="description">
                                    Sold by:
                                    <span className="onHover">{product.product.seller.name}</span>
                                  </div>
                                  <div className="description">
                                    Price:
                                    <span>
                                      $
                                      {product.product.baseCost * product.quantity}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))
                        }
                      </div>
                    </div>
                    
                  <div className="ui card">
                    Histoy
                    </div>
                    </Fragment>
                ))
            }
      </div>
    </>
  );
};

export default OrderList;
