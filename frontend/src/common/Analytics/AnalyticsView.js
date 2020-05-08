import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import { getProducts } from '../../store/actions/productActions';
import { getTopFiveSoldProducts, getTopTenProductsBasedOnRatings } from '../../store/actions/analyticsActions';


const AnalyticsView = (props) => {
  const optionData = ['Top 5 most sold products', 'Top 10 products based on rating'];
  const [option, setOption] = useState('Choose the option');
  const [label, setLabel] = useState('');
  const [labels, setLabels] = useState([]);
  const [data, setData] = useState([]);
  useEffect(() => {
    props.getTopFiveSoldProducts();
  }, []);

  useEffect(() => {
    props.getTopTenProductsBasedOnRatings();
  }, []);

  const settingState = (val) => {
    setOption(val);
    if (val === 'Top 5 most sold products') {
      setLabel('Most Sold Products');
      const array = props.analytics.analytics && props.analytics.analytics.map((analytics, i) => (analytics._id == null ? 'Test' : analytics._id.name));
      setLabels(array);
      const valarray = props.analytics.analytics
        && props.analytics.analytics.map((analytics, i) => analytics.quantity);
      setData(valarray);
    } else if (val === 'Top 10 products based on rating') {
      setLabel('Rating');
      const array = props.analytics.analyticsTopRating
        && props.analytics.analyticsTopRating.map((analytics, i) => analytics.name);
      setLabels(array);
      const valarray = props.analytics.analyticsTopRating
        && props.analytics.analyticsTopRating.map((analytics, i) => analytics.averageRating);
      setData(valarray);
    }
  };

  const renderAnalyticsMenu = () => (
    <div className="ui container">
      <div className="field">
        <label htmlFor="inputCountry">Analytics Options</label>
        <select
          onChange={(ev) => {
            const val = ev.target.value;
            settingState(val);
          }}
          className="ui dropdown"
          id="inputOption"
          name="analytics"
          required
        >
          <option value={option} data-states="">Analytics Options</option>
          { optionData.map((opt) => (
            <option value={opt} key={opt} data-states={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
    </div>
  );

  return (
    <div className="ui grid">
      <div className="sixteen row">
        <div className="four wide column ui form">
          <div className="field">
            {renderAnalyticsMenu()}
            <div className="ui error message">
              <div className="header">You must choose a option</div>
            </div>
          </div>
        </div>
      </div>
      <div className="ui container">
        <Bar
          data={{
            labels,
            datasets: [
              {
                label,
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data,
              },
            ],
          }}
          options={{
            mainAspectRatio: true,
            title: {
              display: true,
              text: option,
              fontSize: '25',
            },
            legend: {
              display: true,
              position: 'right',
            },
          }}
        />
      </div>
    </div>

  );
};

const mapStateToProps = (state) => ({
  products: state.productReducer,
  analytics: state.analyticsReducer,
});

const mapDispatchToProps = (dispatch) => ({
  getProducts: (data) => dispatch(getProducts(data)),
  getTopFiveSoldProducts: () => dispatch(getTopFiveSoldProducts()),
  getTopTenProductsBasedOnRatings: () => dispatch(getTopTenProductsBasedOnRatings()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AnalyticsView);
