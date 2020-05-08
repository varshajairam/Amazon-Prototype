import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './SellerStatistics.css';
import { getSellerStatistics } from '../../store/actions/statisticsActions';

const SellerStatistics = () => {
  const stats = useSelector((state) => state.statisticsReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSellerStatistics());
  }, []);

  return (
    <>
      <div className="sellerStats-wrapper container ui">
        <center>
          <h1 className="ui dividing header">
            Seller Product Statistics
          </h1>
        </center>
        <table className="ui celled table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity Sold</th>
              <th>Amount Earned</th>
            </tr>
          </thead>
          <tbody>
            {
              stats.sellerStats.map((product) => (
                <tr key={product.product && product.product._id}>
                  <td className='onHover'>{product.product.name}</td>
                  <td>{product.quantity}</td>
                  <td>
                    $
                    {product.total}
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </>
  );
};

export default SellerStatistics;
