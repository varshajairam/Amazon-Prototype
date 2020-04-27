import React, { useState, useEffect } from 'react';
import configs from '../../config';
import "./ProductList.css"
import StarRatings from '../StarRatings/StarRatings';
import { connect } from 'react-redux';

let ProductList = (props) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(configs.CONNECT + "/links")
      .then(response => {
        console.log('response', response)
        response.json();
      })
      .then(data => setProducts(data));
  }, []);


  console.log('', props)
  return (
    <React.Fragment>
      <div className="productlist-wrapper">
        <div className="ui grid no-margin">
          <div className="three wide column filters-col">
            <div className="category-filter filter">
              <div className="ui header">
                Category:
              </div>
              <div className="ui list">
                {
                  [...Array(4)].map((e, i) =>
                    <div className="item pointer" key={i} onClick={e => filterByCategory(e)}>
                      {"Category " + (i + 1)}
                    </div>
                  )
                }
              </div>
            </div>
            <div className="ratings-filter filter">
              <div className="ui header">
                Avg. Customer Review
              </div>
              <div className="ui list">
                {
                  [...Array(4)].map((e, i) =>
                    <div className="item pointer" key={i} onClick={e => filterByStar(4 - i)}>
                      <StarRatings max="5" rating={4 - i} customizable="false" /> & above
                    </div>
                  )
                }
              </div>
            </div>
          </div>


          <div className="thirteen wide column product-col">


            {/* product starts here */}
            <div className="ui relaxed divided items">
              <div className="item">
                <div className="ui small image">
                  <img src="https://281-mobiletaas.s3-us-west-1.amazonaws.com/asd/rl.jpg" />
                </div>
                <div className="content">
                  <a className="header">Content Header</a>

                  <div className="meta">
                    <div className="ui large star rating" data-max-rating="5" data-rating="2">
                      {
                        [...Array(5)].map((e, i) => <i className="icon active" key={i}></i>)
                      }
                    </div>
                  </div>


                  <div className="header">
                    $ 2.0
                  </div>
                </div>
              </div>
            </div>
            <hr />

            <div className="ui relaxed divided items">
              <div className="item">
                <div className="ui small image">
                  <img src="https://281-mobiletaas.s3-us-west-1.amazonaws.com/asd/rl.jpg" />
                </div>
                <div className="content">
                  <a className="header">Content Header</a>

                  <div className="meta">
                    <div className="ui large star rating" data-max-rating="5" data-rating="2">
                      {
                        [...Array(5)].map((e, i) => <i className="icon active"></i>)
                      }
                    </div>
                  </div>


                  <div className="header">
                    $ 2.0
                  </div>
                </div>
              </div>
            </div>
            <hr />
            {/* Ends here */}


          </div>
        </div>
      </div>
    </React.Fragment >
  )
}

let filterByStar = (data) => {
  console.log("Filter by star: " + data)
}

let filterByCategory = (data) => {
  console.log("Filter by category: " + data)
}

const mapStateToProps = state => {
  return {
    products: state.productReducer
  }
}

const mapDispatchToProps = dispatch => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);