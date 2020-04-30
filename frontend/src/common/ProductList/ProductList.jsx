import React, { useState, useEffect } from 'react';
import "./ProductList.css"
import StarRatings from '../StarRatings/StarRatings';
import { getProducts } from '../../store/actions/productActions';
import { getCategories } from '../../store/actions/categoryActions';
import { connect } from 'react-redux';
import {
  Link
} from "react-router-dom";
import ReactPaginate from 'react-paginate';

let ProductList = (props) => {
  const [filter, setFilter] = useState({
    name: "",
    averageRating: "",
    category: "",
    sort: "",
    page: 1
  });

  const [sortObj] = useState({
    "Price Descending": "-baseCost",
    "Price Ascending": "baseCost",
    "Ratings Descending": "-averageRating",
    "Ratings Ascending": "averageRating"
  })

  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    props.getCategories();
  }, []);

  useEffect(() => {
    props.getProducts(filter);
  }, [filter]);

  return (
    <React.Fragment>
      <div className="productlist-wrapper">

        <div className="ui grid container search-container">
          <div className="column">
            <div class="ui action icon input fluid">
              <input placeholder="Search..." type="text" value={searchText} onChange={e => setSearchText(e.target.value)} />
              <div class="ui primary button" onClick={e => setFilter({ ...filter, name: searchText })}>
                <i class="search icon"></i>
              </div>
            </div>
          </div>
        </div>
        <hr />


        <div className="ui grid no-margin">

          {/* Filter Screen - Category logic to be changed*/}
          <div className="three wide column filters-col">

            <div className="category-filter filter">
              <div className="ui header">
                Category:
              </div>
              <div className="ui list">
                <div className="onHover" onClick={e => setFilter({ ...filter, category: "" })}>
                  <span>{filter.category == "" ? "" : "< Clear"}</span>
                </div>
                {
                  props.categories.categories.map((category, i) =>
                    <div className="item pointer onHover" key={i} onClick={e => setFilter({ ...filter, category: category._id })}>
                      {category.name}
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
                <div className="onHover" onClick={e => setFilter({ ...filter, averageRating: "" })}>
                  <span>{filter.averageRating == "" ? "" : "< Clear"}</span>
                </div>
                {
                  [...Array(4)].map((e, i) =>
                    <div className="item pointer onHover" key={i} onClick={e => setFilter({ ...filter, averageRating: 4 - i })}>
                      <StarRatings max="5" rating={4 - i} customizable="false" /> & above
                    </div>
                  )
                }
              </div>
            </div>

            <div className="category-filter filter">
              <div className="ui header">
                Sort By:
              </div>
              <div className="ui list">
                <div className="onHover" onClick={e => setFilter({ ...filter, sort: "" })}>
                  <span>{filter.sort == "" ? "" : "< Clear"}</span>
                </div>
                {
                  Object.keys(sortObj).map((sort, i) =>
                    <div className="item pointer onHover" key={i} onClick={e => setFilter({ ...filter, sort: sortObj[sort] })}>
                      {sort}
                    </div>
                  )
                }
              </div>
            </div>


          </div>

          {/* Main Tab */}
          <div className="thirteen wide column product-col">


            {/* product starts here */}
            {
              props.products.products.length ?
                props.products.products.map((currProduct, i) => {
                  return <React.Fragment key={i}>
                    <div className="ui relaxed divided items">
                      <div className="item">
                        <Link to={{ pathname: '/product', state: { product: currProduct } }} >
                          <div className="ui small image pointer">
                            <img src={currProduct.images[0] || "https://www.moodfit.com/front/images/genral_image_notfound.png"} />
                          </div>
                        </Link>
                        <div className="content product-details">
                          <Link to={{ pathname: '/product', state: { product: currProduct } }} >
                            <div className="ui header onHover">{currProduct.name}</div>
                          </Link>

                          <div className="meta">
                            <div className="ui large star rating" data-max-rating="5" data-rating="2">
                              {
                                <StarRatings max="5" rating={(currProduct.reviews[0] && currProduct.reviews[0].stars) || 0} customizable="false" />
                              }
                            </div>
                          </div>


                          <div className="header">
                            $ {currProduct.baseCost}
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr />
                  </React.Fragment>

                }) : <center><h2 className="ui header">No Products Found!</h2></center>
            }
            {/* Ends here */}

            <ReactPaginate
              previousLabel={'Previous'}
              nextLabel={'Next'}
              breakLabel={'...'}
              breakClassName={'break-me'}
              pageCount={props.products.total / props.products.limit}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={(data) => setFilter({ ...filter, page: data.selected + 1 })}
              containerClassName={'ui secondary menu flex-center'}
              pageClassName={'item'}
              pageLinkClassName={'item-link'}
              activeClassName={'active'}
              previousClassName={'item'}
              nextClassName={'item'}
              previousLinkName={'item-link'}
              nextLinkName={'item-link'}
            />

          </div>
        </div>
      </div>
    </React.Fragment >
  )
}

const mapStateToProps = state => {
  return {
    products: state.productReducer,
    categories: state.categoryReducer
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProducts: data => dispatch(getProducts(data)),
    getCategories: () => dispatch(getCategories())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);