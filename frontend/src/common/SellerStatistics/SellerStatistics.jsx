import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./SellerStatistics.css";
import { getSellerStatistics } from "../../store/actions/statisticsActions";

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
          <h1 className="ui dividing header">Seller Product Statistics</h1>
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
            {stats.sellerStats.map((product) => (
              <tr key={product.product && product.product[0]._id}>
                <td className="onHover">{product.product[0].name}</td>
                <td>{product.product.length}</td>
                <td>
                  $
                  {(product.product[0].baseCost +
                    (product.product[0].addonCost
                      ? product.product[0].addonCost
                      : 0)) *
                    product.product.length}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default SellerStatistics;
