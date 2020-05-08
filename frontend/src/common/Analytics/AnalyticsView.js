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

	  const optionData = ['No of orders per day', 'Top 5 most sold products'];

	  const renderAnalyticsMenu = () => {
		console.log(props.state);
		return (
<div className="ui container">
		  
		  
		                <div className="field">
						<label htmlFor="inputCountry">Country</label>
						<select
						//   onChange={(ev) => {
						// 	const ind = ev.target.options.selectedIndex;
						// 	const newStates = ev.target.options[ind].getAttribute('data-states').split('|');
						// 	setStates(newStates);
						//   }}
						  className="ui dropdown"
						  id="inputOption"
						  name="analytics"
						  required
						>
						  <option value="" data-states="">Analytics Options</option>
						  { optionData.map((opt) => (
							<option value={opt} key={opt} data-states={opt}>
							  {opt}
							</option>
						  ))}
						</select>
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
