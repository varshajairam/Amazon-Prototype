import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import { getProducts } from '../../store/actions/productActions';
import { useSelector, useDispatch } from 'react-redux';
import { getTopFiveSoldProducts, getTopTenProductsBasedOnRatings,
  getNoOfOrdersPerDay, getTopTenProductsViewedPerDay } from '../../store/actions/analyticsActions';


const AnalyticsView = (props) => {
  const optionData = ['Top 5 most sold products', 'Top 10 products based on rating', 'No of orders per day', 'Top 10 products viewed per day'];
  const [option, setOption] = useState('Choose the option');
  const [label, setLabel] = useState('');
  const [labels, setLabels] = useState([]);
  const [data, setData] = useState([]);
  const [date, setDate] = useState();
  useEffect(() => {
    props.getTopFiveSoldProducts();
  }, []);

  useEffect(() => {
    props.getTopTenProductsBasedOnRatings();
  }, []);

  const dispatch = useDispatch();
  useEffect(() => dispatch(getNoOfOrdersPerDay(date)), [date, dispatch]);
  useEffect(() => dispatch(getTopTenProductsViewedPerDay(date)), [date, dispatch]);
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

  const setting = (val) => {
	if (option === 'No of orders per day') {
		setLabel('Orders per day');
		const array = [val]
		setLabels(array);
		const valarray = [];
		const quantity = props.analytics.analyticsNoOfOrders
		  && props.analytics.analyticsNoOfOrders.quantity;
		  valarray.push(quantity);
		setData(valarray);
	  } else if (option === 'Top 10 products viewed per day') {
		setLabel('Products viewed per day');
		const array = props.analytics.analyticsTopViewed
        && props.analytics.analyticsTopViewed.map((analytics, i) => analytics.name);
      setLabels(array);
		const valarray = [];
		const quantity = props.analytics.analyticsTopViewed
        && props.analytics.analyticsTopViewed.map((analytics, i) => {
			Object.keys(analytics.views).map(function (old_key, index) {
				if(old_key === val) {
					return analytics.views[index];
				}
			})
		});
		  valarray.push(quantity);
		setData(valarray);
	  }
  }

  const dateInput = () => (
    <div className="date-container mt-3">
      {option && (option === 'No of orders per day' || option === 'Top 10 products viewed per day') && <div className="ui input">
	  <label htmlFor="inputDate">Select Date</label>
        <input type="date" name="data" id="date" onChange={(e) => {setDate(e.target.value); setting(e.target.value)}} />
      </div>}
    </div>
  );
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
        <div>
          <div className="field">
            {dateInput()}
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
  getNoOfOrdersPerDay: () => dispatch(getNoOfOrdersPerDay()),
  getTopTenProductsViewedPerDay: () => dispatch(getTopTenProductsViewedPerDay()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AnalyticsView);
