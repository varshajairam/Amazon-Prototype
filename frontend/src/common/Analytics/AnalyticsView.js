import React, { useState, useEffect, Component } from 'react';
import { connect } from 'react-redux';
import { getProducts } from '../../store/actions/productActions';
import { getAnalytics } from '../../store/actions/analyticsActions';
import { Bar } from 'react-chartjs-2';




const AnalyticsView = (props) => {

	const [filter, setFilter] = useState({
		name: "",
		averageRating: "",
		category: "",
		sort: "",
		page: 1
	  });

	  useEffect(() => {
		props.getProducts(filter);
	  }, [filter]);

	  useEffect(() => {
		props.getAnalytics();
	  }, []);

	  const state = {
		labels:  props.products.products.map((currProduct, i) =>
				currProduct.name,
			  ),
		datasets: [
		  {
			label: 'Average Rating',
			backgroundColor: 'rgba(75,192,192,1)',
			borderColor: 'rgba(0,0,0,1)',
			borderWidth: 2,
			data:props.products.products.map((currProduct, i) =>
				  currProduct.averageRating,
				)
		  }
		]
	  }

	  const renderAnalyticsMenu = () => {
		console.log(props.state);
		return (

		  <div className="ui loading fluid menu">
			{/* {!props.analytic || props.analytics.loading ? (
			  <div className="ui loading fluid simple dropdown item small header">
				Loading Categories
			  </div>
			) : ( */}
			  <div className="ui fluid simple dropdown item small header">
			  {/* <div className="item"> */}
				     Analytics options
				  {/* </div> */}
				{/* {props.analytics.analytics.analyticsOptions
				  ? categories.categories.find((cat) => {
					  return cat._id === basicInfo.category;
					}).name
				  : `choose a category`} */}
				<i className="dropdown icon"></i>
				<div className="menu">
				
				  {/* {props.analytics.analytics.analyticsOptions.map((opt) => {
					return (
					  <div
						className="item"
						key={opt}
						// onClick={() => {
						//   setErrors({...errors, opt: false})
						//   setBasicInfo({ ...basicInfo, category: category._id });
						// }}
					  >
						{opt}
					  </div>
					);
				  })} */}
				  <div className="item">
				     No of orders per day
				  </div>
				  <div className="item">
				  Top 5 most sold products
				  </div>
				  <div className="item">
				  Top 5 sellers based on total sales amount
				  </div>
				  <div className="item">
				  Top 5 customers based on total purchase amount
				  </div>
				  <div className="item">
				  Top 10 products based on rating
				  </div>
				</div>
			  </div>
		  </div>
		);
	  };

	 const test = (event) => {
		  console.log(event);
		  
	  }

	return (
		<div className="ui grid">
			<div className="sixteen row">
			<div className="four wide column ui form">
			<div className='field' onClick={(event) => test(event)}>
				{renderAnalyticsMenu()}
				<div className="ui error message">
				<div className="header">You must choose a option</div>
				</div>
			</div>
			</div>
			</div>
		<div className="ui container">
					<Bar
					data={state}
					options={{
							mainAspectRatio: true,
							title: {
								display: true,
								text: 'Product Rating',
								fontSize: '25'
							},
							legend:{
								display: true,
								position: 'right'
							}
						}} 
				/>
		</div>
		</div>
		
	);
};

const mapStateToProps = (state) => ({
	products: state.productReducer,
	analytics: state.analyticsReducer,
	state: state
});

const mapDispatchToProps = (dispatch) => ({
	getProducts: data => dispatch(getProducts(data)),
	getAnalytics: () => dispatch(getAnalytics()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AnalyticsView);
