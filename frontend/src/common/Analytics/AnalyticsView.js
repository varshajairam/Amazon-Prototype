import React, { useState, useEffect, Component } from 'react';
import { connect } from 'react-redux';
import { getProducts } from '../../store/actions/productActions';
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

	  const state = {
		labels:  props.products.products.map((currProduct, i) =>
				currProduct.name,
			  ),
		datasets: [
		  {
			label: 'Average Rating',
			backgroundColor: 'rgba(255,99,132,0.6)',
			borderColor: 'rgba(0,0,0,1)',
			borderWidth: 2,
			data:props.products.products.map((currProduct, i) =>
				  currProduct.averageRating,
				)
		  }
		]
	  }
	return (
		<div>
			<Bar
            data={state}
             options={{
					mainAspectRatio: false,
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
	);
};

const mapStateToProps = (state) => ({
	products: state.productReducer,
});

const mapDispatchToProps = (dispatch) => ({
	getProducts: data => dispatch(getProducts(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AnalyticsView);
